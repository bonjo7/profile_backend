const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  positionHeld: [{
    positionHeldYear : {type: String, required: true},
    positionHeldTitle : {type: String, required: true},
  }],
  address: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Skills = mongoose.model("experience", ExperienceSchema);

module.exports = Skills;
