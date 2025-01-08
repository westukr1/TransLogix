import React from 'react';
import './RouteActions.css';

const RouteActions = () => {
  return (
    <div className="route-actions">
      <button>Calculate approximate boarding time for selected routes</button>
      <button>Freeze selected routes</button>
      <button>Unfreeze selected routes</button>
      <button>Edit selected routes</button>
      <button>Send selected routes to drivers and passengers</button>
    </div>
  );
};

export default RouteActions;
