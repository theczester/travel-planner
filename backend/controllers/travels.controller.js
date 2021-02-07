import asyncHandler from "express-async-handler";
import Travel from "../models/travel.model.js";

const createTravel = asyncHandler(async (req, res) => {
  const {
    title,
    startingDate,
    endingDate,
    startingPlace,
    endingPlace,
  } = req.body;
  const attractions = req.body.attractions ? attractions : [];

  const travel = await Travel.create({
    title,
    startingDate,
    endingDate,
    startingPlace,
    endingPlace,
    attractions,
  });

  if (travel) {
    res.status(201).json({
      title,
      startingDate,
      endingDate,
      startingPlace,
      endingPlace,
      attractions,
    });
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

    const updatedTravel = await travel.save();

    res.json({
      _id: updatedTravel._id,
      title: updatedTravel.title,
      startingDate: updatedTravel.startingDate,
      endingDate: updatedTravel.endingDate,
      startingPlace: updatedTravel.startingPlace,
      endingPlace: updatedTravel.endingPlace,
      attractions: updatedTravel.attractions,
    });
  } else {
    res.status(404);
    throw new Error("Travel not found");
  }
});

const deleteTravel = asyncHandler(async (req, res) => {
  const travel = await Travel.findById(req.params.id);

  if (travel) {
    await user.remove();
    res.json({ message: "Travel deleted!" });
  } else {
    res.status(404);
    throw new Error("Travel not found");
  }
});

const getTravels = asyncHandler(async (req, res) => {
  const travels = await Travel.find({});
  res.json(travels);
});

const getTravelById = asyncHandler(async (req, res) => {
  const travel = await Travel.findById(req.params.id);
  if (travel) {
    res.json(travel);
  } else {
    res.status(404);
    throw new Error("Travel not found!");
  }
});

export { createTravel, updateTravel, deleteTravel, getTravels, getTravelById };
