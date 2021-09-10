const express = require("express");
const app = express.Router();
const EducationSchema = require("../modals/educationSchema");
const parser = require("../middleware/cloudinary.config");
const auth = require("../middleware/auth");

app.post("/", parser.single("image"), auth, async (req, res) => {
  if (req.body && req.file) {
    const education = new EducationSchema({
      name: req.body.name,
      address: req.body.address,
      course: req.body.course,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      grade: req.body.grade ? req.body.grade : "n/a",
      link: req.body.link ? req.body.link : "n/a",
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
        status: "ERROR",
      });
    }
  } else {
    return res.status(400).json({
      message: `Please fill in all required fields`,
      status: "ERROR",
    });
  }
});

app.get("/", async (req, res) => {
  const education = await EducationSchema.find({}).sort({ time: -1 });

  try {
    res.send(education);
  } catch (error) {
    return res.status(500).json({
      message: `Error getting education: ${error}`,
      status: "ERROR",
    });
  }
});

module.exports = app;
