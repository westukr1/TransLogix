import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ToggleSwitch from '../../components/ToggleSwitch';


const EditPassengerAddresses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const passengerId = location.state ? location.state.passengerId : null;
  const coordinatePointId = location.state ? location.state.coordinatePointId : null;
  console.log("Received passengerId:", passengerId, "and coordinatePointId:", coordinatePointId);
  
  const [selectedCoordinateId, setSelectedCoordinateId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyLoaded, setIsApiKeyLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false); // Для керування модальним вікном
  const [selectedAddress, setSelectedAddress] = useState(null); // Адреса, що верифікується
  const [newCoordinates, setNewCoordinates] = useState(null); // Нові координати
  const [rowData, setRowData] = useState([]);
  const [italicRows, setItalicRows] = useState(new Set()); // Для зберігання рядків з курсивом
  const [passengerAddresses, setPassengerAddresses] = useState([]);
  const [selectedCoordinatePointId, setSelectedCoordinatePointId] = useState(coordinatePointId);
  const [passengerData, setPassengerData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    pickupAddresses: [],
    dropoffAddresses: [],
    workAddresses: []
  });
  useEffect(() => {
    const fetchGoogleMapsKey = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getGoogleMapsKey);
        setApiKey(response.data.google_maps_api_key);
        setIsApiKeyLoaded(true);
        return response.data.google_maps_api_key;
      } catch (error) {
        console.error('Помилка при отриманні ключа Google Maps:', error);
        return null;
      }
    };

    fetchGoogleMapsKey();
  }, []);



  useEffect(() => {
    if (!passengerId) return;
  
    const fetchPassengerAddresses = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getPassengerAddresses(passengerId));
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
  
    fetchPassengerAddresses();
  }, [passengerId]);
  
  
  // Новий метод, який встановлює selectedCoordinateId і викликає fetchCoordinatesFromGoogle
  const handleVerifyCoordinates = async (address) => {
    // console.log("Натискання кнопки перевірки для ID:", address.id);
    try {
      // Отримуємо ключ Google Maps
      const apiKey = await fetchGoogleMapsKey();
      if (!apiKey) {
        console.error('Google Maps API key is not loaded yet.');
        return;
      }
    setSelectedCoordinateId(address.id);
    fetchCoordinatesFromGoogle(address, apiKey);
    // fetchCoordinatesFromGoogle(address.id, address);
    } catch (error) {
      console.error('Error during verification:', error);
    }
  };

  const fetchCoordinatesFromGoogle = async (address, apiKey) => {
    if (!apiKey) {
      console.error('Google Maps API key is not loaded yet.');
      return;
    }
  
    const fullAddress = `${address.street} ${address.house_number}, ${address.city}, ${address.region}, ${address.country}`;
    console.log("Відправка запиту на Google API з адресою:", fullAddress);
  
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: { address: fullAddress, key: apiKey },
      });
  
      const data = response.data;
      console.log("Отримано відповідь від Google API:", data);
  
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lng);
  
        if (!isNaN(latitude) && !isNaN(longitude)) {
          setSelectedAddress(address);
          setNewCoordinates({ latitude, longitude });
          setShowModal(true);
        } else {
          console.warn("Некоректні координати, отримані з Google API.");
        }
      } else {
        alert('Адреса не знайдена. Перевірте правильність введених даних.');
      }
    } catch (error) {
      console.error('Помилка при отриманні координат:', error);
      alert('Помилка при отриманні координат. Спробуйте ще раз.');
    } finally {
      console.log("Очищення selectedCoordinateId після запиту.");
      setSelectedCoordinateId(null);
    }
  };
  
  const fetchGoogleMapsKey = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.getGoogleMapsKey);
      return response.data.google_maps_api_key;
    } catch (error) {
      console.error('Error fetching Google Maps API key:', error);
      return null;
    }
  };
  
  const fetchUpdatedAddresses = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.getPassengerAddresses(passengerId));
      setRowData(response.data);
    } catch (error) {
      console.error('Error fetching updated addresses:', error);
    }
  };
  

