import React from 'react';
import './DevelopersTools.css';
import { Link } from 'react-router-dom';

const DevelopersTools = () => {
  return (
    <div className="developers-tools">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Main Screen</Link>
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
      <div className="dt-content">
        <div className="left-column">
          <h2>Templates</h2>
          <ul>
            <li><Link to="/template-single-column">Single Column Template</Link></li>
            <li><Link to="/template-two-column">Two Column Template</Link></li>
            <li><Link to="/template-two-column-split">Two Column Split Template</Link></li>
            <li><Link to="/template-three-column">Three Column Template</Link></li>
            <li><Link to="/template-two-column-split-three">Two Column Split Three</Link></li>
          </ul>
        </div>
        <div className="right-column">
          <h2>Place for other tools.</h2>
        </div>
      </div>
    </div>
  );
};

export default DevelopersTools;
