import React from 'react';
import './TwoColumnSplitTemplate.css';
import { Link } from 'react-router-dom';

const TwoColumnSplitTemplate = () => {
  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Main Screen</Link>
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
      <div className="template2s-content">
        <div className="template2s-left-column">
          <h2>Left Column Content</h2>
        </div>
        <div className="template2s-right-column">
          <div className="template2s-upper-right">
            <h2>Upper Right Content</h2>
          </div>
          <div className="template2s-lower-right">
            <h2>Lower Right Content</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnSplitTemplate;
