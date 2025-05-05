// frontend/src/DealStageindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import SelectTextFields from './components/DealStageDropdown';

const textBoxNode = document.getElementById('react-deal-stage');
if (textBoxNode) {
  const textBoxRoot = createRoot(textBoxNode);
  textBoxRoot.render(<SelectTextFields />);
}