import { useState, useEffect } from "react";
import Travel from "../components/Travel.jsx";
import axios from "axios";
import "../styles/travels.css";

const Travels = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      const { data } = await axios.post(
        "api/travels/",
        {
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
      setTravels(data);
    };

    fetchTravels();
  }, []);
  return (
    <div className="travels-page">
      <h1>Zaplanowane Podróże</h1>
      {travels.map((travel, index) => (
        <Travel travelInfo={travel} key={index} />
      ))}
    </div>
  );
};

export default Travels;
