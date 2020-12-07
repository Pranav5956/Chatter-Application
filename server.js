import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
dotenv.config();

import "./passport/config.js";
import localAuthRoute from "./routes/auth/local.js";
import usersApiRoute from "./routes/api/user.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth/local", localAuthRoute);
app.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  usersApiRoute
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port:${port}`));
