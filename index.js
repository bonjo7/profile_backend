const express = require("express");
const app = express();
const dotenv = require("dotenv");
const version = process.version ;
const database = require("./Database/db");

database();
dotenv.config();

const port = process.env.PORT || "8080";
const appName = process.env.APP_NAME;

const education = require("./Routes/education");
const experience = require("./Routes/experience");
const skills = require("./Routes/skills");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/education", education);
app.use("/experience", experience);
app.use("/skills", skills);

app.listen(port, () => {
  console.log(`App listening to PORT: ${port} \nApp Name: ${appName} \nNode Version: ${version}`);
});
