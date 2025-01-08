import React from 'react';

const SelectAllCheckbox = ({ selectAllChecked, onToggleSelectAll }) => (
    <input
        type="checkbox"
        checked={selectAllChecked}
        onChange={(e) => onToggleSelectAll(e.target.checked)}
    />
);

export default SelectAllCheckbox;
