import React from 'react';
import './TransportRequest.css';

const TransportRequest = () => {
  return (
    <div className="transport-request">
      {/* Верхня панель */}
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="date-time">
          <p>You are managing transport requests</p>
        </div>
        <div className="nav-buttons">
          <a href="/" className="nav-button">Main Screen</a>
          <a href="/map-of-routes" className="nav-button">Routes Map</a>
          <a href="/calendar" className="nav-button">Calendar</a>
          <a href="/drivers" className="nav-button">Driver Manager</a>
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>

      {/* Нижня частина */}
      <div className="tr-planning-content">
        {/* Перша колонка: Зафіксовані маршрути */}
        <div className="tr-left-column">
          <h2>Confirmed Routes</h2>
          <div className="tr-confirmed-routes-list">
            {/* Список зафіксованих маршрутів */}
          </div>
          <button className="tr-action-button">Unconfirm</button>
        </div>

        {/* Друга колонка: Заплановані маршрути */}
        <div className="tr-middle-column">
          <h2>Scheduled Routes</h2>
          <div className="tr-scheduled-routes-list">
            {/* Список запланованих маршрутів */}
          </div>
          <div className="tr-action-buttons">
            <button className="tr-action-button">Confirm</button>
            <button className="tr-action-button">Delete</button>
            <button className="tr-action-button">Edit</button>
          </div>
        </div>

        {/* Третя колонка: Статус повідомлень */}
        <div className="tr-center-column">
          <h2>Notification Status</h2>
          <div className="tr-notification-status">
            <p><strong>Status of Driver Notifications:</strong></p>
            {/* Статус повідомлень водіям */}
            <p><strong>Status of Passenger Notifications:</strong></p>
            {/* Статус повідомлень пасажирам */}
          </div>
          <div className="tr-action-buttons">
            <button className="tr-action-button">Send Route Updates to Drivers</button>
            <button className="tr-action-button">Send Route Updates to Passengers</button>
          </div>
        </div>

        {/* Четверта колонка: Створені маршрути та пасажири */}
        <div className="tr-right-column">
          <div className="tr-today-routes">
            <h2>Today's Routes</h2>
            {/* Список створених на сьогодні маршрутів */}
          </div>
          <div className="tr-passenger-list">
            <h2>Passengers Assigned to Routes</h2>
            {/* Список пасажирів, розподілених по маршрутах */}
          </div>
          <div className="tr-action-buttons">
            <button className="tr-action-button">Calculate Estimated Boarding Time for Selected Routes</button>
            <button className="tr-action-button">Confirm Selected Routes</button>
            <button className="tr-action-button">Unconfirm Selected Routes</button>
            <button className="tr-action-button">Edit Selected Routes</button>
            <button className="tr-action-button">Send Selected Routes to Drivers and Passengers</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportRequest;
