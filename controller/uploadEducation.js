const EducationSchema = require("../modals/educationSchema");

module.exports.UploadEducation = async (req, res) => {

  const education = new EducationSchema({
    name: req.body.name,
    course: req.body.course,
    year: req.body.year,
    grade: req.body.grade,
    link: req.body.link,
    image: req.file.path,
  });

  try {
    await education.save();
    res.status(200).json({
      message: `Education successfully sent, ${education}`,
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: `Image upload failed with error: ${error}`,
      status: "error",
    });
  }
};
