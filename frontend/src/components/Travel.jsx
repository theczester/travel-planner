import { useState, useEffect } from "react";
import { Edit3, ArrowRight, Minus, Check, X, Trash2 } from "react-feather";
import DatePicker from "react-date-picker";
import axios from "axios";
import "../styles/travels.css";

const Travel = ({ travelInfo }) => {
  const [startingDate, setStartingDate] = useState(
    new Date(travelInfo.startingDate)
  );
  const [endingDate, setEndingDate] = useState(new Date(travelInfo.endingDate));
  const [title, setTitle] = useState(travelInfo.title);
  const [startingPlace, setStartingPlace] = useState(travelInfo.startingPlace);
  const [endingPlace, setEndingPlace] = useState(travelInfo.endingPlace);
  const [attractions, setAttractions] = useState(travelInfo.attractions);
  const [completed, setCompleted] = useState(travelInfo.completed);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const inputsToResize = document.getElementsByClassName("resize");
    [...inputsToResize].forEach((input) => {
      input.setAttribute("size", input.value.length);
    });
  }, [startingPlace, endingPlace, attractions, title]);

  const handleTravelUpdate = async () => {
    setEditMode(false);
    try {
      await axios.put(
        `/api/travels/${travelInfo._id}`,
        {
          startingDate,
          endingDate,
          startingPlace,
          endingPlace,
          completed,
          title,
          attractions,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo"))["token"]
            }`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTravel = async () => {
    window.location.reload();
    try {
      await axios.delete(`/api/travels/${travelInfo._id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo"))["token"]
          }`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="travel">
      <div className="travel-spaced-div">
        <input
          disabled={!editMode}
          defaultValue={travelInfo.title}
          onChange={(e) => setTitle(e.target.value)}
          className="resize travel-title"
        />
        <Edit3 onClick={() => setEditMode(true)} />
      </div>
      <div>
        <div className="travel-connect-div">
          <input
            disabled={!editMode}
            defaultValue={travelInfo.startingPlace}
            onChange={(e) => setStartingPlace(e.target.value)}
            className="resize travel-place"
          />
          <ArrowRight className="connect-div-seperator" />
          <input
            disabled={!editMode}
            defaultValue={travelInfo.endingPlace}
            onChange={(e) => setEndingPlace(e.target.value)}
            className="resize travel-place"
          />
        </div>
        <div className="travel-connect-div">
          <DatePicker
            onChange={(value) => setStartingDate(value)}
            value={startingDate}
            disabled={!editMode}
          />
          <Minus className="connect-div-seperator" />
          <DatePicker
            onChange={(value) => setEndingDate(value)}
            value={endingDate}
            disabled={!editMode}
          />
        </div>
      </div>
      <div className="travel-spaced-div">
        <div>
          <label>Atrakcje: </label>
          <input
            disabled={!editMode}
            defaultValue={travelInfo.attractions}
            onChange={(e) => setAttractions(e.target.value)}
            className="resize"
          />
        </div>

        <div>
          <label>Podróż zakończona</label>
          <input
            disabled={!editMode}
            type="checkbox"
            defaultChecked={travelInfo.completed}
            onChange={() => setCompleted(!completed)}
            className="travel-completed-btn"
          />
        </div>
      </div>

      {editMode && (
        <div className="edit-mode-buttons">
          <Trash2 color="red" onClick={() => handleDeleteTravel()} />
          <div>
            <Check onClick={() => handleTravelUpdate()} />
            <X onClick={() => setEditMode(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel;
