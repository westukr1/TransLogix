import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './DriverRegistration.css';

const DriverRegistration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const defaultImageUrl = require('./defaultPictureDriver.jpg');
  
  const [driverData, setDriverData] = useState({
    citizenship: '',
    contractType: '',
    drivingExperience: '',
    email: '',
    firstName: '',
    licenseCategory: '',
    licenseIssueDate: '',
    licenseIssuer: '',
    middleName: '',
    registrationAddress: '',
    residenceAddress: '',
    yearOfBirth: '',
    lastName: '',
    phoneNumber: '',
    image_url: defaultImageUrl,
    licenseNumber: '',
  });
    const [isSaving, setIsSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
  
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveWithConfirmation = () => {
    const userChoice = window.confirm(t('messages.confirm_save'));
    if (!userChoice) {
      const exitChoice = window.confirm(t('messages.exit_without_save'));
      if (exitChoice) {
        navigate(-1);
      }
      return;
    }
    handleSave();
  };

  const handleSave = async () => {
    const formattedData = {
      citizenship: driverData.citizenship,
      contract_type: driverData.contractType,
      driving_experience: driverData.drivingExperience ? parseInt(driverData.drivingExperience, 10) : null,
      email: driverData.email,
      first_name: driverData.firstName,
      license_category: driverData.licenseCategory,
      license_issue_date: driverData.licenseIssueDate || null,
      license_issuer: driverData.licenseIssuer || null,
      middle_name: driverData.middleName || null,
      registration_address: driverData.registrationAddress,
      residence_address: driverData.residenceAddress,
      year_of_birth: driverData.yearOfBirth ? parseInt(driverData.yearOfBirth, 10) : null,
      last_name: driverData.lastName,
      phone_number: driverData.phoneNumber,
      license_number: driverData.licenseNumber || null,
      photo_url: driverData.photoUrl,
      active: true, // Default value for active
    };
    const handleImagePreview = () => {
        const googleDriveBase = "https://drive.google.com/uc?export=view&id=";
        const match = driverData.image_url.match(/d\/([a-zA-Z0-9_-]+)\/view/);
        const formattedUrl = match ? `${googleDriveBase}${match[1]}` : driverData.image_url;
        setPreviewImageUrl(formattedUrl);
        setShowModal(true);
    };
    console.log('Sending driver data:', formattedData);

    try {
      const response = await fetch('http://localhost:8000/drivers/create/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Server Error: ${errorResponse.detail || response.statusText}`);
      }

      const result = await response.json();
      console.log('Server response:', result);
      alert(t('messages.save_success'));
      navigate(-1);
    } catch (error) {
      console.error('Error saving driver data:', error);
      alert(t('messages.save_failed', { error: error.message }));
    }
  };

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t('logo.alt')} />
        </div>
        <h2 className="header-title">{t('driver_registration')}</h2>
        
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
            <button onClick={handleSaveWithConfirmation}>{t('buttons.save')}</button>

          </div>
        </div>
        <div className="template21-right-column">
          <form className="driver-registration-fields">
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
            <input name="lastName" type="text" placeholder={t('placeholders.last_name')} onChange={handleInputChange} />

            <label>{t('fields.first_name')}:</label>
            <input name="firstName" type="text" placeholder={t('placeholders.first_name')} onChange={handleInputChange} />

            <label>{t('fields.middle_name')}:</label>
            <input name="middleName" type="text" placeholder={t('placeholders.middle_name')} onChange={handleInputChange} />

            <label>{t('fields.phone_number')}:</label>
            <input name="phoneNumber" type="text" placeholder={t('placeholders.phone_number')} onChange={handleInputChange} />

            <label>{t('fields.email')}:</label>
            <input name="email" type="email" placeholder={t('placeholders.email')} onChange={handleInputChange} />

            <label>{t('fields.year_of_birth')}:</label>
            <input name="yearOfBirth" type="number" placeholder={t('placeholders.year_of_birth')} onChange={handleInputChange} />

            <label>{t('fields.citizenship')}:</label>
            <input name="citizenship" type="text" placeholder={t('placeholders.citizenship')} onChange={handleInputChange} />

            <label>{t('fields.contract_type')}:</label>
            <input name="contractType" type="text" placeholder={t('placeholders.contract_type')} onChange={handleInputChange} />

            <label>{t('fields.residence_address')}:</label>
            <input name="residenceAddress" type="text" placeholder={t('placeholders.residence_address')} onChange={handleInputChange} />

            <label>{t('fields.registration_address')}:</label>
            <input name="registrationAddress" type="text" placeholder={t('placeholders.registration_address')} onChange={handleInputChange} />

            <label>{t('fields.driving_experience')}:</label>
            <input name="drivingExperience" type="number" placeholder={t('placeholders.driving_experience')} onChange={handleInputChange} />

            <label>{t('fields.license_category')}:</label>
            <input name="licenseCategory" type="text" placeholder={t('placeholders.license_category')} onChange={handleInputChange} />

            <label>{t('fields.license_issue_date')}:</label>
            <input name="licenseIssueDate" type="date" placeholder={t('placeholders.license_issue_date')} onChange={handleInputChange} />

            <label>{t('fields.license_issuer')}:</label>
            <input name="licenseIssuer" type="text" placeholder={t('placeholders.license_issuer')} onChange={handleInputChange} />

            <label>{t('fields.license_number')}:</label>
            <input name="licenseNumber" type="text" placeholder={t('placeholders.license_number')} onChange={handleInputChange} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistration;
