// frontend/src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import AgGridComponent from './components/P&LGrid';

const rootNode = document.getElementById('root');
if (rootNode) {
  const root = createRoot(rootNode);
  root.render(<AgGridComponent />);
}