import React, { useEffect, useState } from "react";
import { db } from "../components/firebase"; // import the db from your firebase.js
import { ref, get, set } from "firebase/database";
import "./Home.css";

import NavBar from "./Navbar";
const Home = ({ user }) => {
  const [data, setData] = useState([]);
  const [newSensorData, setNewSensorData] = useState(""); // state for new data
  const images = [
    ["./svg/fan.svg","Fan 1"],
    ["./svg/fan.svg","Fan 2"],
    ["./svg/temperature.svg","Temp"],
    ["./svg/humidity.svg","Humidity"],
  ];
  useEffect(() => {
    const dataRef = ref(db, "Sensor/Sensor/"); // Reference to the sensor data in the database

    // Fetch data from Realtime Database
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setData(Object.entries(data)); // Store entries as an array of key-value pairs
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
    const lightStatusRef = ref(db, "Sensor/lightStatus"); // Reference to the lightStatus in the database

    // Toggle the lightStatus between true and false
    const newLightStatus = true; // Toggle lightStatus value based on the existing one

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
          <ul>
            {data.map((item, index) => (
              <div key={index} className="data-preview-container">
                <img src={images[index][0]} width={"70px"} height={"70px"}></img>
                <h1 >
                {images[index][1]}
                </h1>
                <li>{JSON.stringify(item[1])}</li>{" "}
                {/* Accessing the value part of the key-value pair */}
              </div>
            ))}
          </ul>
          </div>

          <div className="controls">
            <img src="./svg/light.svg" width={"120px"} height={"120px"}></img>
            <button onClick={handleAddData}>Turn ON</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
