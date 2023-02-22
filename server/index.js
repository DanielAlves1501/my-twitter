import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import tweets from "./routes/tweets.js";
import user from "./routes/user.js";
import dotenv from "dotenv";

const app = express();

// GENERAL CONFIGURATION

dotenv.config();
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES

app.use("/tweets", tweets);
app.use("/user", user);

// MONGOOSE SETUP

const PORT = process.env.PORT || 3001;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, () => {
  app.listen(PORT, () => {
    console.log("Server is running 🚀🚀");
  });
});
