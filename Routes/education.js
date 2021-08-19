const express = require("express");
const app = express.Router()
const EducationSchema = require("../modals/educationSchema");
const parser = require("../middleware/cloudinary.config");

app.post("/", parser.single("image"), async (req, res) => {
  const education = new EducationSchema({
    name: req.body.name,
    course: req.body.course,
    year: req.body.year,
    grade: req.body.grade,
    link: req.body.link,
    image: req.file.path,
  });

  try {
    await education.save();
    res.status(200).json({
      message: `Education successfully sent`,
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: `Image upload failed with error: ${error}`,
      status: "error",
    });
  }
});

app.get("/", async (req, res) => {
  const education = await EducationSchema.find({});

  try {
    res.send(education)
  } catch (error) {
    return res.status(400).json({
      message: `Error getting education: ${error}`,
      status: "error",
    });
  }
});

module.exports = app;


