const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
// const ctrlUser = require("../controller");
const User = require("../service/schemas/user");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
      req.user = user;
      next()
  });
};

router.post("/registration", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !User.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
});

router.get("/list", auth, (req, res, next) => {
  const { email } = req.body;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
});

// router.get("/user/:email", ctrlUser.get);

// router.post("/user", ctrlUser.create);

module.exports = router;
