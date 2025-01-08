import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Calendar.css';

function Calendar() {
  const [view, setView] = useState('month'); // Вибір між 'month', 'week', 'day'
  const [filter, setFilter] = useState(''); // Поточний фільтр
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7)); // Початковий місяць - серпень 2024 року

  // Приклад даних для маршрутів
  const routes = [
    {
      date: '2024-08-23',
      status: 'completed', // 'planned', 'cancelled', 'in-progress', 'completed'
      vehicleNumber: 'AA 1234 BO',
      driverName: 'John Doe',
      routeNumber: '1',
      routeName: 'Central Station',
      distance: '50km',
    },
    {
      date: '2024-08-23',
      status: 'cancelled',
      vehicleNumber: 'AA 5678 BO',
      driverName: 'Jane Smith',
      routeNumber: '2',
      routeName: 'North Park',
      distance: '30km',
    },
    // Додайте більше даних для різних днів
  ];

  const filteredRoutes = routes.filter(route => {
    if (!filter) return true;
    return route.driverName === filter || route.vehicleNumber === filter || route.routeNumber === filter;
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderMonthView = () => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // Початок місяця
    const adjustedStartDay = (startDay === 0) ? 6 : startDay - 1; // Для початку тижня з понеділка
    const weeks = [];
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    let dayCounter = 1;
    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      const days = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        if (weekIndex === 0 && dayIndex < adjustedStartDay) {
          days.push(<td key={dayIndex}></td>); // Пусті клітинки до початку місяця
        } else if (dayCounter <= daysInMonth) {
          const routeCount = filteredRoutes.filter(route => route.date === `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`).length;
          const cancelledCount = filteredRoutes.filter(route => route.status === 'cancelled' && route.date === `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`).length;
          days.push(
            <td key={dayIndex} className={dayIndex >= 5 ? 'weekend' : ''}>
              <p>{dayCounter} - {routeCount} ({cancelledCount})</p> {/* Виведення в один рядок */}
            </td>
          );
          dayCounter++;
        } else {
          days.push(<td key={dayIndex}></td>); // Пусті клітинки після закінчення місяця
        }
      }
      weeks.push(<tr key={weekIndex}>{days}</tr>);
    }

    return (
      <div className="calendar-month">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h3>{monthName} {year}</h3>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <table className="month-table">
          <thead>
            <tr className="days-header">
              {daysOfWeek.map((day, index) => (
                <th key={day} className={index >= 5 ? 'weekend' : ''}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = ['23 Aug', '24 Aug', '25 Aug', '26 Aug', '27 Aug', '28 Aug', '29 Aug'];
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="calendar-week">
        <h2>Week 34 (23 Aug - 29 Aug 2024)</h2>
        <table className="week-table">
          <thead>
            <tr className="week-header">
              {weekDates.map((date, index) => (
                <th key={index} className={index >= 5 ? 'weekend' : ''}>{`${date} (${daysOfWeek[index]})`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map((date, index) => (
                <td key={index} className={index >= 5 ? 'weekend' : ''}>
                  {filteredRoutes.map(route => (
                    <p key={route.routeNumber}>
                      {route.routeNumber}, {route.status === 'completed' ? '✓' : '✗'}, {route.driverName}, {route.vehicleNumber}, {route.routeName}, {route.distance}
                    </p>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderDayView = () => {
    return (
      <div className="calendar-day-view">
        <div className="day-header">
          <h2>23 August 2024 - John Doe</h2>
        </div>
        {filteredRoutes.map(route => (
          <div key={route.routeNumber} className="cal-route-item">
            <p>
              {route.routeNumber}, {route.status}, {route.driverName}, {route.vehicleNumber}, {route.routeName}, {route.distance}
            </p>
            <div className="cal-route-buttons">
              <button className="btn-details">Details</button>
              <button className="btn-map">Show on Map</button>
              <button className="btn-message">Message Driver</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Link to="/" className="back-button">Back to Operator UI</Link>
        <h2 className="calendar-title">Calendar</h2>
        <div className="calendar-view-buttons">
          <button onClick={() => setView('month')}>Month</button>
          <button onClick={() => setView('week')}>Week</button>
          <button onClick={() => setView('day')}>Day</button>
        </div>
      </div>
      <div className="calendar-content">
        <div className="calendar-main">
          {view === 'month' && renderMonthView()}
          {view === 'week' && renderWeekView()}
          {view === 'day' && renderDayView()}
        </div>
        <div className="calendar-filter-buttons">
          <button onClick={() => setFilter('John Doe')}>Filter by Driver</button>
          <button onClick={() => setFilter('AA 1234 BO')}>Filter by Vehicle</button>
          <button onClick={() => setFilter('1')}>Filter by Route</button>
          <button onClick={() => setFilter('')}>Clear Filter</button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
