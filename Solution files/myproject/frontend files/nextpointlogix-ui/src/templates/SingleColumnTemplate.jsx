import React from 'react';
import './SingleColumnTemplate.css';

const SingleColumnTemplate = ({ children }) => {
  return (
    <div className="single-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <a href="/" className="nav-button">Main Screen</a>
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default SingleColumnTemplate;
