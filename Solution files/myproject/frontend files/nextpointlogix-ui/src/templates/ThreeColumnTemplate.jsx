import React from 'react';
import { Link } from 'react-router-dom';
import './ThreeColumnTemplate.css';

const ThreeColumnTemplate = () => {
  return (
    <div className="three-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Main Screen</Link> {/* Виправлено для навігації */}
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
      <div className="template3-content">
        <div className="left-column">
          {/* Ваш вміст лівої колонки */}
        </div>
        <div className="template3-center-column">
          {/* Ваш вміст центральної колонки */}
        </div>
        <div className="template3-right-column">
          {/* Ваш вміст правої колонки */}
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnTemplate;
