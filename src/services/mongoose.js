const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
mongoose.set("strictQuery", false);

async function connectDb() {
  await mongoose.connect(process.env.Mongo_Url);
  console.log("Db connectée");
}

module.exports = { connectDb };
