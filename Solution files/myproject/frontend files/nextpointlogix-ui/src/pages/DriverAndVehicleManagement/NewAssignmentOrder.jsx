import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../config/apiConfig';
import './NewAssignmentOrder.css';

const NewAssignmentOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assignment_date: '',
    order_number: '',
    expiration_date: '',
    is_active: false,
    driver_id: '',
    vehicle_id: ''
  });

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverResponse = await axios.get(API_ENDPOINTS.getDrivers);
        setDrivers(driverResponse.data);

        const vehicleResponse = await axios.get(API_ENDPOINTS.getVehicles);
        setVehicles(vehicleResponse.data);
      } catch (err) {
        console.error('Error loading drivers or vehicles:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_ENDPOINTS.createAssignment, formData);
      navigate('/');
    } catch (err) {
      console.error('Error creating assignment:', err);
    }
  };

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="two-column-template-logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/')}>Main Screen</button>
          <button className="nav-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
      <div className="template21-content">
        <div className="template21-left-column">
          <button type="submit" className="left-button" onClick={handleSubmit}>Save</button>
        </div>
        <div className="template21-right-column">
          <h2>Assignment Details</h2>
          <form>
            <label>
              Assignment Date:
              <input
                type="date"
                name="assignment_date"
                value={formData.assignment_date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Order Number:
              <input
                type="text"
                name="order_number"
                value={formData.order_number}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Expiration Date:
              <input
                type="date"
                name="expiration_date"
                value={formData.expiration_date}
                onChange={handleChange}
              />
            </label>
            <label>
              Active:
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
              />
            </label>
            <label>
              Driver:
              <select
                name="driver_id"
                value={formData.driver_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>{driver.name}</option>
                ))}
              </select>
            </label>
            <label>
              Vehicle:
              <select
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                ))}
              </select>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAssignmentOrder;
