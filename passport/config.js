import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

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
            message: "User does not exist.",
          });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) return done(null, user);
        return done(null, false, { message: "Invalid credentials." });
      } catch (err) {
        return done(err, false, { message: "User authentication failed." });
      }
    }
  )
);
