import express from "express";
import {
  createTravel,
  updateTravel,
  getTravelById,
  deleteTravel,
  getTravels,
} from "../controllers/travels.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTravel);
router.post("/update", protect, updateTravel);
router
  .route("/:id")
  .delete(protect, deleteTravel)
  .get(protect, getTravelById)
  .put(protect, updateTravel);
router.get("/", protect, getTravels);

export default router;
