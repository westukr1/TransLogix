import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { useTranslation } from 'react-i18next';

function Sidebar() {
  const { t } = useTranslation();  // Підключаємо переклад

  return (
    <aside className="oi.sidebar">
      <nav className="sidebar-nav">
        <Link to="/map-of-routes" className="sidebar-item">{t('map_of_routes')}</Link>
        <Link to="/rout-manager" className="sidebar-item">{t('rout_manager')}</Link>
        <Link to="/fuel-management" className="sidebar-item">{t('fuel_management')}</Link>
        <Link to="/transport-requests" className="sidebar-item">{t('transport_requests')}</Link>
        <Link to="/driver-vehicle-management" className="sidebar-item">{t('transport_management')}</Link>
        
        <Link to="/reference-data" className="sidebar-item">{t('reference_data')}</Link> 
        <Link to="/developers-tools" className="sidebar-item">{t('developers_tools')}</Link> 
        <Link to="/settings" className="sidebar-item">{t('settings')}</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
