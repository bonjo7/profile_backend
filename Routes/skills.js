const express = require("express");
let app = express.Router();
const skillsModel = require("../modals/Skills");

app.post("/", async (req, res) => {
  const skill = new skillsModel({
    softSkills: {
      title: req?.body?.softSkills?.title,
      skill: req?.body?.softSkills?.skill
    },
    techSkills: {
      title: req?.body?.techSkills?.title,
      skill: req?.body?.techSkills?.skill
    },
  });

  try {
    await skill.save();
    res.send(skill);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/", async (req, res) => {
  const skills = await skillsModel.find({});

  try {
    res.send(skills);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = app;
