import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './DriverRegistration.css';

const VehicleRegistration = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const defaultImageUrl = require('./defaultPictureVehicle.jpg');

    const [vehicleData, setVehicleData] = useState({
        license_plate: '',
        license_plate_format: 'UA',
        make: '',
        model: '',
        year: 1980,
        engine_volume: 1.0,
        registered_to: '',
        chassis_number: '',
        city_fuel_consumption: 0.0,
        highway_fuel_consumption: 0.0,
        fuel_type: '',
        capacity: 1,
        image_url: defaultImageUrl,
        active: true,
    });

    const [fuelTypes, setFuelTypes] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');

    useEffect(() => {
        // Fetch fuel types from backend
        fetch('http://localhost:8000/api/fuel-types/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Fuel Types:', data);
                setFuelTypes(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching fuel types:', error));
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };

    const handleImagePreview = () => {
        const googleDriveBase = "https://drive.google.com/uc?export=view&id=";
        const match = vehicleData.image_url.match(/d\/([a-zA-Z0-9_-]+)\/view/);
        const formattedUrl = match ? `${googleDriveBase}${match[1]}` : vehicleData.image_url;
        setPreviewImageUrl(formattedUrl);
        setShowModal(true);
    };
    
    

    const handleSaveImage = () => {
        setVehicleData({ ...vehicleData, image_url: previewImageUrl });
        setPreviewImageUrl('');
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formattedData = {
            license_plate: vehicleData.license_plate,
            license_plate_format: vehicleData.license_plate_format,
            make: vehicleData.make || 'Unknown',
            model: vehicleData.model,
            year: vehicleData.year || 1980,
            engine_volume: vehicleData.engine_volume,
            registered_to: vehicleData.registered_to,
            chassis_number: vehicleData.chassis_number,
            city_fuel_consumption: vehicleData.city_fuel_consumption,
            highway_fuel_consumption: vehicleData.highway_fuel_consumption,
            fuel_type_id: vehicleData.fuel_type, // Use fuel_type_id
            capacity: vehicleData.capacity,
            image_url: vehicleData.image_url,
            active: true,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/vehicles/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert(t('success_vehicle_saved'));
                navigate(-1);
            } else {
                const errorData = await response.json();
                alert(t('error_saving_failed') + ': ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert(t('error.network') + ': ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="two-column-template">
            <div className="top-nav-bar">
                <div className="logo">
                    <img src="/logo.png" alt={t('logo.alt')} />
                </div>
                <h2 className="header-title">{t('vehicle_registration')}</h2>

                <div className="date-time">{new Date().toLocaleString()}</div>
                <div className="nav-buttons">
                    <button className="nav-button" onClick={() => navigate('/')}>{t('nav.main_screen')}</button>
                    <button className="nav-button" onClick={() => navigate(-1)}>{t('nav.back')}</button>
                </div>
            </div>

            <div className="template21-content">
                <div className="template21-left-column">
                    <div className="vehicle-image-box" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '300px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <img src={vehicleData.image_url} alt={t('vehicle_image')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>

                    <div className="driver-registration-buttons">
                        <button onClick={handleImagePreview}>{t('buttons.upload_picture')}</button>
                        <button onClick={handleSubmit} disabled={isSaving}>{isSaving ? t('buttons.saving') : t('save')}</button>
                    </div>
                </div>

                <div className="template21-right-column">
                    <h2 style={{ color: '#fff' }}>{t('add_new_vehicle')}</h2>
                    <form className="driver-registration-fields" onSubmit={handleSubmit}>
                        <label htmlFor="image_url">{t('image_url')}</label>
                        <input
                            type="url"
                            id="image_url"
                            name="image_url"
                            placeholder={t('enter_image_url')}
                            value={vehicleData.image_url}
                            onChange={handleChange}
                        />

                        <label htmlFor="license_plate">{t('license_plate')}</label>
                        <input type="text" id="license_plate" name="license_plate" placeholder={t('enter_license_plate')} value={vehicleData.license_plate} onChange={handleChange} required />

                        <label htmlFor="license_plate_format">{t('license_plate_format')}</label>
                        <select id="license_plate_format" name="license_plate_format" value={vehicleData.license_plate_format} onChange={handleChange}>
                            <option value="UA">{t('ukrainian')}</option>
                            <option value="EU">{t('european')}</option>
                            <option value="US">{t('american')}</option>
                        </select>

                        <label htmlFor="make">{t('make')}</label>
                        <input type="text" id="make" name="make" placeholder={t('enter_make')} value={vehicleData.make} onChange={handleChange} required />

                        <label htmlFor="model">{t('model')}</label>
                        <input type="text" id="model" name="model" placeholder={t('enter_model')} value={vehicleData.model} onChange={handleChange} required />

                        <label htmlFor="year">{t('year')}</label>
                        <input type="number" id="year" name="year" min="1900" max="2100" placeholder={t('enter_year')} value={vehicleData.year} onChange={handleChange} required />

                        <label htmlFor="engine_volume">{t('engine_volume')}</label>
                        <input type="number" id="engine_volume" name="engine_volume" step="0.1" placeholder={t('enter_engine_volume')} value={vehicleData.engine_volume} onChange={handleChange} required />

                        <label htmlFor="registered_to">{t('registered_to')}</label>
                        <input type="text" id="registered_to" name="registered_to" placeholder={t('enter_registered_to')} value={vehicleData.registered_to} onChange={handleChange} required />

                        <label htmlFor="chassis_number">{t('chassis_number')}</label>
                        <input type="text" id="chassis_number" name="chassis_number" placeholder={t('enter_chassis_number')} value={vehicleData.chassis_number} onChange={handleChange} required />

                        <label htmlFor="city_fuel_consumption">{t('city_fuel_consumption')}</label>
                        <input type="number" id="city_fuel_consumption" name="city_fuel_consumption" step="0.1" placeholder={t('enter_city_fuel_consumption')} value={vehicleData.city_fuel_consumption} onChange={handleChange} required />

                        <label htmlFor="highway_fuel_consumption">{t('highway_fuel_consumption')}</label>
                        <input type="number" id="highway_fuel_consumption" name="highway_fuel_consumption" step="0.1" placeholder={t('enter_highway_fuel_consumption')} value={vehicleData.highway_fuel_consumption} onChange={handleChange} required />

                        <label htmlFor="fuel_type">{t('fuel_type')}</label>
                        <select
                            id="fuel_type"
                            name="fuel_type"
                            value={vehicleData.fuel_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">{t('select_fuel_type')}</option>
                            {fuelTypes.map(fuel => (
                                <option key={fuel.fuel_type_id} value={fuel.fuel_type_id}>
                                    {fuel.type}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="capacity">{t('capacity')}</label>
                        <input type="number" id="capacity" name="capacity" min="1" placeholder={t('enter_capacity')} value={vehicleData.capacity} onChange={handleChange} required />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VehicleRegistration;


