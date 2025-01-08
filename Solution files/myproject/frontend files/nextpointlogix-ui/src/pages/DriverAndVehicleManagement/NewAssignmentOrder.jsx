import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    fetch('http://localhost:8000/api/drivers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    }) // Update with real endpoint
      .then((res) => res.json())
      .then((data) => setDrivers(data));

    fetch('http://localhost:8000/api/vehicles', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    }) // Update with real endpoint
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/assignments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
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
