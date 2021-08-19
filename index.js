const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const version = process.version;
const database = require("./Database/db");
const EducationRoute = require("./Routes/education");

database();
dotenv.config();

const port = process.env.PORT || "8080";
const appName = process.env.APP_NAME;
const env = process.env.APP_ENV;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    status: `Application ${appName} is running on port ${port} - Version 0.0.0`,
    message: `Node application is running successfully, envoirnment: ${env}`,
  });
});

app.use("/api", EducationRoute);

app.listen(port, () => {
  console.log(
    `App listening to PORT: ${port} \nApp Name: ${appName} \nNode Version: ${version}`
  );
});
