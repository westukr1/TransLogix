import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import '../VehicleAndDriverRegistration/DriverRegistration.css';

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
        fetch(`http://localhost:8000/vehicles/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched vehicle data:', data);
                setVehicleData(data);
            })
            .catch(error => console.error('Error fetching vehicle data:', error));

        // Fetch fuel types
        fetch('http://localhost:8000/api/fuel-types/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Fetched fuel types:', data);
                setFuelTypes(data);
            })
            .catch(error => console.error('Error fetching fuel types:', error));
    
    // Fetch assigned drivers
    fetch(`http://localhost:8000/vehicles/${id}/drivers/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => setAssignedDrivers(data))
        .catch(error => console.error('Error fetching assigned drivers:', error));
    // Fetch all drivers
    fetch('http://localhost:8000/api/drivers/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => setAllDrivers(data))
        .catch(error => console.error('Error fetching all drivers:', error));
    }, [id]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Формуємо дані для відправки
        const formattedData = {
            ...vehicleData,
            fuel_type_id: vehicleData.fuel_type?.fuel_type_id || vehicleData.fuel_type, // Забезпечуємо присутність fuel_type_id
        };
        try {
            const response = await fetch(`http://localhost:8000/vehicles/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert(t('vehicle_updated_successfully'));
                navigate(-1);
            } else {
                const errorData = await response.json();
                alert(t('error_updating_vehicle') + ': ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert(t('error.network') + ': ' + error.message);
        }
    };
    const removeDriver = async (driverId) => {
        try {
            const response = await fetch(`http://localhost:8000/vehicles/${id}/remove-driver/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ driver_id: driverId }), // Передаємо ID водія
            });
    
            if (response.ok) {
                alert(t('driver_removed_successfully')); // Повідомлення про успішне видалення
                updateDriversData(); // Оновлюємо таблиці
            } else {
                const errorData = await response.json();
                alert(t('error_removing_driver') + ': ' + JSON.stringify(errorData)); // Обробка помилки
            }
        } catch (error) {
            console.error('Error removing driver:', error);
            alert(t('error.network') + ': ' + error.message); // Повідомлення про мережеву помилку
        }
    };
    

    const addDriver = async (driverId) => {
        try {
            const response = await fetch(`http://localhost:8000/vehicles/${id}/assign-driver/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assignment_date: new Date().toISOString().split('T')[0], // Поточна дата
                    order_number: 'NPL-000000', // Замовчування
                    is_active: true, // Активний статус
                    driver_id: driverId,
                    vehicle_id: id,
                }),
                
            });
            console.log('Driver ID to assign:', driverId);

            console.log('Sending data to backend:', {
                assignment_date: new Date().toISOString().split('T')[0],
                order_number: 'NPL-000000',
                is_active: true,
                driver_id: driverId,
                vehicle_id: id,
            });
            
            if (response.ok) {
                alert(t('driver_assigned_successfully'));
                updateDriversData(); // Оновлення таблиць
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert(t('error_assigning_driver') + ': ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert(t('error.network') + ': ' + error.message);
        }
    };
    
    const updateDriversData = async () => {
        try {
            // Оновлюємо список призначених водіїв
            const assignedResponse = await fetch(`http://localhost:8000/vehicles/${id}/assigned-drivers/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const assignedData = await assignedResponse.json();
            setAssignedDrivers(assignedData);
    
            // Оновлюємо список усіх водіїв
            const allDriversResponse = await fetch('http://localhost:8000/api/drivers/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const allDriversData = await allDriversResponse.json();
    
            // Фільтруємо лише тих, хто не призначений
            const nonAssignedDrivers = allDriversData.filter(
                driver => !assignedData.some(assigned => assigned.driver_id === driver.driver_id)
            );
            setAllDrivers(nonAssignedDrivers);
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
        if (updatedDrivers.length === 0) {
            alert(t('no_changes_to_save'));
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/api/drivers/bulk-update/', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDrivers),
            });
    
            if (response.ok) {
                alert(t('changes_saved_successfully'));
                setUpdatedDrivers([]); // Очищуємо список змінених водіїв
                updateDriversData(); // Оновлюємо таблиці
            } else {
                const errorData = await response.json();
                console.error('Error saving changes:', errorData);
                alert(t('error_saving_changes') + ': ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert(t('error.network') + ': ' + error.message);
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

            <div className="template21-content">
                <div className="template21-left-column">
                    <div className="vehicle-image-box">
                        <img
                            src={vehicleData.image_url || require('../VehicleAndDriverRegistration/defaultPictureVehicle.jpg')}
                            alt={t('vehicle_image')}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                        />
                    </div>
                    
                </div>

                <div className="template21-right-column">
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

                            <button type="submit" className="nav-button">
                                {t('save')}
                            </button>
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
                            <button className="nav-button"
                                onClick={saveChanges}>{t('save_changes')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleEdit;
