import React from 'react';
import './PassengerList.css';

const PassengerList = ({ passengers }) => {
  return (
    <div className="passenger-list">
      <h3>Fucking Passengers</h3>
      <ul>
        {passengers && passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <li key={index}>
              {passenger.name} - {passenger.pickup}
            </li>
          ))
        ) : (
          <p>No passengers available</p>
        )}
      </ul>
    </div>
  );
};

export default PassengerList;
