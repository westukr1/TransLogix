import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import '../VehicleAndDriverRegistration/DriverRegistration.css';

import "./VehicleEdit.css";
import axios from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../config/apiConfig';

const VehicleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('info');
    const [vehicleData, setVehicleData] = useState(null);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [assignedDrivers, setAssignedDrivers] = useState([]);
    const [allDrivers, setAllDrivers] = useState([]);
    const [updatedDrivers, setUpdatedDrivers] = useState([]);


    useEffect(() => {
        // Fetch vehicle data
        const fetchVehicleData = async () => {
            try {
              const response = await axios.get(`${API_ENDPOINTS.getVehicleById(id)}`);
              setVehicleData(response.data);
            } catch (error) {
              console.error('Error fetching vehicle data:', error);
            }
          };

        // Fetch fuel types
        const fetchFuelTypes = async () => {
            try {
              const response = await axios.get(API_ENDPOINTS.getFuelTypes);
              setFuelTypes(response.data);
            } catch (error) {
              console.error('Error fetching fuel types:', error);
            }
          };
    
    // Fetch assigned drivers// Fetch all drivers
    const fetchDrivers = async () => {
        try {
          const assigned = await axios.get(API_ENDPOINTS.getAssignedDrivers(id));
          const all = await axios.get(API_ENDPOINTS.getDrivers);
  
          setAssignedDrivers(assigned.data);
  
          const nonAssigned = all.data.filter(
            driver => !assigned.data.some(a => a.driver_id === driver.driver_id)
          );
          setAllDrivers(nonAssigned);
        } catch (error) {
          console.error('Error fetching drivers:', error);
        }
      };
    
      fetchVehicleData();
      fetchFuelTypes();
      fetchDrivers();
    }, [id]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === "fuel_type") {
          const selectedFuel = fuelTypes.find(fuel => fuel.fuel_type_id === parseInt(value));
          setVehicleData({
            ...vehicleData,
            fuel_type: selectedFuel,
          });
        } else {
          setVehicleData({
            ...vehicleData,
            [name]: value,
          });
        }
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
          ...vehicleData,
          fuel_type_id: vehicleData.fuel_type?.fuel_type_id || vehicleData.fuel_type,
        };
        try {
          const response = await axios.put(`${API_ENDPOINTS.updateVehicle(id)}`, formattedData);
          if (response.status === 200 || response.status === 204) {
            alert(t('vehicle_updated_successfully'));
            navigate(-1);
          }
        } catch (error) {
          console.error('Error updating vehicle:', error);
          alert(t('error_updating_vehicle'));
        }
      };
    
      const removeDriver = async (driverId) => {
        try {
          await axios.delete(API_ENDPOINTS.removeDriverFromVehicle(id), { data: { driver_id: driverId } });
          alert(t('driver_removed_successfully'));
          updateDriversData();
        } catch (error) {
          console.error('Error removing driver:', error);
          alert(t('error_removing_driver'));
        }
      };
    

      const addDriver = async (driverId) => {
        const payload = {
          assignment_date: new Date().toISOString().split('T')[0],
          order_number: 'NPL-000000',
          is_active: true,
          driver_id: driverId,
          vehicle_id: id,
        };
        try {
          await axios.post(API_ENDPOINTS.assignDriverToVehicle(id), payload);
          alert(t('driver_assigned_successfully'));
          updateDriversData();
        } catch (error) {
          console.error('Error assigning driver:', error);
          alert(t('error_assigning_driver'));
        }
      };
    
    
      const updateDriversData = async () => {
        try {
          const assigned = await axios.get(API_ENDPOINTS.getAssignedDrivers(id));
          const all = await axios.get(API_ENDPOINTS.getDrivers);
    
          setAssignedDrivers(assigned.data);
          const nonAssigned = all.data.filter(
            driver => !assigned.data.some(a => a.driver_id === driver.driver_id)
          );
          setAllDrivers(nonAssigned);
        } catch (error) {
          console.error('Error refreshing drivers data:', error);
        }
      };
    const handleCellValueChange = (params) => {
        const updatedDriver = params.data; // Оновлені дані
        console.log('Driver updated:', updatedDriver);
    
        setUpdatedDrivers((prev) => {
            // Додаємо новий запис або оновлюємо існуючий у масиві
            const existingIndex = prev.findIndex((driver) => driver.driver_id === updatedDriver.driver_id);
            if (existingIndex > -1) {
                const updatedList = [...prev];
                updatedList[existingIndex] = updatedDriver;
                return updatedList;
            }
            return [...prev, updatedDriver];
        });
    };
    const saveChanges = async () => {
        if (!updatedDrivers.length) {
          alert(t('no_changes_to_save'));
          return;
        }
        try {
          await axios.put(API_ENDPOINTS.bulkUpdateDrivers, updatedDrivers);
          alert(t('changes_saved_successfully'));
          setUpdatedDrivers([]);
          updateDriversData();
        } catch (error) {
          console.error('Error saving driver changes:', error);
          alert(t('error_saving_changes'));
        }
      };
    
     
    if (!vehicleData) return <div>{t('loading')}</div>;

    return (
        <div className="two-column-template">
            <div className="top-nav-bar">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <h2 className="header-title">{t('edit_vehicle')}</h2>

                <div className="nav-buttons">
                    <button className="nav-button" onClick={() => navigate('/')}>{t('nav.main_screen')}</button>
                    <button className="nav-button" onClick={() => navigate(-1)}>{t('nav.back')}</button>
                </div>
            </div>

            <div className="ve-template21-content">
                <div className="ve-template21-left-column">
                    <div className="vehicle-image-box">
                        <img
                            src={vehicleData.image_url || require('../VehicleAndDriverRegistration/defaultPictureVehicle.jpg')}
                            alt={t('vehicle_image')}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                        />
                    </div>
                    
                </div>

                <div className="ve-template21-right-column" style={{width: '100%' }}>
                    <div className="tab-container">
                        <button 
                            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                            onClick={() => handleTabChange('info')}
                        >
                            {t('vehicle_info')}
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'drivers' ? 'active' : ''}`}
                            onClick={() => handleTabChange('drivers')}
                        >
                            {t('assigned_drivers')}
                        </button>
                    </div>

                    {activeTab === 'info' && (
                        <form className="driver-registration-fields" onSubmit={handleSubmit}>
                            <label htmlFor="vehicle_id">{t('vehicle_id')}</label>
                            <input
                                type="text"
                                id="vehicle_id"
                                name="vehicle_id"
                                value={vehicleData.vehicle_id}
                                readOnly
                            />

                            <label htmlFor="image_url">{t('image_url')}</label>
                            <input
                                type="text"
                                id="image_url"
                                name="image_url"
                                value={vehicleData.image_url}
                                readOnly
                            />

                            <label htmlFor="license_plate">{t('license_plate')}</label>
                            <input
                                type="text"
                                id="license_plate"
                                name="license_plate"
                                value={vehicleData.license_plate}
                                onChange={handleChange}
                            />

                            <label htmlFor="make">{t('make')}</label>
                            <input
                                type="text"
                                id="make"
                                name="make"
                                value={vehicleData.make}
                                onChange={handleChange}
                            />

                            <label htmlFor="model">{t('model')}</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={vehicleData.model}
                                onChange={handleChange}
                            />

                            <label htmlFor="year">{t('year')}</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={vehicleData.year}
                                onChange={handleChange}
                            />

                            <label htmlFor="engine_volume">{t('engine_volume')}</label>
                            <input
                                type="number"
                                id="engine_volume"
                                name="engine_volume"
                                value={vehicleData.engine_volume}
                                onChange={handleChange}
                            />

                            <label htmlFor="registered_to">{t('registered_to')}</label>
                            <input
                                type="text"
                                id="registered_to"
                                name="registered_to"
                                value={vehicleData.registered_to}
                                onChange={handleChange}
                            />

                            <label htmlFor="chassis_number">{t('chassis_number')}</label>
                            <input
                                type="text"
                                id="chassis_number"
                                name="chassis_number"
                                value={vehicleData.chassis_number}
                                onChange={handleChange}
                            />

                            <label htmlFor="city_fuel_consumption">{t('city_fuel_consumption')}</label>
                            <input
                                type="number"
                                id="city_fuel_consumption"
                                name="city_fuel_consumption"
                                value={vehicleData.city_fuel_consumption}
                                onChange={handleChange}
                            />

                            <label htmlFor="highway_fuel_consumption">{t('highway_fuel_consumption')}</label>
                            <input
                                type="number"
                                id="highway_fuel_consumption"
                                name="highway_fuel_consumption"
                                value={vehicleData.highway_fuel_consumption}
                                onChange={handleChange}
                            />

                            <label htmlFor="fuel_type">{t('fuel_type')}</label>
                            <select
                                id="fuel_type"
                                name="fuel_type"
                                value={vehicleData.fuel_type?.fuel_type_id || ''}
                                onChange={handleChange}
                            >
                                <option value="">{t('select_fuel_type')}</option>
                                {fuelTypes.map(fuel => (
                                    <option key={fuel.fuel_type_id} value={fuel.fuel_type_id}>
                                        {fuel.type}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="capacity">{t('capacity')}</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={vehicleData.capacity}
                                onChange={handleChange}
                            />

                            {/* <button type="submit" className="nav-button">
                                {t('save')}
                            </button> */}
                        </form>
                    )}

                    {activeTab === 'drivers' && (
                        <div className="drivers-section">
                            <h3 style={{ color: 'white' }}>{t('assigned_drivers')}</h3>
                            

                            <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
                                <AgGridReact
                                    rowData={assignedDrivers}
                                    onCellValueChanged={handleCellValueChange}
                                    columnDefs={[
                                        {
                                            headerName: t('actions'),
                                            field: 'actions',
                                            cellRenderer: (params) => (
                                                <button className= "button-actions"
                                                    onClick={() => removeDriver(params.data.driver_id)}
                                                    
                                                >
                                                    {t('remove')}
                                                </button>
                                            ),
                                            width: 100,
                                        },
                                        
                                        { headerName: t('driver_id'), field: 'driver_id', editable: false, width: 30 },
                                        { headerName: t('last_name'), field: 'last_name', editable: true, width: 100 },
                                        { headerName: t('first_name'), field: 'first_name', editable: true, width: 100 },
                                        { headerName: t('middle_name'), field: 'middle_name', editable: true, width: 100 },
                                        { headerName: t('phone_number'), field: 'phone_number', editable: true, width: 100 },
                                        { headerName: t('email'), field: 'email', editable: true, width: 150 },
                                        { headerName: t('citizenship'), field: 'citizenship', editable: true, width: 100 },
                                        { headerName: t('contract_type'), field: 'contract_type', editable: true, width: 100 },
                                        { headerName: t('driving_experience'), field: 'driving_experience', editable: true, width: 100 },
                                        { headerName: t('license_category'), field: 'license_category', editable: true, width: 100 },
                                        { headerName: t('license_issue_date'), field: 'license_issue_date', editable: true, width: 100 },
                                        { headerName: t('license_issuer'), field: 'license_issuer', editable: true, width: 100 },
                                        { headerName: t('registration_address'), field: 'registration_address', editable: true, width: 100 },
                                        { headerName: t('residence_address'), field: 'residence_address', editable: true, width: 100 },
                                        { headerName: t('year_of_birth'), field: 'year_of_birth', editable: true, width: 100 },
                                        { headerName: t('license_number'), field: 'license_number', editable: true, width: 100 },
                                        { headerName: t('active'), field: 'active', editable: true, width: 100 },
                                        { headerName: t('image_url'), field: 'image_url', editable: true, width: 100 },
                                    ]}
                                />
                            </div>

                            <h3 style={{ color: 'white' }}>{t('all_drivers')}</h3>
                            <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
                                <AgGridReact
                                    rowData={allDrivers}
                                    onCellValueChanged={handleCellValueChange}
                                    columnDefs={[
                                        {
                                            headerName: t('actions'),
                                            field: 'actions',
                                            cellRenderer: (params) => (
                                                <button className= "button-actions"
                                                    onClick={() => addDriver(params.data.driver_id)}
                                                    
                                                >
                                                    {t('assign')}
                                                </button>
                                            ),
                                            width: 100,
                                        },
                                        
                                        { headerName: t('last_name'), field: 'last_name', editable: true, width: 100 },
                                        { headerName: t('first_name'), field: 'first_name', editable: true, width: 100 },
                                        { headerName: t('middle_name'), field: 'middle_name', editable: true, width: 100 },
                                        { headerName: t('phone_number'), field: 'phone_number', editable: true, width: 100 },
                                        { headerName: t('email'), field: 'email', editable: true, width: 150 },
                                        { headerName: t('citizenship'), field: 'citizenship', editable: true, width: 100 },
                                        { headerName: t('contract_type'), field: 'contract_type', editable: true, width: 100 },
                                        { headerName: t('driving_experience'), field: 'driving_experience', editable: true, width: 100 },
                                        { headerName: t('license_category'), field: 'license_category', editable: true, width: 100 },
                                        { headerName: t('license_issue_date'), field: 'license_issue_date', editable: true, width: 100 },
                                        { headerName: t('license_issuer'), field: 'license_issuer', editable: true, width: 100 },
                                        { headerName: t('registration_address'), field: 'registration_address', editable: true, width: 100 },
                                        { headerName: t('residence_address'), field: 'residence_address', editable: true, width: 100 },
                                        { headerName: t('year_of_birth'), field: 'year_of_birth', editable: true, width: 100 },
                                        { headerName: t('license_number'), field: 'license_number', editable: true, width: 100 },
                                        { headerName: t('active'), field: 'active', editable: true, width: 100 },
                                        { headerName: t('image_url'), field: 'image_url', editable: true, width: 100 },
                                    ]}
                                />
                            </div>
                            
                        </div>
                    )}
                    <button className="nav-button"
                                onClick={saveChanges}>{t('save_changes')}
                            </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleEdit;
