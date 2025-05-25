import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchdata } from "./App";  

const Logout = () => {
  const { setUser } = useContext(fetchdata);  
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);  
    localStorage.removeItem("user");  
    navigate("/");  
  };

  return (
    <div className="logout-container">
      <FontAwesomeIcon icon={faAnglesLeft} className="btg" onClick={() => navigate("/profile")} />
      <div className="logout-box">
        <h2>Are you sure you want to log out?</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Logout;
