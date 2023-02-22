import express from "express";
import { createTweet, deleteTweet, getTweets } from "../controllers/tweets.js";

const router = express.Router();

router.get("/", getTweets);
router.post("/createTweet", createTweet);
router.delete("/", deleteTweet);

export default router;
