import express from "express";
import {
  createUser,
  authUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.post("/logout", logoutUser);

export default router;
