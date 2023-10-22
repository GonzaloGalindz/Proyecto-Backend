import passport from "passport";
import { usersModel } from "../../DAL/MongoDB/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { userService } from "../users.service.js";
import { compareData } from "../../utils.js";
import config from "../../config.js";

//Local login
passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await userService.findUser(username);
      if (!user) {
        return done(null, false);
      }
      const isPasswordValid = await compareData(password, user.password);
      if (!isPasswordValid) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

//Github
passport.use(
  new GitHubStrategy(
    {
      clientID: config.client_id_github,
      clientSecret: config.client_secret_github,
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //Login
        const user = await userService.findUser(profile.username);
        if (user) {
          if (user.fromGithub) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }

        //SignUp
        const newUser = {
          first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[1],
          username: profile.username,
          email: profile._json.email,
          password: " ",
          age: " ",
          fromGithub: true,
        };
        const result = await userService.createUser(newUser);
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
