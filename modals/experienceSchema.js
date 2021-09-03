const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  year: {
    type: String,
  },
  positionHeld: [{
    positionHeldYear : {type: String, required: true},
    positionHeldTitle : {type: String, required: true},
  }],
  address: {
    type: String,
  },
  responsibilities: {
    type: [String],
  },
  image: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Skills = mongoose.model("experience", ExperienceSchema);

module.exports = Skills;
