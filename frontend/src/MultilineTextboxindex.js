// frontend/src/MultilineTextBoxindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import MultilineTextFields from './components/MultilineTextBox';

const textBoxNode = document.getElementById('react-multiline-text-box');
if (textBoxNode) {
  const textBoxRoot = createRoot(textBoxNode);
  textBoxRoot.render(<MultilineTextFields />);
}