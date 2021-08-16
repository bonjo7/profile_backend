const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || "8080";
const appName = process.env.APP_NAME;

const education = require('./Routes/education');
const experience = require('./Routes/experience');
const skills = require('./Routes/skills');

app.use('/education', education);
app.use('/experience', experience);
app.use('/skills', skills);

app.listen(port, function () {
  console.log(`App listening to PORT: ${port} \n App Name: ${appName}`);
});