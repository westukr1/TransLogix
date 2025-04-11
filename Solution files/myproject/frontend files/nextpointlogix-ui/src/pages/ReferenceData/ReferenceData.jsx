import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './ReferenceData.css';
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";

const ReferenceData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [newFuelType, setNewFuelType] = useState('');

  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getFuelTypes);
        setFuelTypes(response.data);
      } catch (error) {
        console.error('Error fetching fuel types:', error);
      }
    };

    if (tabValue === 0) {
      fetchFuelTypes();
    }
  }, [tabValue]);

  const addFuelType = async () => {
    if (newFuelType.trim() === '') {
      alert(t('fuel_type_empty_error'));
      return;
    }

    if (fuelTypes.some((fuel) => fuel.type.toLowerCase() === newFuelType.toLowerCase())) {
      alert(t('fuel_type_exists_error'));
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/fuel-types/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: newFuelType }),
      });

      if (!response.ok) {
        throw new Error('Failed to add new fuel type');
      }

      const addedFuelType = await response.json();
      setFuelTypes([...fuelTypes, addedFuelType]);
      setNewFuelType('');
      alert(t('fuel_type_add_success'));
    } catch (error) {
      console.error('Error adding fuel type:', error);
      alert(t('fuel_type_add_error'));
    }
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <>
            <div className="ag-theme-alpine" style={{ height: '260px', width: '25%' }}>
              <AgGridReact
                rowData={fuelTypes}
                columnDefs={[
                  { headerName: t('fuel_type_id'), field: 'fuel_type_id', sortable: true, filter: true , width: '50%'},
                  { headerName: t('type'), field: 'type', sortable: true, filter: true },
                ]}
                domLayout={'autoHeight'}
              />
            </div>
            <input
              type="text"
              value={newFuelType}
              onChange={(e) => setNewFuelType(e.target.value)}
              placeholder={t('add_fuel_type_placeholder')}
              style={{ height: '30px', width: '20%' }}
            />
            <div className="fuel-type-actions" style={{ height: '60px', width: '400px' }}>
              <button
                className="nav-button"
                onClick={addFuelType}
                style={{ height: '40px', width: '55%' }}
              >
                {t('add_fuel_type')}
              </button>
            </div>
          </>
        );
      case 1:
        return <p>{t('fuel_prices_content')}</p>;
      case 2:
        return <p>{t('average_fuel_consumption_content')}</p>;
      case 3:
        return <p>{t('rental_rates_content')}</p>;
      case 4:
        return <p>{t('countries_content')}</p>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t('logo_alt_text')} />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/')}>{t('main_screen')}</button>
          <button className="nav-button" onClick={() => window.history.back()}>{t('back')}</button>
        </div>
      </div>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="reference data tabs">
        <Tab label={t('fuel_types')} />
        <Tab label={t('fuel_prices')} />
        <Tab label={t('average_fuel_consumption')} />
        <Tab label={t('rental_rates')} />
        <Tab label={t('countries')} />
      </Tabs>
      <Box sx={{ p: 3 }}>{renderTabContent()}</Box>
      
    </Box>
  );
};

export default ReferenceData;
