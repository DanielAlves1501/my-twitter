import mongoose from "mongoose";
import Tweet from "../models/Tweet.js";

export const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    res.status(200).json(tweets);
  } catch (error) {
    console.log(error);
    res.status(400).send({ errorMessage: error.message });
  }
};

export const createTweet = async (req, res) => {
  const { content, userId, name, profilePicture } = req.body;
  console.log(req.body);
  try {
    const tweet = new Tweet({ content, author: userId, name, profilePicture });

    await tweet.save();
    res.status(200).json(tweet);
  } catch (error) {
    res.json({
      errorMessage: error.message,
    });
  }
};

export const deleteTweet = (req, res) => {
  res.send("Delete tweet");
};
