import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, homeAdress } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
    homeAdress,
  });

  if (user) {
    res.status(201).json({ message: "User Created!" });
  } else {
    res.status(400);
    throw new Error("Invalid data!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      userInfo: {
        _id: user._id,
        name: user.name,
        email: user.email,
        homeAdress: user.homeAdress,
        token,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password!");
  }
});

const authByToken = asyncHandler(async (req, res) => {
  let token = req.body.token;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Bad token!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token!");
  }

  res.status(200);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userID);
  if (user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      homeAdress: user.homeAdress,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.homeAdress = req.body.homeAdress || user.homeAdress;
    user.password = req.body.password || user.password;

    await user.save();

    res.status(2000);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(200);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  createUser,
  authUser,
  getUserProfile,
  authByToken,
  updateUser,
  deleteUser,
};
