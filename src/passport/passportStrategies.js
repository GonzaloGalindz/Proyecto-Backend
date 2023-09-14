import passport from "passport";
import { usersModel } from "../dao/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { usersMongo } from "../dao/managers/usersMongo.js";
import { compareData } from "../utils.js";

passport.use(
  "login",
  new LocalStrategy(async function (email, password, done) {
    try {
      const userDB = await usersMongo.findUser(email);
      if (!userDB) {
        return done(null, false);
      }
      const isPasswordValid = await compareData(password, userDB.password);
      if (!isPasswordValid) {
        return done(null, false);
      }
      return done(null, userDB);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: "Iv1.b742b16329e64026",
      clientSecret: "685dbebb58e179a5f6ac95b104c6a92e2360f036",
      callbackURL: "http://localhost:8080/login/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userDB = await usersMongo.findUser(profile.username);
        //login
        if (userDB) {
          if (userDB.fromGithub) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }

        //register
        const newUser = {
          first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[1],
          username: profile.username,
          password: " ",
          fromGithub: true,
        };
        const result = await usersMongo.createUser(newUser);
        done(null, result);
      } catch (error) {
        done(error);
      }
    }
  )
);

//user=>id
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//id=>user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
