import React, { useState } from 'react';
import FuelRecordList from './FuelRecordList';
import AddFuelRecordModal from './AddFuelRecordModal';
import { Link } from 'react-router-dom';
import './FuelManagement.css';

function FuelManagement() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleAddRecord = () => {
    setAddModalOpen(true);
  };

  const closeAddFuelRecordModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="fuel-management-container">
      <div className="fuel-management-header">
        <Link to="/" className="back-button">Back to Operator UI</Link>
        <h2>Fuel Management</h2>
        <div className="fuel-management-actions">
          <button onClick={handleAddRecord}>Add Fuel Record</button>
          <button>Filter</button>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <FuelRecordList />
      {isAddModalOpen && <AddFuelRecordModal onClose={closeAddFuelRecordModal} />}
    </div>
  );
}

export default FuelManagement;
