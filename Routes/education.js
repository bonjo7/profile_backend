const express = require("express");
const app = express.Router();
const EducationSchema = require("../modals/educationSchema");
const parser = require("../middleware/cloudinary.config");
const auth = require("../middleware/auth");

app.post("/", parser.single("image"), auth, async (req, res) => {
  const education = new EducationSchema({
    name: req.body.name,
    address: req.body.address,
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
    console.log(error);
    return res.status(400).json({
      message: `Image upload failed with error: ${error}`,
      status: "error",
    });
  }
});

app.get("/", async (req, res) => {
  const education = await EducationSchema.find({}).sort({ time: -1 });

  try {
    res.send(education);
  } catch (error) {
    return res.status(400).json({
      message: `Error getting education: ${error}`,
      status: "error",
    });
  }
});

module.exports = app;
