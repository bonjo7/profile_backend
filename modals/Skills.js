const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
  softSkills: {
    title: {
      type: String,
    },
    skill: {
      type: Array,
    }
  },
  techSkills: {
    title: {
      type: String,
    },
    skill: {
      type: Array,
    }
  }
});

const Skills = mongoose.model("Skills", SkillsSchema);

module.exports = Skills;
