const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const version = process.version;
const database = require("./Database/db");
const EducationUploadRouter = require("./Routes/uploadEducationRoute");

database();
dotenv.config();

const port = process.env.PORT || "8080";
const appName = process.env.APP_NAME;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", EducationUploadRouter);

app.listen(port, () => {
  console.log(
    `App listening to PORT: ${port} \nApp Name: ${appName} \nNode Version: ${version}`
  );
});
