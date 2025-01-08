import React from 'react';
import './RouteManagement.css';

const RouteManagement = ({ routes }) => {
  return (
    <div className="route-management">
      <h3>Route Management</h3>
      <ul>
        {routes && routes.length > 0 ? (
          routes.map((route, index) => (
            <li key={index}>
              {route.name} - {route.status}
            </li>
          ))
        ) : (
          <p>No routes available</p>
        )}
      </ul>
    </div>
  );
};

export default RouteManagement;
