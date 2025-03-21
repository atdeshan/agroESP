import React, { useEffect, useState } from "react";
import { db } from "../components/firebase"; // import the db from your firebase.js
import { ref, get, set } from "firebase/database";
import "./Home.css";

import NavBar from "./Navbar";

const Home = ({ user }) => {
  const [data, setData] = useState([]);
  const [newSensorData, setNewSensorData] = useState(""); // state for new data
  const [lightStatus, setLightStatus] = useState(false); // state for light status
  const images = [
    ["./svg/temperature.svg", "Temperature"],
    ["./svg/humidity.svg", "Humidity"],
    ["./svg/fan.svg", "Fan 1"],
    ["./svg/fan.svg", "Fan 2"],
    
    ["./svg/water.svg", "Water Line"],
    ["./svg/water.svg", "Water Line 2"],

  ];

  useEffect(() => {
    const dataRef = ref(db, "Sensor/Sensor/"); // Reference to the sensor data in the database

    // Fetch data from Realtime Database
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filteredData = Object.entries(data).filter(
            ([key]) => key !== "07_lightStatus"
          );
          setData(filteredData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to handle adding new data to the database
  const handleAddData = () => {
    const lightStatusRef = ref(db, "Sensor/07_lightStatus"); // Reference to the lightStatus in the database

    // Toggle the lightStatus between true and false
    const newLightStatus =  lightStatus ? false : true;
    setLightStatus(newLightStatus); // Update the lightStatus state

    // Update the lightStatus in Firebase
    set(lightStatusRef, newLightStatus)
      .then(() => {
        console.log("Light status updated successfully");
        setNewSensorData(""); // Clear the input field after updating data
      })
      .catch((error) => {
        console.error("Error updating light status: ", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="home">
        <h1 className="welcome-text">Welcome Back {user.username}</h1>
        <div className="container">
          <div className="data-preview">
            <h1>Sensor Data</h1>
            <ul>
              {data.map((item, index) => (
                <div key={index} className="data-preview-container">
                  <img
                    src={images[index][0]}
                    width={"70px"}
                    height={"70px"}
                    alt={images[index][1]}
                  />
                  <h2>{images[index][1]}</h2>
                  <li>{JSON.stringify(item[1])}</li>{" "}
                  {/* Accessing the value part of the key-value pair */}
                </div>
              ))}
            </ul>
          </div>

          <div className="controls">
            <h1>Controls</h1>
            <img
              src="./svg/light.svg"
              width={"120px"}
              height={"120px"}
              alt="Light"
            />
            <button onClick={handleAddData}>
              {lightStatus ? "Turn Off" : "Turn On"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
