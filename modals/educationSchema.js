const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationUpload = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
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
  image: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("education", EducationUpload);
