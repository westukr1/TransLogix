import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider" />
  </label>
);

export default ToggleSwitch;
