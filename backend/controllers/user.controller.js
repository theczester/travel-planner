import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, homeAdress } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    homeAdress,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      homeAdress: user.homeAdress,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const token = generateToken(user._id);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      homeAdress: user.homeAdress,
      token,
    });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        homeAdress: user.homeAdress,
        token,
      })
    );
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const user = await User.findById(userInfo._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      homeAdress: user.homeAdress,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  localStorage.removeItem("userInfo");
  res.json({ message: "User Logged out!" });
});

export { createUser, authUser, getUserProfile, logoutUser };
