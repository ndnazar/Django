// frontend/src/CloseDateindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectedClosingDate from './components/ProjectedClosingDate';

const closeDateNode = document.getElementById('react-close-date');
if (closeDateNode) {
  const closeDateRoot = createRoot(closeDateNode);
  closeDateRoot.render(<ProjectedClosingDate />);
}