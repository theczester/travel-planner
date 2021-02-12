import mongoose from "mongoose";

const travelSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    default: "Nowa wycieczka",
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
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
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Travel = mongoose.model("Travel", travelSchema);

export default Travel;
