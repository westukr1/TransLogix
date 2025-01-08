import React from 'react';
import { Link } from 'react-router-dom';
import './TopNavBar.css';

const TopNavBar = () => {
  return (
    <div className="top-nav-bar">
      <div className="logo">
        <img src="/logo.png" alt="NextPointLogix" />
      </div>
      <div className="date-time">
      <p>Time: </p>
        <label>Start:</label>
        <input type="datetime-local" />
        <label>End:</label>
        <input type="datetime-local" />
        
      </div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Main Screen</Link>
        <Link to="/map-of-routes" className="nav-button">Routes Map</Link>
        <Link to="/calendar" className="nav-button">Calendar</Link>
        <Link to="/drivers" className="nav-button">Driver Manager</Link>
        <button className="nav-button" onClick={() => window.history.back()}>Back</button>
      </div>
      
    </div>
  );
};

export default TopNavBar;
