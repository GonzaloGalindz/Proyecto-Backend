import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { usersMongo } from "../dao/managers/usersMongo.js";
import { compareData } from "../utils.js";

//Local login
passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    try {
      const userDB = await usersMongo.findUser(username);
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

//Github
passport.use(
  new GitHubStrategy(
    {
      clientID: "Iv1.b742b16329e64026",
      clientSecret: "685dbebb58e179a5f6ac95b104c6a92e2360f036",
      callbackURL: "http://localhost:8080/login/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //login
        const userDB = await usersMongo.findUser(profile.username);
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
          email: " ",
          password: " ",
          age: " ",
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

//JWT
const JWT_SECRET_KEY = "secretJWTkey";

// Sin Cookies
// passport.use(
//   "jwt",
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: JWT_SECRET_KEY,
//     },
//     async (jwt_payload, done) => {
//       console.log("jwt_payload", jwt_payload);
//       done(null, jwt_payload.user);
//     }
//   )
// );

// Con cookies
const cookieExtractor = (req) => {
  return req.cookies.token;
};

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: JWT_SECRET_KEY,
    },
    async (jwt_payload, done) => {
      console.log("jwt_payload", jwt_payload);
      done(null, jwt_payload.user);
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
    const user = await usersMongo.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
