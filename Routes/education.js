const express = require("express");
const educationModel = require("../modals/Education");
let app = express.Router();

app.post("/", async (req, res) => {
  const education = new educationModel({
    img: req.body.img,
    name: req.body.name,
    course: req.body.course,
    year: req.body.year,
    grade: req.body.grade,
    link: req.body.link,
  });

  try {
    await education.save();
    res.send(`Education successfully sent to DB: ${education}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/", async (req, res) => {
  const education = await educationModel.find({});

  try {
    res.send(`Education Results: ${education}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
