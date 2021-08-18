const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbName = process.env.DB_NAME || "profile";
const mongo_conn_url = process.env.MONGO_CONN_URL || `mongodb://127.0.0.1:27017/${dbName}`;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongo_conn_url, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    console.log(
      `Successfully conneted to mongoDB:  ${mongo_conn_url} \nUsing DB Name: ${dbName}`
    );
  } catch (err) {
    console.log(`Unable to connect to mongoDB: ${err.message}`);
    return err;
  }
};

module.exports = connectMongoDB;
