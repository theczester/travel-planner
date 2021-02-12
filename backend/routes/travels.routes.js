import express from "express";
import {
  createTravel,
  updateTravel,
  deleteTravel,
  getTravels,
} from "../controllers/travels.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTravel);
router.route("/:id").delete(protect, deleteTravel).put(protect, updateTravel);
router.post("/", protect, getTravels);

export default router;
