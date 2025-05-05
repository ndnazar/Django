// frontend/src/Placeholderindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import PlaceholderManager from './components/PlaceholderManager';

const container = document.getElementById('react-placeholder-container');
if (container) {
  const root = createRoot(container);
  root.render(<PlaceholderManager />);
}