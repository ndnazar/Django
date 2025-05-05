// frontend/src/TextBoxindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import BasicTextFields from './components/TextBox';

const textBoxNode = document.getElementById('react-text-box');
if (textBoxNode) {
  const textBoxRoot = createRoot(textBoxNode);
  textBoxRoot.render(<BasicTextFields />);
}