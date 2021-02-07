import mongoose from "mongoose";

const travelSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startingDate: {
    type: String,
    required: true,
  },
  endingDate: {
    type: String,
    required: true,
  },
  startingPlace: {
    type: String,
    required: true,
  },
  endingPlace: {
    type: String,
    required: true,
  },
  attractions: {
    type: Array,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Travel = mongoose.model("Travel", travelSchema);

export default Travel;
