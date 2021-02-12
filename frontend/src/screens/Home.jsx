import { useState } from "react";
import "../styles/home.css";
import DatePicker from "react-date-picker";
import axios from "axios";
import {
  Navigation,
  MapPin,
  Calendar,
  Clock,
  Truck,
  Check,
} from "react-feather";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];

const Map = () => {
  const [directionsCalculated, setDirectionsCalculated] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [origin, setOrigin] = useState("");
  const [saveCounter, setSaveCounter] = useState(0);
  const [destination, setDestination] = useState("");
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

  const directionsCallback = (res) => {
    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
      }
    }
  };

  const handleCalcDirections = () => {
    setSaveCounter(0);
    setDirectionsCalculated(true);
    setOrigin(origin.geometry?.location || origin);
    setDestination(destination.geometry?.location || destination);
  };
  const handleSaveTravel = async () => {
    if (saveCounter === 0) {
      setSavedMessage("Trasa zapisana!");
      setSaveCounter(1);
      try {
        await axios.post(
          "/api/travels/create",
          {
            startingDate,
            endingDate,
            startingPlace: originAutocomplete.getPlace().formatted_address,
            endingPlace: destinationAutocomplete.getPlace().formatted_address,
            user: JSON.parse(localStorage.getItem("userInfo"))["_id"],
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
        setSavedMessage(error.message);
        return;
      }
    }
  };

  const containerStyle = {
    width: "70vw",
    height: "100%",
    borderRadius: "10px",
  };
  const center = {
    lat: 0,
    lng: 0,
  };

  return (
    <div className="home-page">
      <LoadScript
        googleMapsApiKey="AIzaSyBEV1U1xYgOa6d0aeSeqx5QHbeYIhp9ogQ"
        libraries={libraries}
        language="pl"
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
          {destination !== "" && origin !== "" && (
            <DirectionsService
              options={{
                destination,
                origin,
                travelMode,
              }}
              callback={directionsCallback}
            />
          )}
          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
              }}
            />
          )}
        </GoogleMap>
        <div className="directions-form-container">
          <h1 className="destination-form-heading">
            Sposób transportu <Truck size="35px" />
          </h1>
          <div className="transport-type-form">
            <div>
              <label>Samochód</label>
              <input
                type="radio"
                checked={travelMode === "DRIVING"}
                onChange={() => setTravelMode("DRIVING")}
              />
            </div>
            <div>
              <label>Tranzyt</label>
              <input
                type="radio"
                checked={travelMode === "TRANSIT"}
                onChange={() => setTravelMode("TRANSIT")}
              />
            </div>
            <div>
              <label>Pieszo</label>
              <input
                type="radio"
                checked={travelMode === "WALKING"}
                onChange={() => setTravelMode("WALKING")}
              />
            </div>
            <div>
              <label>Rower</label>
              <input
                type="radio"
                checked={travelMode === "BICYCLING"}
                onChange={() => setTravelMode("BICYCLING")}
              />
            </div>
          </div>
          <h1 className="destination-form-heading">
            Trasa <MapPin size="35px" />
          </h1>
          <div className="route-form">
            <div>
              <label>Początek</label>
              <Autocomplete
                onLoad={(autocomplete) => setOriginAutocomplete(autocomplete)}
                onPlaceChanged={() => setOrigin(originAutocomplete.getPlace())}
              >
                <input type="text" placeholder="Wpisz początek trasy..." />
              </Autocomplete>
            </div>
            <div>
              <label>Cel</label>
              <Autocomplete
                onLoad={(autocomplete) =>
                  setDestinationAutocomplete(autocomplete)
                }
                onPlaceChanged={() =>
                  setDestination(destinationAutocomplete.getPlace())
                }
              >
                <input type="text" placeholder="Wpisz cel trasy..." />
              </Autocomplete>
            </div>
          </div>
          {response && (
            <div className="directions-calc-results">
              <span>
                <Clock size="48px" />
                {response.routes[0].legs[0].duration.text}
              </span>

              <span>
                <Navigation size="48px" />
                {response.routes[0].legs[0].distance.text}
              </span>
            </div>
          )}
          <button
            className={`form-btn ${
              origin.length <= 0 && destination.length <= 0 && "disabled"
            }`}
            onClick={() => handleCalcDirections()}
            disabled={origin.length <= 0 && destination.length <= 0}
          >
            Oblicz trasę
          </button>
          <h1 className="destination-form-heading">
            Data <Calendar size="35px" />
          </h1>
          <div className="dates-form">
            <div>
              <label>Początek</label>
              <DatePicker
                onChange={(value) => setStartingDate(value)}
                value={startingDate}
              />
            </div>
            <div>
              <label>Koniec</label>
              <DatePicker
                onChange={(value) => setEndingDate(value)}
                value={endingDate}
              />
            </div>
          </div>
          <button
            className={`form-btn ${
              (!directionsCalculated || saveCounter > 0) && "disabled"
            }`}
            disabled={saveCounter > 0}
            onClick={
              directionsCalculated
                ? () => handleSaveTravel()
                : () => setSavedMessage("Najpierw oblicz trasę!")
            }
          >
            Zapisz trasę
          </button>
          <span className="save-travel-err">{savedMessage}</span>
        </div>
      </LoadScript>
    </div>
  );
};

export default Map;
