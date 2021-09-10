const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationUpload = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  course: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  finishDate: {
    type: String,
  },
  grade: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("education", EducationUpload);
