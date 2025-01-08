import React from 'react';
import './DriverList.css';

const DriverList = ({ drivers }) => {
  return (
    <div className="driver-list">
      <h3>Drivers</h3>
      <ul>
        {drivers && drivers.length > 0 ? (
          drivers.map((driver, index) => (
            <li key={index}>
              {driver.name} - {driver.vehicle}
            </li>
          ))
        ) : (
          <p>No drivers available</p>
        )}
      </ul>
    </div>
  );
};

export default DriverList;
