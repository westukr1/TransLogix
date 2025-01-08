import React, { useState } from 'react';
import './FuelManagement.css';

function AddFuelRecordModal({ onClose }) {
  const [date, setDate] = useState('');
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [operation, setOperation] = useState('Refuel');
  const [fuelType, setFuelType] = useState('Petrol');
  const [quantity, setQuantity] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [cost, setCost] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [advance, setAdvance] = useState('');
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логіка для збереження нового запису
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Fuel Record</h3>
        <div className="modal-scrollable-content">
          <form onSubmit={handleSubmit}>
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              Driver:
              <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)} required />
            </label>
            <label>
              Vehicle:
              <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
            </label>
            <label>
              Operation:
              <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="Refuel">Refuel</option>
                <option value="Consumption">Consumption</option>
              </select>
            </label>
            <label>
              Fuel Type:
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                <option value="Petrol">Petrol</option>
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
              </select>
            </label>
            <label>
              Quantity (L):
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </label>
            <label>
              Price per Liter (UAH):
              <input type="number" value={pricePerLiter} onChange={(e) => setPricePerLiter(e.target.value)} required />
            </label>
            <label>
              Total Cost (UAH):
              <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
            </label>
            <label>
              Receipt Number:
              <input type="text" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} required />
            </label>
            <label>
              Advance Amount (UAH):
              <input type="number" value={advance} onChange={(e) => setAdvance(e.target.value)} required />
            </label>
            <label>
              Receipt Submitted:
              <input
                type="checkbox"
                checked={receiptSubmitted}
                onChange={(e) => setReceiptSubmitted(e.target.checked)}
              />
            </label>
          </form>
        </div>
        <div className="modal-buttons">
          <button type="button" onClick={handleSubmit}>Save</button> {/* Кнопка збереження */}
          <button type="button" onClick={onClose}>Cancel</button> {/* Кнопка відміни */}
          <button type="button">Attach Document</button> {/* Кнопка для доєднання документа */}
        </div>
      </div>
    </div>
  );
}

export default AddFuelRecordModal;
