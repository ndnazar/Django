// frontend/src/components/CustomHeader.js
import React, { useState } from 'react';

const CustomHeader = (props) => {
  const [headerName, setHeaderName] = useState(props.displayName);

  const handleChange = (event) => {
    setHeaderName(event.target.value);
    props.columnApi.getAllColumns().forEach((col) => {
      if (col.getColId() === props.column.colId) {
        col.colDef.headerName = event.target.value;
      }
    });
    props.api.refreshHeader();
  };

  return (
    <input
      type="text"
      value={headerName}
      onChange={handleChange}
      className="custom-header" // Add the custom-header CSS class
      style={{ width: '100%' }}
    />
  );
};

export default CustomHeader;