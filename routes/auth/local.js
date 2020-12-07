import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";

import UserModel from "../../models/user.js";

const router = express.Router();

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json({
        status: "failure",
        message: info,
      });

    req.login(user, { session: false }, (err) => {
      if (err) return res.json({ status: "failure", message: err.message });

      const token = jwt.sign(
        { id: user._id, rememberMe: req.body.rememberMe ? true : false },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      return res.json({
        status: "success",
        user: { id: user._id, email: user.email },
        token,
      });
    });
  })(req, res);
});

router.post("/register", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword)
    return res.json({
      status: "error",
      message: "Please enter all the fields.",
    });

  if (password.length < 6)
    return res.json({
      status: "error",
      message: "Password should be a minimum of 6 characters.",
    });

  if (password !== confirmPassword)
    return res.json({
      status: "error",
      message: "Supplied passwords needs to match.",
    });

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.json({
        status: "error",
        message: "An account with the same email address already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    await UserModel({
      email,
      password: encryptedPassword,
    }).save();

    return res.json({
      status: "success",
      message: "Registration successful! Proceed to login to your account.",
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "Registration failure! Please try again after sometime.",
    });
  }
});

export default router;
