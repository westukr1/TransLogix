import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import '../VehicleAndDriverRegistration/DriverRegistration.css';

const DriverEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { id } = useParams();
  const { id: driverId } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); 
  const [allDrivers, setAllDrivers] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);    
  const [assignedDrivers, setAssignedDrivers] = useState([]);  
  const [updatedDrivers, setUpdatedDrivers] = useState([]);    
  const defaultImageUrl = require('../VehicleAndDriverRegistration/defaultPictureVehicle.jpg');
  
  const [driverData, setDriverData] = useState(null);
  const [vehicleRowData, setVehicleRowData] = useState([]);
  const [assignedVehicles, setAssignedVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);

  // test - fuckin vehicle fuck you fuck you 2 times 3 times
      useEffect(() => {
        // Fetch driver data
        fetch(`http://localhost:8000/api/drivers/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Fetched driver data:', data);
                setDriverData(data); // Установка стану
            })
            .catch(error => console.error('Error fetching driver data:', error));
    
  
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
      
        }, [id]);
      useEffect(() => {
        // Fetch assigned vehicles
        fetch(`http://localhost:8000/drivers/${id}/vehicles/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setAssignedVehicles(data);
            })
            .catch(error => console.error('Error fetching assigned vehicles:', error));
    
        // Fetch all vehicles
        fetch('http://localhost:8000/api/vehicles/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setAvailableVehicles(data)) // Зберігаємо всі автомобілі
            .catch(error => console.error('Error fetching all vehicles:', error));
    }, [id]);
    
    useEffect(() => {
        // Фільтруємо доступні автомобілі після оновлення assignedVehicles
        if (assignedVehicles.length > 0 && availableVehicles.length > 0) {
            const nonAssignedVehicles = availableVehicles.filter(
                vehicle => !assignedVehicles.some(
                    assigned => assigned.vehicle_id === vehicle.vehicle_id
                )
            );
            setAllVehicles(nonAssignedVehicles);
        }
    }, [assignedVehicles, availableVehicles]);
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const assignedResponse = await fetch(`http://localhost:8000/drivers/${id}/vehicles/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const assignedData = await assignedResponse.json();
                setAssignedVehicles(assignedData);
    
                const availableResponse = await fetch('http://localhost:8000/api/vehicles/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const availableData = await availableResponse.json();
                setAvailableVehicles(availableData);
    
                const nonAssignedVehicles = availableData.filter(
                    vehicle => !assignedData.some(
                        assigned => assigned.vehicle_id === vehicle.vehicle_id
                    )
                );
                setAllVehicles(nonAssignedVehicles);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
    
        fetchVehicles();
    }, [id]);
    
      const handleTabChange = (tab) => {
          setActiveTab(tab);
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDriverData({
            ...driverData,
            [name]: value,
        });
    };
    
      const handleChange = (e) => {
          const { name, value } = e.target;
          setVehicleData({
              ...vehicleData,
              [name]: value,
          });
      };
  
      const saveDriverData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/drivers/update/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driverData),
            });

            if (response.ok) {
                alert(t('driver_saved_successfully'));
            } else {
                const errorData = await response.json();
                alert(t('error_saving_driver') + ': ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error saving driver data:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            // Отримуємо призначені транспортні засоби
            const assignedResponse = await fetch(`http://localhost:8000/drivers/${id}/vehicles/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const assignedData = await assignedResponse.json();
            setAssignedVehicles(assignedData);
    
            // Отримуємо всі транспортні засоби
            const availableResponse = await fetch('http://localhost:8000/api/vehicles/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const availableData = await availableResponse.json();
    
            // Фільтруємо доступні транспортні засоби
            const nonAssignedVehicles = availableData.filter(
                (vehicle) => !assignedData.some((assigned) => assigned.vehicle_id === vehicle.vehicle_id)
            );
            setAllVehicles(nonAssignedVehicles);
            setAvailableVehicles(nonAssignedVehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };
    
    
    
    const removeVehicle = async (vehicleId, driverId) => {
        try {
            console.log('Removing assignment:', { vehicleId, driverId });
    
            const response = await fetch('http://localhost:8000/api/vehicles/remove-assignment/', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicle_id: vehicleId,
                    driver_id: driverId,
                }),
            });
    
            if (response.ok) {
                alert('Assignment removed successfully.');
    
                // Оновлення таблиць
                await fetchVehicles(); // Викликаємо функцію для оновлення даних таблиць
            } else {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert(`Network error: ${error.message}`);
        }
    };
    
    
    
    
    
    const addVehicle = async (vehicleId) => {
        try {
            const response = await fetch(`http://localhost:8000/driver/${id}/assign-vehicle/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assignment_date: new Date().toISOString().split('T')[0],
                    order_number: 'NPL-000000',
                    is_active: true,
                    driver_id: id, // ID водія
                    vehicle_id: vehicleId, // ID транспортного засобу
                }),
            });
    
            if (response.ok) {
                alert(t('vehicle_assigned_successfully'));
                fetchVehicles(); // Оновлення таблиць
            } else {
                const errorData = await response.json();
                alert(t('error_assigning_vehicle') + ': ' + JSON.stringify(errorData));
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
        const updatedVehicle = params.data; // Оновлені дані
        console.log('Updated vehicle:', updatedVehicle);
    
        setVehicleRowData((prev) => {
            const existingIndex = prev.findIndex((vehicle) => vehicle.vehicle_id === updatedVehicle.vehicle_id);
            if (existingIndex > -1) {
                const updatedList = [...prev];
                updatedList[existingIndex] = updatedVehicle;
                return updatedList;
            }
            return [...prev, updatedVehicle];
        });
    };
    
      const handleSaveWithConfirmation = () => {
        if (window.confirm('Are you sure you want to save changes?')) {
            saveChanges(); // Виклик існуючої функції `saveChanges`
        }
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
        
      const updateFuelType = (vehicleId, fuelTypeId) => {
        fetch('http://localhost:8000/api/vehicles/update-fuel-type/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vehicle_id: vehicleId,
            fuel_type_id: fuelTypeId,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update fuel type');
            }
            return response.json();
          })
          .then(() => {
            // Refresh the table data after successful update
            fetch('http://localhost:8000/api/vehicles/', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(data => {
                setVehicleRowData(Array.isArray(data) ? data : []);
              })
              .catch(error => console.error('Error refreshing vehicles:', error));
          })
          .catch(error => console.error('Error updating fuel type:', error));
      };
      const saveVehiclesBulk = () => {
        const payload = vehicleRowData.map(vehicle => ({
            vehicle_id: vehicle.vehicle_id,
            license_plate: vehicle.license_plate,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            capacity: vehicle.capacity || 0, // Значення за замовчуванням
            fuel_type_id: vehicle.fuel_type?.fuel_type_id || null, // Використовуємо значення за замовчуванням
            chassis_number: vehicle.chassis_number || '',
            city_fuel_consumption: vehicle.city_fuel_consumption || 0,
            highway_fuel_consumption: vehicle.highway_fuel_consumption || 0,
            registered_to: vehicle.registered_to || '',
            license_plate_format: vehicle.license_plate_format || '',
            engine_volume: vehicle.engine_volume || 0,
            active: vehicle.active || false,
            image_url: vehicle.image_url || '',
        }));
    
        console.log('Sending vehicles payload:', payload);
    
        fetch('http://localhost:8000/api/vehicles/bulk-update/', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(JSON.stringify(data));
                    });
                }
                return response.json();
            })
            .then(data => {
                alert('Vehicles updated successfully');
                fetchVehicles(); // Оновлюємо таблиці
            })
            .catch(error => {
                console.error('Error updating vehicles:', error);
            });
    };
    const saveAssignedVehiclesBulk = () => {
        const payload = assignedVehicles.map(vehicle => ({
            vehicle_id: vehicle.vehicle_id,
            license_plate: vehicle.license_plate,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            capacity: vehicle.capacity || 0,
            fuel_type_id: vehicle.fuel_type?.fuel_type_id || null, // Виправлення
            chassis_number: vehicle.chassis_number || '',
            city_fuel_consumption: vehicle.city_fuel_consumption || 0,
            highway_fuel_consumption: vehicle.highway_fuel_consumption || 0,
            registered_to: vehicle.registered_to || '',
            license_plate_format: vehicle.license_plate_format || '',
            engine_volume: vehicle.engine_volume || 0,
            active: vehicle.active || false,
            image_url: vehicle.image_url || '',
        }));
    
        console.log('Sending assigned vehicles payload:', payload);
    
        fetch('http://localhost:8000/api/vehicles/bulk-update/', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(JSON.stringify(data));
                    });
                }
                return response.json();
            })
            .then(data => {
                
                fetchVehicles(); // Оновлюємо таблиці
            })
            .catch(error => {
                console.error('Error updating assigned vehicles:', error);
            });
    };
    const saveAllChanges = async () => {
        try {
            saveAssignedVehiclesBulk(); 
            saveVehiclesBulk();        
               // Повідомлення про успішне збереження
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };
    
      
  
  
      if (!driverData) {
        return <div>{t('loading')}</div>;
    }
    


  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t('logo.alt')} />
        </div>
        <h2 className="header-title">{t('driver_edit')}</h2>
        
        <div className="date-time">{new Date().toLocaleString()}</div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/')}>{t('nav.main_screen')}</button>
          <button className="nav-button" onClick={() => navigate(-1)}>{t('nav.back')}</button>
        </div>
      </div>
      <div className="template21-content">
        <div className="template21-left-column">
          <div className="driver-registration-buttons">
            <div className="image-box">
            <img src={driverData.image_url}  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            <div className="rating-panel">{t('fields.current_rating', { rating: 5.0 })}</div>
            <button>{t('buttons.upload_picture')}</button>
            

          </div>
        </div>
        <div className="template21-right-column">
        <div className="tab-container">
                        <button 
                            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                            onClick={() => handleTabChange('info')}
                        >
                            {t('driver_info')}
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'vehicles' ? 'active' : ''}`}
                            onClick={() => handleTabChange('vehicles')}
                        >
                            {t('assigned_vehicles')}
                        </button>
                    </div>

                    {activeTab === 'info' && (
                        <form className="driver-registration-fields">
		<label htmlFor="vehicle_id">{t('vehicle_id')}</label>
                            <input
                                type="text"
                                id="driver_id"
                                name="driver_id"
                                value={driverData.driver_id}
                                readOnly
                            />
          <label htmlFor="image_url">{t('image_url')}</label>
                        <input
                            type="url"
                            id="image_url"
                            name="image_url"
                            placeholder={t('enter_image_url')}
                            value={driverData.image_url}
                            onChange={handleInputChange}
                        />
            <label>{t('fields.last_name')}:</label>
            <input 
                name="last_name" 
                type="text" 
                value={driverData.last_name || ''} 
                onChange={handleInputChange} 
            />

            <label>{t('fields.first_name')}:</label>
                <input 
                    name="first_name" 
                    type="text" 
                    value={driverData.first_name || ''} 
                    onChange={handleInputChange} 
                />

            <label>{t('fields.middle_name')}:</label>
                <input 
                    name="middle_name" 
                    type="text" 
                    value={driverData.middle_name || ''} 
                    onChange={handleInputChange} 
                />


            <label>{t('fields.phone_number')}:</label>
                <input 
                    name="phone_number" 
                    type="text" 
                    value={driverData.phone_number || ''} 
                    onChange={handleInputChange} 
                />

            <label>{t('fields.email')}:</label>
                <input 
                    name="email" 
                    type="email" 
                    value={driverData.email || ''} 
                    onChange={handleInputChange} 
                />

            <label>{t('fields.year_of_birth')}:</label>
                <input 
                    name="year_of_birth" 
                    type="number" 
                    value={driverData.year_of_birth || ''} 
                    onChange={handleInputChange} 
                />

            <label>{t('fields.citizenship')}:</label>
                <input 
                    name="citizenship" 
                    type="text" 
                    value={driverData.citizenship || ''} 
                    onChange={handleInputChange} 
                />

            <label>{t('fields.contract_type')}:</label>
                <input 
                    name="contract_type" 
                    type="text" 
                    value={driverData.contract_type || ''} 
                    onChange={handleInputChange} 
                />

            <label>{t('fields.residence_address')}:</label>
            <input 
                name="residence_address" type="text" 
                value={driverData.residence_address|| ''}
                onChange={handleInputChange} />

            <label>{t('fields.registration_address')}:</label>
            <input 
                name="registration_address" type="text" 
                value={driverData.registration_address || ''}
                onChange={handleInputChange} />

            <label>{t('fields.driving_experience')}:</label>
            <input 
                name="driving_experience" type="number" 
                value={driverData.driving_experience || ''}
                onChange={handleInputChange} />

            <label>{t('fields.license_category')}:</label>
            <input 
                name="license_category" type="text" 
                value={driverData.license_category || ''}
                onChange={handleInputChange} />

            <label>{t('fields.license_issue_date')}:</label>
            <input 
                name="license_issue_date" type="date" 
                value={driverData.license_issue_date || ''}
                onChange={handleInputChange} />

            <label>{t('fields.license_issuer')}:</label>
            <input 
                name="license_issuer" type="text" 
                value={driverData.license_issuer || ''}
                onChange={handleInputChange} />

            <label>{t('fields.license_number')}:</label>
            <input 
                name="license_number"  // Оновлено `name`
                type="text" 
                value={driverData.license_number || ''} 
                onChange={handleInputChange} 
            />


            <button type="button" 
                    className="nav-button" 
                    onClick={saveDriverData}>
                            {t('save')}
            </button>
          </form>
                    )}
    {activeTab === 'vehicles' && (
                            <div className="drivers-section">
                                <h3 style={{ color: 'white' }}>{t('assigned_vehicles')}</h3>
                                
    
                                <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
                                    <AgGridReact
                                        rowData={assignedVehicles}
                                        onCellValueChanged={handleCellValueChange}
                                        columnDefs={[
                                            {
                                                headerName: t('actions'),
                                                field: 'actions',
                                                width: 100,
                                                cellRenderer: (params) => (
                                                    <button
                                                        className="button-actions"
                                                        onClick={() => removeVehicle(params.data.vehicle_id, driverId)}
                                                    >
                                                        {t('remove')}
                                                    </button>
                                                ),
                                            },
                                            { headerName: t('vehicle_id'), field: 'vehicle_id', editable: false, width: 30 },
                                            { headerName: t('license_plate'), field: 'license_plate', editable: true, width: 100 },
                                            { headerName: t('make'), field: 'make', editable: true, width: 100 },
                                            { headerName: t('model'), field: 'model', editable: true, width: 100 },
                                            { headerName: t('capacity'), field: 'capacity', editable: true, width: 100 },
                                            {
                                                headerName: t('fuel_type'),
                                                field: 'fuel_type',
                                                editable: true,
                                                width: 150,
                                                valueFormatter: params => {
                                                    return params.value?.type || ''; // Відображаємо `type`, якщо об'єкт існує
                                                },
                                                cellEditor: 'agSelectCellEditor',
                                                cellEditorParams: {
                                                    values: fuelTypes.map(fuel => fuel.type), // Масив назв типів пального
                                                },
                                                onCellValueChanged: params => {
                                                    const selectedFuel = fuelTypes.find(fuel => fuel.type === params.newValue);
                                                    if (selectedFuel) {
                                                        setAssignedVehicles(prev =>
                                                            prev.map(vehicle =>
                                                                vehicle.vehicle_id === params.data.vehicle_id
                                                                    ? { ...vehicle, fuel_type: selectedFuel }
                                                                    : vehicle
                                                            )
                                                        );
                                                        updateFuelType(params.data.vehicle_id, selectedFuel.fuel_type_id);
                                                    }
                                                },
                                            },
                                            
                                            { headerName: t('year'), field: 'year', editable: true, width: 100 },
                                            { headerName: t('engine_volume'), field: 'engine_volume', editable: true, width: 100 },
                                            { headerName: t('city_fuel_consumption'), field: 'city_fuel_consumption', editable: true, width: 100 },
                                            { headerName: t('highway_fuel_consumption'), field: 'highway_fuel_consumption', editable: true, width: 100 },
                                            { headerName: t('registered_to'), field: 'registered_to', editable: true, width: 200 },
                                            { headerName: t('license_plate_format'), field: 'license_plate_format', editable: true, width: 100 },
                                            { headerName: t('chassis_number'), field: 'chassis_number', editable: true, width: 150 },
                                            { headerName: t('active'), field: 'active', editable: true, width: 100 },
                                            { headerName: t('image_url'), field: 'image_url', editable: true, width: 100 },
                                        ]}
                                    />
                                </div>
    
                                <h3 style={{ color: 'white' }}>{t('all_vehicles')}</h3>
                                <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
                                    <AgGridReact
                                        rowData={allVehicles}
                                        onCellValueChanged={handleCellValueChange}
                                        columnDefs={[
                                            {
                                                headerName: t('actions'),
                                                field: 'actions',
                                                cellRenderer: (params) => (
                                                    <button className= "button-actions"
                                                        onClick={() => addVehicle(params.data.vehicle_id)}
                                                        
                                                    >
                                                        {t('assign')}
                                                    </button>
                                                ),
                                                width: 100,
                                            },
                                            
                                            { headerName: t('vehicle_id'), field: 'vehicle_id', editable: false, width: 30 },
                                            { headerName: t('license_plate'), field: 'license_plate', editable: true, width: 100 },
                                            { headerName: t('make'), field: 'make', editable: true, width: 100 },
                                            { headerName: t('model'), field: 'model', editable: true, width: 100 },
                                            { headerName: t('capacity'), field: 'capacity', editable: true, width: 100 },
                                            {
                                              headerName: t('fuel_type'),
                                              field: 'fuel_type',
                                              editable: true,
                                              width: 150,
                                              valueFormatter: params => {
                                                return params.value?.type || ''; // Відображаємо `type`, якщо об'єкт існує
                                              },
                                              cellEditor: 'agSelectCellEditor',
                                              cellEditorParams: {
                                                values: fuelTypes.map(fuel => fuel.type), // Масив назв типів пального
                                              },
                                              onCellValueChanged: params => {
                                                const selectedFuel = fuelTypes.find(fuel => fuel.type === params.newValue);
                                                if (selectedFuel) {
                                                    // Оновлення типу палива в таблиці
                                                    setAssignedVehicles(prev =>
                                                        prev.map(vehicle =>
                                                            vehicle.vehicle_id === params.data.vehicle_id
                                                                ? { ...vehicle, fuel_type: selectedFuel }
                                                                : vehicle
                                                        )
                                                    );
                                            
                                                    // Збереження на сервері
                                                    updateFuelType(params.data.vehicle_id, selectedFuel.fuel_type_id);
                                            
                                                    // Оновлення таблиці після збереження
                                                    fetchVehicles();
                                                }
                                            },
                                            
                                            },
                                            { headerName: t('year'), field: 'year', editable: true, width: 100 },
                                            { headerName: t('engine_volume'), field: 'engine_volume', editable: true, width: 100 },
                                            { headerName: t('city_fuel_consumption'), field: 'city_fuel_consumption', editable: true, width: 100 },
                                            { headerName: t('highway_fuel_consumption'), field: 'highway_fuel_consumption', editable: true, width: 100 },
                                            { headerName: t('registered_to'), field: 'registered_to', editable: true, width: 200 },
                                            { headerName: t('license_plate_format'), field: 'license_plate_format', editable: true, width: 100 },
                                            { headerName: t('chassis_number'), field: 'chassis_number', editable: true, width: 150 },
                                            { headerName: t('active'), field: 'active', editable: true, width: 100 },
                                            { headerName: t('image_url'), field: 'image_url', editable: true, width: 100 },
                                        ]}
                                    />
                                </div>
                                <button className="nav-button" onClick={saveAllChanges}>
                                    {t('save_changes')}
                                </button>

                            </div>
                        )}
        </div>
      </div>
    </div>
  );
};

export default DriverEdit;
