import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import axios from "axios";

export const registerUser = async (req, res) => {
  console.log(req.body);

  try {
    if (await User.findOne({ email: req.body.email })) {
      throw new Error("User already exist");
    }

    const user = new User(req.body);

    await user.save();

    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) throw new Error("User not found");

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) throw new Error("Password doesn't match");

    const userForToken = {
      id: user._id,
      email: user.email,
    };

    console.log(user);
    const token = jwt.sign(userForToken, "123");

    res.status(200).json({
      message: "User has logged in",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        token,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.json({
      errorMessage: error.message,
    });
  }
};
