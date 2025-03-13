
import React from 'react';
import './RouteComparisonModal.css';
import RouteMapModal from "./RouteMapModal"; // Переконайся, що шлях правильний


const RouteComparisonModal = ({ modalData, onClose, onAcceptOptimized, onAcceptStandard, onShowMap }) => {
  if (!modalData?.show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2>Розрахунок маршруту</h2>

      <div className="route-info">
        <h3>🚗 Маршрут, створений користувачем:</h3>
        <p>🔹 Загальна дистанція: {modalData?.standardRoute?.distance} км</p>
        <p>🔹 Загальний час у дорозі: {modalData?.standardRoute?.duration}</p>
        <p>🔹 Адреса старту: {modalData?.standardRoute?.startAddress}</p>
        <p>🔹 Адреса фінішу: {modalData?.standardRoute?.endAddress}</p>
      </div>

      {modalData.optimizationApplied ? (
        <div className="route-info">
        <h3>🚀 Оптимізований маршрут:</h3>
        <p>🔹 Загальна дистанція: {modalData?.optimizedRoute?.distance} км</p>
        <p>🔹 Загальний час у дорозі: {modalData?.optimizedRoute?.duration}</p>
        <p>🔹 Адреса старту: {modalData?.optimizedRoute?.startAddress}</p>
        <p>🔹 Адреса фінішу: {modalData?.optimizedRoute?.endAddress}</p>
        </div>
      ) : (
        <p className="no-optimization">🔹 Більш оптимального маршруту не знайдено.</p>
      )}

      <div className="modal-buttons">
        <button onClick={onAcceptStandard}>🛣 Прийняти дані без оптимізації</button>
        {modalData.optimizationApplied && (
        <button onClick={onAcceptOptimized}>✅ Прийняти оптимізований маршрут</button>
        )}
        <button onClick={onShowMap}>🗺 Показати на карті</button>
        <button onClick={onClose}>❌ Закрити</button>
      </div>
      </div>
    </div>
    );
};

export default RouteComparisonModal;
