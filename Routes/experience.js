const express = require("express");
const app = express.Router();
const ExperienceSchema = require("../modals/experienceSchema");
const parser = require("../middleware/cloudinary.config");
const auth = require("../middleware/auth");

app.post("/", parser.single("image"), auth, async (req, res) => {
  if (req.body && req.file) {
    const experience = new ExperienceSchema({
      companyName: req.body.companyName,
      year: req.body.year,
      positionHeld: JSON.parse(req.body.positionHeld),
      address: req.body.address,
      responsibilities: req.body.responsibilities
        .split(".")
        .map((responsibilities) => responsibilities.trim()),
      image: req.file.path,
    });

    try {
      await experience.save();
      res.status(200).json({
        message: `Experience successfully sent`,
        data: experience,
        status: "success",
      });
    } catch (error) {
      return res.status(400).json({
        message: `Validation error: ${error}`,
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
  const experience = await ExperienceSchema.find({}).sort({ time: -1 });

  try {
    res.send(experience);
  } catch (error) {
    return res.status(500).json({
      message: `Error getting experience: ${error}`,
      status: "ERROR",
    });
  }
});

module.exports = app;
