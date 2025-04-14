import React, { useState, useEffect } from 'react';
import './DriverVehicleManagement.css';
import { Link, useNavigate  } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../config/apiConfig';

const DriverVehicleManagement = () => {
  const { t } = useTranslation(); // Translation hook
  const navigate = useNavigate();

  const [vehicleRowData, setVehicleRowData] = useState([]);
  const [driverRowData, setDriverRowData] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]); // Список типів палива

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, driversRes, fuelTypesRes] = await Promise.all([
          axios.get(API_ENDPOINTS.getVehicles),
          axios.get(API_ENDPOINTS.getDrivers),
          axios.get(API_ENDPOINTS.getFuelTypes)
        ]);

        setVehicleRowData(Array.isArray(vehiclesRes.data) ? vehiclesRes.data : []);
        setDriverRowData(Array.isArray(driversRes.data) ? driversRes.data : []);
        setFuelTypes(Array.isArray(fuelTypesRes.data) ? fuelTypesRes.data : []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  const updateFuelType = (vehicleId, fuelTypeId) => {
    axios.post(API_ENDPOINTS.updateVehicleFuelType, {
      vehicle_id: vehicleId,
      fuel_type_id: fuelTypeId,
    })
    .then(() => {
      return axios.get(API_ENDPOINTS.getVehicles);
    })
    .then(response => {
      setVehicleRowData(Array.isArray(response.data) ? response.data : []);
    })
    .catch(error => {
      console.error('Error updating fuel type:', error);
    });
  };

  const vehicleColumnDefs = [
    { headerName: t('vehicle_id'), field: 'vehicle_id', editable: false, width: 30 },
    { headerName: t('license_plate'), field: 'license_plate', editable: true, width: 100 },
    { headerName: t('make'), field: 'make', editable: true, width: 100 },
    { headerName: t('model'), field: 'model', editable: true, width: 100 },
    { headerName: t('capacity'), field: 'capacity', editable: true, width: 100 },
    {
      headerName: t('fuel_type'),
      field: 'fuel_type',
      editable: true,
      width: 220,
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
  ];
  const onVehicleRowDoubleClicked = (event) => {
    const vehicleId = event.data.vehicle_id;
    navigate(`/vehicle-edit/${vehicleId}`);
  };
  const driverColumnDefs = [
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
  ];
  const onDriverRowDoubleClicked = (event) => {
    const driverId = event.data.driver_id;
    navigate(`/driver-edit/${driverId}`);
  };
  // useEffect(() => {
  //   // Fetch vehicles data from backend
  //   fetch('http://localhost:8000/api/vehicles/', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Vehicles Data:', data);
  //       setVehicleRowData(Array.isArray(data) ? data : []);
  //     })
  //     .catch(error => console.error('Error fetching vehicles:', error));

  //   // Fetch drivers data from backend
  //   fetch('http://localhost:8000/api/drivers/', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Drivers Data:', data);
  //       setDriverRowData(Array.isArray(data) ? data : []);
  //     })
  //     .catch(error => console.error('Error fetching drivers:', error));
  // }, []);

  const saveVehiclesBulk = () => {
    const payload = vehicleRowData.map(vehicle => ({
      vehicle_id: vehicle.vehicle_id,
      license_plate: vehicle.license_plate,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      capacity: vehicle.capacity,
      fuel_type_id: vehicle.fuel_type?.fuel_type_id || null,
      chassis_number: vehicle.chassis_number,
      city_fuel_consumption: vehicle.city_fuel_consumption,
      highway_fuel_consumption: vehicle.highway_fuel_consumption,
      registered_to: vehicle.registered_to,
      license_plate_format: vehicle.license_plate_format,
      engine_volume: vehicle.engine_volume,
      active: vehicle.active,
      image_url: vehicle.image_url,
    }));

    axios.put(API_ENDPOINTS.bulkUpdateVehicles, payload)
      .then(response => {
        if (response.data.errors) {
          console.error('Errors updating vehicles:', response.data.errors);
        } else {
          alert('Vehicles updated successfully');
        }
      })
      .catch(error => console.error('Network error:', error));
  };
  
  const saveDriversBulk = () => {
    axios.put(API_ENDPOINTS.bulkUpdateDrivers, driverRowData)
      .then(response => {
        if (response.data.errors) {
          console.error('Errors updating drivers:', response.data.errors);
        } else {
          alert('Drivers updated successfully');
        }
      })
      .catch(error => console.error('Network error:', error));
  };

  

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => window.history.back()}>{t('back')}</button>
        </div>
      </div>

      <div className="template2s-content">
        <div className="template2s-left-column">
          <h2>{t('manage_drivers_vehicles')}</h2>
          <Link to="/vehicle-registration">
            <button className="left-button">{t('add_vehicle')}</button>
          </Link>
          <Link to="/driver-registration">
            <button className="left-button">{t('add_driver')}</button>
          </Link>
          
        </div>

        <div className="template2s-right-column">
          <div className="template2s-upper-right">
            <h2>{t('vehicles')}</h2>
            <button className="save-button" onClick={saveVehiclesBulk}>{t('save_vehicle_data')}</button>
            <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
            <AgGridReact
                columnDefs={vehicleColumnDefs}
                rowData={vehicleRowData || []}
                singleClickEdit={true} // Дозволяє редагування клітинок одним кліком
                onRowDoubleClicked={(event) => {
                    if (event.event.target.tagName === 'INPUT' || event.event.target.tagName === 'TEXTAREA') {
                        return; // Ігноруємо, якщо клік по клітинці, що редагується
                    }
                    const vehicleId = event.data.vehicle_id;
                    navigate(`/vehicle-edit/${vehicleId}`);
                }}
                onCellValueChanged={(event) => {
                    const updatedData = [...vehicleRowData];
                    updatedData[event.rowIndex] = event.data;
                    setVehicleRowData(updatedData);
                }}
            />





            </div>
          </div>
          <div className="template2s-lower-right">
            <h2>{t('drivers')}</h2>
            <button className="save-button" onClick={saveDriversBulk}>{t('save_driver_data')}</button>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={driverColumnDefs}
                rowData={driverRowData || []}
                singleClickEdit={true} // Дозволяє редагування клітинок одним кліком
                onRowDoubleClicked={(event) => {
                    if (event.event.target.tagName === 'INPUT' || event.event.target.tagName === 'TEXTAREA') {
                        return; // Ігноруємо, якщо клік по клітинці, що редагується
                    }
                    const driverId = event.data.driver_id;
                    navigate(`/driver-edit/${driverId}`);
                }}
                onCellValueChanged={(event) => {
                    const updatedData = [...driverRowData];
                    updatedData[event.rowIndex] = event.data;
                    setDriverRowData(updatedData);
                }}
            />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleManagement;
