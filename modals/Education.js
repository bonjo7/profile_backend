const mongoose = require("mongoose");

const EducationScheme = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("eduction", EducationScheme);
