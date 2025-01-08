import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './PassangersTableView.css';
import { Link } from 'react-router-dom';

const PassengersTableView = () => {
  const [passengersRowData, setPassengersRowData] = useState([]);
  const [routesRowData, setRoutesRowData] = useState([]);
  const [locationsRowData, setLocationsRowData] = useState([]);

  // Оновлені назви колонок відповідно до полів з SQL
  const [passengersColumnDefs] = useState([
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'Ім’я' },
    { field: 'last_name', headerName: 'Прізвище' },
    { field: 'department', headerName: 'Департамент' },
    { field: 'pickup_address', headerName: 'Адреса посадки' },
    { field: 'phone_number', headerName: 'Номер телефону' },
    { field: 'email', headerName: 'Електронна пошта' }
  ]);

  const [routesColumnDefs] = useState([
    { field: 'route_number', headerName: 'Номер маршруту' },
    { field: 'start_location', headerName: 'Місце початку' },
    { field: 'end_location', headerName: 'Місце завершення' },
    { field: 'distance', headerName: 'Дистанція' }
  ]);

  const [locationsColumnDefs] = useState([
    { field: 'locationId', headerName: 'ID точки' },
    { field: 'pickupLocation', headerName: 'Точка посадки' },
    { field: 'dropoffLocation', headerName: 'Точка висадки' }
  ]);

  // Завантаження даних пасажирів
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Отримайте токен з localStorage

    fetch('http://localhost:8000/api/passengers/', {
      headers: {
        'Authorization': `Bearer ${token}` // Додайте токен у заголовки запиту
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setPassengersRowData(data);
      } else {
        console.error('Expected array but got:', data);
        setPassengersRowData([]);
      }
    })
    .catch(error => {
      console.error('Error fetching passengers:', error);
      setPassengersRowData([]);
    });
  }, []);

  // Завантаження даних маршрутів
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Отримуємо токен з localStorage

    fetch('http://localhost:8000/api/routes/', {
      headers: {
        'Authorization': `Bearer ${token}` // Додаємо заголовок авторизації
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Перевіряємо, чи є дані масивом
      if (Array.isArray(data)) {
        setRoutesRowData(data); // Правильне збереження даних маршрутів
      } else {
        console.error('Data format is not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching routes:', error);
    });
  }, []);

  return (
    <div className="passenger-table-view">
      <div className="ptw-header">
                <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => window.history.back()}>Головна</button>
        </div>
      </div>

      <div className="passenger-table-content">
        <div className="passenger-left-column">
          {/* Sidebar буде додано пізніше */}
        </div>

        <div className="passenger-right-column">
          <div className="passenger-upper-right">
            <h2>Список пасажирів</h2>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
              <AgGridReact
                rowData={passengersRowData}
                columnDefs={passengersColumnDefs}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  flex: 1,
                  minWidth: 100,
                }}
                animateRows={true}
                sortingOrder={['desc', 'asc']}
              />
            </div>
          </div>

          <div className="passenger-upper-right">
            <h2>Список маршрутів пасажира</h2>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
              <AgGridReact
                rowData={routesRowData}
                columnDefs={routesColumnDefs}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  flex: 1,
                  minWidth: 100,
                }}
                animateRows={true}
                sortingOrder={['desc', 'asc']}
              />
            </div>
          </div>

          <div className="passenger-lower-right">
            <h2>Список точок посадки і висадки пасажира</h2>
            <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
              <AgGridReact
                rowData={locationsRowData}
                columnDefs={locationsColumnDefs}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  flex: 1,
                  minWidth: 100,
                }}
                animateRows={true}
                sortingOrder={['desc', 'asc']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengersTableView;
