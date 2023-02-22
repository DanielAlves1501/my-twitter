import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;
