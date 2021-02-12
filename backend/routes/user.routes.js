import express from "express";
import {
  createUser,
  authUser,
  getUserProfile,
  authByToken,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", authUser);
router.post("/auth", authByToken);
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);
router.post("/profile", protect, getUserProfile);

export default router;
