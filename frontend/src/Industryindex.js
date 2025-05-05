// frontend/src/Industryindex.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import SelectTextFields from './components/IndustryDropdown';

const textBoxNode = document.getElementById('react-industry');
if (textBoxNode) {
  const textBoxRoot = createRoot(textBoxNode);
  textBoxRoot.render(<SelectTextFields />);
}