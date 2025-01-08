import React, { useState } from 'react';
import TopNavBar from './TopNavBar';
import './RouteManagement.css';

const RouteManagement = ({ drivers = [], vehicles = [], passengers = [], routes = [], copiedRoutes = [] }) => {
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const handleSelectRoute = (route) => {
    setSelectedRoutes((prev) => {
      if (prev.includes(route)) {
        return prev.filter((r) => r !== route);
      } else {
        return [...prev, route];
      }
    });
  };

  const handleGenerateRoutes = () => {
    console.log('Generating routes...');
  };

  const handleSubmitRoutes = () => {
    console.log('Submitting routes...');
  };

  return (
    <div className="rm-route-management-container">
      <TopNavBar />
      <div className="rm-route-management">
        <div className="rm-left-column">
          <div className="rm-drivers-list">
            <h3>Available Drivers</h3>
            <ul>
              {drivers && drivers.length > 0 ? (
                drivers.map((driver, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      defaultChecked
                      id={`driver-${index}`}
                      name={`driver-${index}`}
                    />
                    <label htmlFor={`driver-${index}`}>{driver.name}</label>
                  </li>
                ))
              ) : (
                <p>No drivers available</p>
              )}
            </ul>
          </div>
          <div className="rm-vehicles-list">
            <h3>Available Vehicles</h3>
            <ul>
              {vehicles && vehicles.length > 0 ? (
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
        </div>
        <div className="rm-middle-column">
          <div className="rm-passenger-list">
            <h3>Passengers/requests for tranpottation</h3>
            <ul>
              {passengers && passengers.length > 0 ? (
                passengers.map((passenger, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      defaultChecked
                      id={`passenger-${index}`}
                      name={`passenger-${index}`}
                    />
                    <label htmlFor={`passenger-${index}`}>
                      {passenger.name} - {passenger.pickup}
                    </label>
                  </li>
                ))
              ) : (
                <p>No passengers available</p>
              )}
            </ul>
          </div>
        </div>
        <div className="rm-center-column">
          <button className="rm-route-button" onClick={() => console.log('Open route copy')}>
            Copy and Edit Route
          </button>
          <div className="rm-copied-routes">
            <h3>Copied Routes</h3>
            <ul>
              {copiedRoutes && copiedRoutes.length > 0 ? (
                copiedRoutes.map((route, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={`copied-route-${index}`}
                      name={`copied-route-${index}`}
                    />
                    <label htmlFor={`copied-route-${index}`}>{route.name}</label>
                  </li>
                ))
              ) : (
                <p>No copied routes available</p>
              )}
            </ul>
            <button className="rm-route-button" onClick={handleSubmitRoutes}>
              Copy Selected Routes
            </button>
            <button className="rm-route-button" onClick={handleGenerateRoutes}>
              Generate Routes via AI
            </button>
          </div>
        </div>
        <div className="rm-right-column">
          <div className="rm-today-routes">
            <h3>Today's Routes</h3>
            <ul>
              {/* Placeholder for today's routes */}
              <li>
                <span>Status: Confirmed</span> - Route details
                <button className="rm-route-button">Fix</button>
                <button className="rm-route-button">Edit</button>
                <button className="rm-route-button">Delete</button>
              </li>
            </ul>
          </div>
          <div className="rm-assigned-passengers">
            <h3>Assigned Passengers</h3>
            <ul>
              {/* Placeholder for assigned passengers */}
              <li>
                <input
                  type="checkbox"
                  defaultChecked
                />
                <label>Passenger Name - Pickup Point</label>
              </li>
            </ul>
            <button className="rm-route-button">Calculate Boarding Time</button>
            <button className="rm-route-button">Fix Selected Routes</button>
            <button className="rm-route-button">Unfix Selected Routes</button>
            <button className="rm-route-button">Edit Selected Routes</button>
            <button className="rm-route-button">Send Routes to Drivers and Passengers</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteManagement;
