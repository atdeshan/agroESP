
import React, { useState } from "react";

import './App.css';
import Login from './pages/login';
import Home from './pages/Home';

import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [user,setUser] = useState({username:""})
  
      const handelLogin = (username) =>{
        setUser({username});
        console.log("Logged in as:", username);
      }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handelLogin} />} />
        <Route path="/home" element={<Home user={user} />} />
      </Routes>
    </Router>

  );
}

export default App;
