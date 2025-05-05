// frontend/src/components/P&LGrid.js
import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeader from './CustomHeader';

const AgGridComponent = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([
    { label: 'Revenue', '2021': '', '2022': '', '2023': '', 'TTM': '' },
    { label: 'Gross Profit', '2021': '', '2022': '', '2023': '', 'TTM': '' },
    { label: 'Gross Profit %', '2021': '', '2022': '', '2023': '', 'TTM': '' },
    { label: 'Adjusted EBITDA', '2021': '', '2022': '', '2023': '', 'TTM': '' },
    { label: 'Adjusted EBITDA %', '2021': '', '2022': '', '2023': '', 'TTM': '' },
  ]);

const [columnDefs] = useState([
    { headerName: 'P&L Summary', field: 'label', editable: false, headerComponent: CustomHeader, headerClass: 'center-header', flex: 1, minWidth: 200 },
    {
        headerName: '2021',
        field: '2021',
        editable: true,
        headerComponent: CustomHeader,
        headerClass: 'custom-header-class',
        valueGetter: (params) => params.data.label === 'Gross Profit %' ? calculateGrossProfitPercentage(params.data, '2021') : params.data.label === 'Adjusted EBITDA %' ? calculateEBITDAPercentage(params.data, '2021') : params.data['2021'],
        valueFormatter: (params) => ['Revenue', 'Gross Profit', 'Adjusted EBITDA'].includes(params.data.label) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value || 0) : params.value
    },
    {
        headerName: '2022',
        field: '2022',
        editable: true,
        headerComponent: CustomHeader,
        headerClass: 'center-header',
        valueGetter: (params) => params.data.label === 'Gross Profit %' ? calculateGrossProfitPercentage(params.data, '2022') : params.data.label === 'Adjusted EBITDA %' ? calculateEBITDAPercentage(params.data, '2022') : params.data['2022'],
        valueFormatter: (params) => ['Revenue', 'Gross Profit', 'Adjusted EBITDA'].includes(params.data.label) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value || 0) : params.value
    },
    {
        headerName: '2023',
        field: '2023',
        editable: true,
        headerComponent: CustomHeader,
        headerClass: 'center-header',
        valueGetter: (params) => params.data.label === 'Gross Profit %' ? calculateGrossProfitPercentage(params.data, '2023') : params.data.label === 'Adjusted EBITDA %' ? calculateEBITDAPercentage(params.data, '2023') : params.data['2023'],
        valueFormatter: (params) => ['Revenue', 'Gross Profit', 'Adjusted EBITDA'].includes(params.data.label) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value || 0) : params.value
    },
    {
        headerName: 'TTM',
        field: 'TTM',
        editable: true,
        headerComponent: CustomHeader,
        headerClass: 'center-header',
        valueGetter: (params) => params.data.label === 'Gross Profit %' ? calculateGrossProfitPercentage(params.data, 'TTM') : params.data.label === 'Adjusted EBITDA %' ? calculateEBITDAPercentage(params.data, 'TTM') : params.data['TTM'],
        valueFormatter: (params) => ['Revenue', 'Gross Profit', 'Adjusted EBITDA'].includes(params.data.label) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value || 0) : params.value
    }
]);

  const calculateGrossProfitPercentage = (data, year) => {
    const revenue = rowData.find(row => row.label === 'Revenue')[year];
    const grossProfit = rowData.find(row => row.label === 'Gross Profit')[year];
    return revenue ? ((grossProfit / revenue) * 100).toFixed(2) + '%' : '0.00%';
  };

  const calculateEBITDAPercentage = (data, year) => {
    const revenue = rowData.find(row => row.label === 'Revenue')[year];
    const adjustedEBITDA = rowData.find(row => row.label === 'Adjusted EBITDA')[year];
    return revenue ? ((adjustedEBITDA / revenue) * 100).toFixed(2) + '%' : '0.00%';
  };

  const onGridReady = (params) => {
    gridRef.current.api.sizeColumnsToFit();
  };

return (
  <div className="ag-theme-alpine" style={{ width: '100%', overflowX: 'auto' }}>
    <div style={{ width: `${columnDefs.length * 150}px` }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, minWidth: 150 }}
        modules={[ClientSideRowModelModule]}
        domLayout="autoHeight"
        onGridReady={onGridReady}
        onCellValueChanged={(params) => {
          const updatedData = [...rowData];
          updatedData[params.node.rowIndex] = params.data;
          setRowData(updatedData);
        }}
      />
    </div>
  </div>
);
};

export default AgGridComponent;