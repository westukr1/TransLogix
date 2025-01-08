import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './RoutesTableView.css';
import { useTranslation } from 'react-i18next';

const RoutesTableView = () => {
  const { t, i18n } = useTranslation(); // Підключаємо функцію перекладу та i18n

  // Отримуємо мову з LocalStorage під час завантаження компонента
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: 'route_number', headerName: t('route_number'), filter: true, width: 150 },
    { field: 'origin', headerName: t('origin'), filter: true, width: 150 },
    { field: 'destination', headerName: t('destination'), filter: true, width: 150 },
    { field: 'date', headerName: t('date'), filter: 'agDateColumnFilter', width: 150, sort: 'desc' },
    
    // Адреса початкової точки
    { 
      headerName: t('start_location'), 
      children: [
        { field: 'start_city', headerName: t('city'), filter: true },
        { field: 'start_street', headerName: t('street'), filter: true },
        { field: 'start_house', headerName: t('house_number'), filter: true }
      ]
    },
    
    // Адреса кінцевої точки
    { 
      headerName: t('end_location'), 
      children: [
        { field: 'end_city', headerName: t('city'), filter: true },
        { field: 'end_street', headerName: t('street'), filter: true },
        { field: 'end_house', headerName: t('house_number'), filter: true }
      ]
    },
    
    // Інші колонки
    { 
      field: 'distance', 
      headerName: t('distance'), 
      filter: true,
      valueFormatter: params => `${parseFloat(params.value).toFixed(2)} km` // Форматування для distance
    },
    { 
      field: 'estimated_time', 
      headerName: t('estimated_time'), 
      filter: true,
      valueFormatter: params => {
        const hours = Math.floor(params.value / 60);
        const minutes = params.value % 60;
        return `${hours}h ${minutes}m`; // Конвертація estimated_time
      }
    }
  ]);


  // Завантаження даних з бекенду
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
        if (Array.isArray(data)) {
          const formattedData = data.map(route => ({
            route_number: route.route_number,
            origin: route.start_point.city,
            destination: route.end_point.city,
            date: route.date,
            start_city: route.start_point.city,
            start_street: route.start_point.street,
            start_house: route.start_point.house_number,
            end_city: route.end_point.city,
            end_street: route.end_point.street,
            end_house: route.end_point.house_number,
            distance: route.distance,
            estimated_time: route.estimated_time

          }));
          setRowData(formattedData);
        } else {
          console.error('Data format is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching routes:', error);
      });
  }, []);

  return (
    <div className="routes-table-view">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="nav-buttons">
          <a href="/" className="nav-button">{t('back')}</a>
        </div>
      </div>
      <div className="content">
        <div className="routes-left-column">
            <h2>{t('route_list')}</h2>
                    {/* Sidebar буде додано пізніше */}
                </div>
         
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%', overflowX: 'auto'  }}>
          <AgGridReact style={{ overflowX: 'auto' }}
            rowHeight={20}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true, // Сортування за замовчуванням
              filter: true,   // Фільтрація за замовчуванням
              flex: 1,
              minWidth: 100,
            }}
            animateRows={true} // Анімація при зміні рядків
            sortingOrder={['desc', 'asc']} // Порядок сортування за замовчуванням
            >
            </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default RoutesTableView;

