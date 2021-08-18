const EducationUploadRouter = require("express").Router();

const { UploadEducation } = require("../controller/uploadEducation");

const parser = require("../middleware/cloudinary.config");

EducationUploadRouter.post("/image", parser.single("image"), UploadEducation);

module.exports = EducationUploadRouter;
