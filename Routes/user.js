const express = require("express");
const app = express.Router();
const UserSchema = require("../modals/userSchema");
const tokenKey = process.env.TOKEN_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({
        message: `Username and password is required`,
        status: "error",
      });
    }

    const oldUser = await UserSchema.findOne({ username });

    if (oldUser) {
      return res.status(400).json({
        message: `User already exists`,
        status: "error",
      });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserSchema.create({
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, username }, tokenKey, {
      expiresIn: "2h",
    });

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${error}`,
      status: "error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await UserSchema.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, username }, tokenKey, {
        expiresIn: "2h",
      });

      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).json({
      message: `Ivalid credentials`,
      status: "error",
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${error}`,
      status: "error",
    });
  }
});

module.exports = app;