useEffect(() => {
  if (passengerId) {
    fetchUpdatedAddresses();
  }
}, [passengerId]);
const handleViewOnMap = (address) => {
  const latitude = parseFloat(address.latitude);
  const longitude = parseFloat(address.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error('Invalid coordinates:', address);
    alert(t('invalid_coordinates'));
    return;
  }

  navigate('/passengers-table-view/map-verification', {
    state: {
      latitude,
      longitude,
      coordinatePointId: address.id,
    },
  });
};
  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setNewCoordinates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const columnDefs = useMemo(() => [
    { field: 'id', headerName: 'ID Адреси', editable: false },
    { field: 'point_type', headerName: 'Тип точки', editable: true },
    { field: 'country', headerName: 'Країна', editable: true },
    { field: 'region', headerName: 'Область', editable: true },
    { field: 'city', headerName: 'Місто', editable: true },
    { field: 'street', headerName: 'Вулиця', editable: true },
    { field: 'house_number', headerName: 'Номер будинку', editable: true },
    {
      field: 'latitude',
      headerName: 'Широта',
      editable: true,
      cellStyle: (params) => italicRows.has(params.data.id) ? { fontStyle: 'italic' } : {},
    },
    {
      field: 'longitude',
      headerName: 'Довгота',
      editable: true,
      cellStyle: (params) => italicRows.has(params.data.id) ? { fontStyle: 'italic' } : {},
    },
    {
      headerName: 'On Map',
      cellRenderer: (params) => (
        <button onClick={() => handleViewOnMap(params.data)}>{t('on_map')}</button>
      ),
    },
    {
      headerName: 'Перевірити',
      cellRenderer: (params) => (
        <button
          onClick={() => handleVerifyCoordinates(params.data)}
        >
          {t('verify')}
        </button>
      ),
    },
    { 
      field: 'is_active', 
      headerName: 'Активна', 
      cellRenderer: (params) => (
          <ToggleSwitch 
              checked={params.data.is_active} 
              onChange={() => handleToggleCoordinateActive(params.data.id, params.data.is_active)}
          />
      )
    }
  ], [italicRows, t]); // Додайте залежності, якщо необхідно
  
  
  const handleToggleCoordinateActive = async (coordinatePointId, currentValue) => {
    const confirmation = window.confirm(
      currentValue
        ? t('are_you_sure_deactivate')
        : t('are_you_sure_activate')
    );
  
    if (!confirmation) return;
  
    // Оптимістичне оновлення на фронтенді
    setRowData(prevData =>
      prevData.map(row =>
        row.id === coordinatePointId ? { ...row, is_active: !currentValue } : row
      )
    );
  
    try {
      const response = await axios.post(
        API_ENDPOINTS.toggleCoordinatePointActive(coordinatePointId),
        { is_active: !currentValue }
      );
  
      const data = response.data;
  
      setRowData(prevData =>
        prevData.map(row =>
          row.id === coordinatePointId ? { ...row, is_active: data.is_active } : row
        )
      );
    } catch (error) {
      console.error('Error updating active status:', error);
  
      // Відкат змін при помилці
      setRowData(prevData =>
        prevData.map(row =>
          row.id === coordinatePointId ? { ...row, is_active: currentValue } : row
        )
      );
    }
  };
  
  // Додаємо клас для виділення рядка
  const rowClassRules = {
    'highlight-row': params => params.data.id === selectedCoordinatePointId, // Виділення обраного рядка
};
useEffect(() => {
    if (coordinatePointId) {
        setSelectedCoordinatePointId(coordinatePointId); // Встановлюємо ID вибраного рядка
    }
}, [coordinatePointId]);
  
