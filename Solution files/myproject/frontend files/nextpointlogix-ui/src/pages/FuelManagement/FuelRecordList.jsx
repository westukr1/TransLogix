import React from 'react';
import './FuelManagement.css';

function FuelRecordList() {
  const fuelRecords = [
    {
      id: 1,
      date: '2024-08-20',
      driver: 'John Doe',
      vehicle: 'AA 1234 BO',
      operation: 'Refuel',
      fuelType: 'Petrol',
      quantity: 50,
      pricePerLiter: 20,
      cost: 1000,
      receiptNumber: '123456',
      advance: 1000,
      receiptSubmitted: true,
    },
    // Додайте більше записів за потреби
  ];

  return (
    <div className="fuel-record-list">
      <table className="fuel-record-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver</th>
            <th>Vehicle</th>
            <th>Operation</th>
            <th>Fuel Type</th>
            <th>Quantity (L)</th>
            <th>Price/Liter (UAH)</th>
            <th>Total Cost (UAH)</th>
            <th>Receipt Number</th>
            <th>Advance (UAH)</th>
            <th>Receipt Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fuelRecords.map(record => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.driver}</td>
              <td>{record.vehicle}</td>
              <td>{record.operation}</td>
              <td>{record.fuelType}</td>
              <td>{record.quantity}</td>
              <td>{record.pricePerLiter}</td>
              <td>{record.cost}</td>
              <td>{record.receiptNumber}</td>
              <td>{record.advance}</td>
              <td>{record.receiptSubmitted ? 'Yes' : 'No'}</td>
              <td>
                <button className="view-button">View</button>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FuelRecordList;
