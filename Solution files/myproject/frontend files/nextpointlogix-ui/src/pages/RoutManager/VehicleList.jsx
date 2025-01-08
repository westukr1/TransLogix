import React from 'react';

const VehicleList = ({ vehicles = [] }) => {
  return (
    <div className="vehicle-list">
      <h3>Available Vehicles</h3>
      <ul>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <li key={index}>
              <input
                type="checkbox"
                defaultChecked
                id={`vehicle-${index}`}
                name={`vehicle-${index}`}
              />
              <label htmlFor={`vehicle-${index}`}>{vehicle.model}</label>
            </li>
          ))
        ) : (
          <p>No vehicles available</p>
        )}
      </ul>
    </div>
  );
};

export default VehicleList;
