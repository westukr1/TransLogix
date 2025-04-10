import React from 'react';
import './RouteComparisonModal.css';
import RouteMapModal from "./RouteMapModal"; // Переконайся, що шлях правильний
import { useTranslation } from 'react-i18next';

const RouteComparisonModal = ({ modalData, onClose, onAcceptOptimized, onAcceptStandard, onShowMap }) => {
  const { t } = useTranslation();

  if (!modalData?.show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2>{t("route_calculation")}</h2>

      <div className="route-info">
        <h3>🚗 {t("user_created_route")}:</h3>
        <p>🔹 {t("total_distance")}: {modalData?.standardRoute?.distance} км</p>
        <p>🔹 {t("total_duration")}: {modalData?.standardRoute?.duration}</p>
        <p>🔹 {t("start_address")}: {modalData?.standardRoute?.startAddress}</p>
        <p>🔹 {t("end_address")}: {modalData?.standardRoute?.endAddress}</p>
      </div>

      {modalData.optimizationApplied ? (
        <div className="route-info">
        <h3>🚀 {t("optimized_route")}:</h3>
        <p>🔹 {t("total_distance")}: {modalData?.optimizedRoute?.distance} км</p>
        <p>🔹 {t("total_duration")}: {modalData?.optimizedRoute?.duration}</p>
        <p>🔹 {t("start_address")}: {modalData?.optimizedRoute?.startAddress}</p>
        <p>🔹 {t("end_address")}: {modalData?.optimizedRoute?.endAddress}</p>
        </div>
      ) : (
        <p className="no-optimization">🔹 {t("no_optimized_route_found")}</p>
      )}

      <div className="modal-buttons">
        <button onClick={onAcceptStandard}>🛣 {t("accept_non_optimized")}</button>
        {modalData.optimizationApplied && (
        <button onClick={onAcceptOptimized}>✅ {t("accept_optimized")}</button>
        )}
        <button onClick={onShowMap}>🗺 {t("show_on_map")}</button>
        <button onClick={onClose}>❌ {t("close")}</button>
      </div>
      </div>
    </div>
    );
};

export default RouteComparisonModal;
