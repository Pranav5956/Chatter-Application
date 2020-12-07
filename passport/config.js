import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

import UserModel from "../models/user.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user)
          return done(null, false, {
            message: "No account matching these credentials exist.",
          });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) return done(null, user);
        return done(null, false, {
          message:
            "Invalid credentials. Please check the password you have supplied.",
        });
      } catch (err) {
        return done(err, false, { message: "User authentication failed." });
      }
    }
  )
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
passport.use(
  new JwtStrategy(jwtOpts, (jwt_payload, done) => {
    UserModel.findOne({ _id: jwt_payload.id }, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      else return done(null, false);
    });
  })
);
