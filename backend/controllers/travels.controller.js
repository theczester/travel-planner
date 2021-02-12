import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Travel from "../models/travel.model.js";

const createTravel = asyncHandler(async (req, res) => {
  const {
    title,
    startingDate,
    endingDate,
    startingPlace,
    endingPlace,
    user,
  } = req.body;

  const travel = await Travel.create({
    user,
    title,
    startingDate,
    endingDate,
    startingPlace,
    endingPlace,
  });

  if (travel) {
    res.status(201);
  } else {
    res.status(400);
    throw new Error("Invalid travel data");
  }
});

const updateTravel = asyncHandler(async (req, res) => {
  const travel = await Travel.findById(req.params.id);
  if (travel) {
    travel.attractions = req.body.attractions;
    travel.completed = req.body.completed;
    travel.startingDate = req.body.startingDate;
    travel.endingDate = req.body.endingDate;
    travel.startingPlace = req.body.startingPlace;
    travel.endingPlace = req.body.endingPlace;
    travel.title = req.body.title;

    await travel.save();

    res.status(200);
  } else {
    res.status(404);
    throw new Error("Travel not found");
  }
});

const deleteTravel = asyncHandler(async (req, res) => {
  const travel = await Travel.findById(req.params.id);

  if (travel) {
    await travel.remove();
    res.status(200);
  } else {
    res.status(404);
    throw new Error("Travel not found");
  }
});

const getTravels = asyncHandler(async (req, res) => {
  const travels = await Travel.find({ user: req.body.user });
  res.status(200).json(travels);
});

export { createTravel, updateTravel, deleteTravel, getTravels };
