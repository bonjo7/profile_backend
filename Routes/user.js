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
        status: "ERROR",
      });
    }

    const oldUser = await UserSchema.findOne({ username });

    if (oldUser) {
      return res.status(400).json({
        message: `User already exists`,
        status: "ERROR",
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
  } catch (error) {
    return res.status(400).json({
      message: `Error: ${error}`,
      status: "ERROR",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({
        message: `Both username and password are required`,
        status: "ERROR",
      });
    }

    const user = await UserSchema.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, username }, tokenKey, {
        expiresIn: "2h",
      });

      user.token = token;

      const userResult = {
        username: user.username,
        token: user.token,
        TOKEN_KEY: tokenKey,
      };
      res.status(200).json(userResult);
    }else{
      return res.status(401).json({
        message: `No user found, please use correct credentials`,
        status: "ERROR",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error logging in - ${error}`,
      status: "ERROR",
    });
  }
});

module.exports = app;
