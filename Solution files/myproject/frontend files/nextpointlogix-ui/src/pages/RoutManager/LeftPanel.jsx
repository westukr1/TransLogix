import React from 'react';
import './LeftPanel.css';

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="driver-passenger-section">
        <div className="driver-list">
          <h3>Drivers</h3>
          {/* Вставте тут компонент списку водіїв */}
          <DriverList />
        </div>
        <div className="passenger-list">
          <h3>Passengers</h3>
          {/* Вставте тут компонент списку пасажирів */}
          <PassengerList />
        </div>
      </div>
      {/* Нижня частина лівої панелі, яка може містити інший контент */}
      <div className="other-content">
        {/* Інший контент */}
      </div>
    </div>
  );
};

export default LeftPanel;
