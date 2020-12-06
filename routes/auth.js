import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import emailVerifier from "email-verifier-node";

import UserModel from "../models/user.js";

const router = express.Router();

router.post("/local/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json({
        type: "failure",
        message: info,
      });

    req.login(user, { session: false }, (err) => {
      if (err) return res.json({ type: "failure", message: err.message });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.json({
        type: "success",
        user: { id: user._id, email: user.email },
        token,
      });
    });
  })(req, res);
});

router.post("/local/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ type: "error", message: "Please enter all the fields." });

  // Create a new user
  try {
    const emailValidity = await emailVerifier.verify_email(email);
    return res.json({
      type: "success",
      message: emailValidity.message,
      data: emailValidity,
    });
  } catch (err) {
    return res.json({ type: "error", message: "Email validation failed." });
  }
});

export default router;
