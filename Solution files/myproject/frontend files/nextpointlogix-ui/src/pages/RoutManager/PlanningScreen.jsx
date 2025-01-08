import React from 'react';
import './PlanningScreen.css';
import DriverList from './DriverList';
import PassengerList from './PassengerList';
import RouteManagement from './RouteManagement';
import VehicleList from './VehicleList'; // Імпорт для списку автомобілів

const PlanningScreen = () => {
  return (
   
     
      <div className="ps-planning-content">
      
      
        <div className="ps-center-column">
          <RouteManagement />
        </div>
       
      </div>
   
  );
};

export default PlanningScreen;
