import express from "express";

import UserModel from "../../models/user.js";

const router = express.Router();

router.get("/users", (req, res) => {
  UserModel.find({})
    .then((users) =>
      res.json(
        users.map((user) => {
          return { id: user._id, email: user.email };
        })
      )
    )
    .catch((err) => res.json(err));
});

export default router;