useEffect(() => {
  const fetchPassengerData = async () => {
    if (!passengerId) {
      console.error("Passenger ID is not defined.");
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS.getPassengerDetails(passengerId));
      const data = response.data;

      setPassengerData({
        firstName: data.first_name,
        lastName: data.last_name,
        phoneNumber: data.phone_number,
        email: data.email,
        pickupAddresses: data.pickup_addresses,
        dropoffAddresses: data.dropoff_addresses,
        workAddresses: data.work_addresses
      });

      console.log('Отримані дані пасажира:', data);
    } catch (error) {
      console.error("Error loading passenger data:", error);
    }
  };

  fetchPassengerData();
}, [passengerId]);

  
  useEffect(() => {
    const combinedAddresses = [
      ...passengerData.pickupAddresses,
      ...passengerData.dropoffAddresses,
      ...passengerData.workAddresses
    ];
    
    setRowData(combinedAddresses);
    fetchHouseNumbers(combinedAddresses);
  }, [passengerData]);
  // Fetch house numbers for each coordinate point
  const fetchHouseNumbers = async (addresses) => {
    const updatedAddresses = await Promise.all(
      addresses.map(async (address) => {
        try {
          const response = await axios.get(API_ENDPOINTS.getHouseNumber(address.id));
          return { ...address, house_number: response.data.house_number };
        } catch (error) {
          console.error(`Error fetching house number for address ID ${address.id}:`, error);
          return address;
        }
      })
    );
    setRowData(updatedAddresses); // Update the row data with house numbers
  };
  
  useEffect(() => {
    const combinedAddresses = [
      ...passengerData.pickupAddresses,
      ...passengerData.dropoffAddresses,
      ...passengerData.workAddresses,
    ];
    setPassengerAddresses(combinedAddresses);
  }, [passengerData]);
  
  
  const getRowId = useCallback((params) => params.data.id, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleAddressChange = (e, index, type) => {
    const { name, value } = e.target;
    setPassengerData(prevData => {
      const updatedAddresses = prevData[type].map((address, idx) => {
        if (idx === index) {
          return { ...address, [name]: value };
        }
        return address;
      });
      return {
        ...prevData,
        [type]: updatedAddresses
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        API_ENDPOINTS.updatePassenger(passengerId),
        passengerData
      );
      console.log('Відповідь сервера після оновлення:', response.data);
      navigate('/passengers');
    } catch (error) {
      console.error("Error updating passenger data:", error);
    }
  };
  

  const verifyAddress = async (address, index, type) => {
    const fullAddress = `${address.street} ${address.house_number}, ${address.city}, ${address.region}, ${address.country}`;
    const languageCode = i18n.language;
  
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: fullAddress,
          key: apiKey,
          language: languageCode
        }
      });
  
      const data = response.data;
      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const location = result.geometry.location;
  
        setPassengerData(prevState => {
          const updatedAddresses = [...prevState[type]];
          updatedAddresses[index] = {
            ...updatedAddresses[index],
            latitude: location.lat,
            longitude: location.lng,
            city: result.address_components.find(comp => comp.types.includes('locality'))?.long_name || updatedAddresses[index].city,
            street: result.address_components.find(comp => comp.types.includes('route'))?.long_name || updatedAddresses[index].street,
            house_number: result.address_components.find(comp => comp.types.includes('street_number'))?.long_name || updatedAddresses[index].house_number,
          };
          return {
            ...prevState,
            [type]: updatedAddresses
          };
        });
  
        console.log("Адреса перевірена успішно!");
      } else {
        alert('Адреса не знайдена. Перевірте правильність введених даних.');
      }
    } catch (error) {
      console.error('Помилка при перевірці адреси:', error);
      alert('Помилка при перевірці адреси. Спробуйте ще раз.');
    }
  };
  
  const handleSave = async () => {
    const filteredAddresses = rowData.filter(
      (address) => address.latitude && address.longitude
    );
    try {
      await axios.put(
        API_ENDPOINTS.updatePassengerAddresses(passengerId),
        filteredAddresses
      );
      alert(t('Addresses updated successfully!'));
      setItalicRows(new Set());
    } catch (error) {
      console.error('Error saving addresses:', error);
      alert(t('Error saving addresses.'));
    }
  };
  


  const handleSaveAndClose = async () => {
    await handleSave();
    navigate(-1);
  };

  const handleSaveAndContinue = async () => {
    await handleSave();
  };

  const handleCellValueChanged = (params) => {
    const updatedAddress = params.data;
    // Оновлюємо стан rowData та passengerAddresses, щоб підтримувати синхронізацію
    setRowData((prevData) =>
      prevData.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address
      )
    );
    setPassengerAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address
      )
    );
  };


 
  
  const handleRedirectToAddresses = () => {
    navigate('/add-passenger', { state: { passengerId, ...passengerData } });
  };
  
  const handleConfirmCoordinates = async () => {
    if (!selectedAddress || !newCoordinates) {
      alert(t('no_coordinates_to_save'));
      return;
    }
  
    const roundedCoordinates = {
      latitude: parseFloat(newCoordinates.latitude.toFixed(6)),
      longitude: parseFloat(newCoordinates.longitude.toFixed(6)),
    };
  
    try {
      await axios.put(
        API_ENDPOINTS.updateCoordinates(selectedAddress.id),
        roundedCoordinates
      );
  
      alert(t('coordinates_updated_successfully'));
      await fetchUpdatedAddresses();
  
      setSelectedAddress(null);
      setNewCoordinates({ latitude: '', longitude: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error saving coordinates:', error);
      alert(t('error_saving_coordinates'));
    }
  };
  

  const handleCancelCoordinates = () => {
    setShowModal(false);
    setSelectedAddress(null);
    setNewCoordinates(null);
  };

    return (
        <div className="passenger-table-view">
          <div className="ptw-header">
            <div className="logo">
              <img src="/logo.png" alt="NextPointLogix" />
            </div>
            <div className="nav-buttons">
            <button className="nav-button" onClick={() => window.history.back()}>{t('back')}</button>
              
            </div>
          </div>
    
          <div className="passenger-table-content" style={{ height: 1000 }}>
            <div className="passenger-left-column">
            <button className="nav-button" onClick={() => window.history.back()}>{t('back')}</button>
            <button onClick={handleRedirectToAddresses} className="ptv-add-passenger-button" style={{ display: 'block' }}disabled={!passengerId}>{t('add_address')}</button>
              <button onClick={handleSaveAndClose} className="ptv-add-passenger-button">{t('save_and_close')}</button>
              <button onClick={handleSaveAndContinue} className="ptv-add-passenger-button">{t('save_and_continue')}</button>
            
            </div>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>{t('Confirm Coordinates')}</h3>
                  <div className="modal-body">
                    <div className="modal-row">
                      <span>{t('Latitude')}: </span>
                      <input
                        type="number"
                        name="latitude"
                        readOnly
                        value={newCoordinates.latitude}
                        onChange={handleCoordinateChange}
                        className="modal-input"
                      />
                    </div>
                    <div className="modal-row">
                      <span>{t('Longitude')}: </span>
                      <input
                        type="number"
                        name="longitude"
                        readOnly
                        value={newCoordinates.longitude}
                        onChange={handleCoordinateChange}
                        className="modal-input"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={handleConfirmCoordinates}>{t('Save')}</button>
                    <button onClick={handleCancelCoordinates}>{t('Cancel')}</button>
                    <button
                      onClick={() =>
                        navigate('/passengers-table-view/map-verification', {
                          state: {
                            latitude: newCoordinates.latitude,
                            longitude: newCoordinates.longitude,
                            coordinatePointId: selectedAddress?.id,
                          },
                        })
                      }
                    >
                      {t('Verify on Map')}
                    </button>
                  </div>
                </div>
              </div>
            )}



            <div className="passenger-right-column">
           
            <h3>ID: {passengerId} | {passengerData.firstName} {passengerData.lastName} | {passengerData.phoneNumber} | {passengerData.email}</h3>
              
              <div className="ag-theme-alpine" style={{ height: 250, width: '100%' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={{ flex: 1, minWidth: 100 }}
                  onCellValueChanged={handleCellValueChanged}
                  domLayout='autoHeight'
                  getRowId={getRowId}
                  deltaRowDataMode={true}
                  rowClassRules={rowClassRules} // Додаємо клас для виділення
                />
              </div>
          
               
    
              
            </div>
          </div>
        </div>
      );
    };
    
export default EditPassengerAddresses;
    