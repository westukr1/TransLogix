import React, { useState, useEffect } from "react";
import TopNavBar from "./TopNavBar";
import "./RouteManagement.css";

import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengersGroupingView/GroupingListToRoute";
import { useTranslation } from "react-i18next";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import DriverList from "./DriverList";

import VehicleList from "./VehicleList";
import PassengerList from "./PassengerList";

const RouteManagement = ({
  drivers = [],
  vehicles = [],
  passengers = [],
  routes = [],
  copiedRoutes = [],
}) => {
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    console.log("Generating routes...");
  };

  const handleSubmitRoutes = () => {
    console.log("Submitting routes...");
  };

  return (
    <div className="rm-route-management-container">
      <TopNavBar />
      <div className="rm-route-management">
        <div className="rm-left-column">
          <div className="rm-drivers-list">
            <DriverList drivers={drivers} />
          </div>
          <div className="rm-vehicles-list">
            <VehicleList />
          </div>
        </div>
        <div className="rm-middle-column">
          <div className="rm-passenger-list">
            <button
              onClick={() =>
                navigate("/passengers-grouping-view/grouping-list-to-route")
              }
              className="nav-button"
            >
              {t("grouping_list_to_route")}
            </button>
            <PassengerList passengers={passengers} />
          </div>
          <div className="rm-middle-column">
            <button
              onClick={() =>
                navigate("/ordered-passenger-list/ordered-passenger-list")
              }
              className="nav-button"
            >
              {t("ordered_passenger_list")}
            </button>
          </div>
        </div>
        <div className="rm-center-column">
          <button
            className="rm-route-button"
            onClick={() => console.log("Open route copy")}
          >
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
                    <label htmlFor={`copied-route-${index}`}>
                      {route.name}
                    </label>
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
                <input type="checkbox" defaultChecked />
                <label>Passenger Name - Pickup Point</label>
              </li>
            </ul>
            <button className="rm-route-button">Calculate Boarding Time</button>
            <button className="rm-route-button">Fix Selected Routes</button>
            <button className="rm-route-button">Unfix Selected Routes</button>
            <button className="rm-route-button">Edit Selected Routes</button>
            <button className="rm-route-button">
              Send Routes to Drivers and Passengers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteManagement;
