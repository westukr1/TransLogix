import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Додано useNavigate
import './TwoColumnTemplate.css';

const TwoColumnTemplate = () => {
  const navigate = useNavigate(); // Використання useNavigate

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="two-column-template-logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/')}>Main Screen</button> {/* Виправлено */}
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
      <div className="template21-content">
        <div className="template21-left-column">
          <h2>Left Column</h2>
          <ul>
            <li><Link to="/link1">Link 1</Link></li>
            <li><Link to="/link2">Link 2</Link></li>
          </ul>
        </div>
        <div className="template21-right-column">
          <h2>Right Column</h2>
          <p>This is the right column content.</p>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnTemplate;
