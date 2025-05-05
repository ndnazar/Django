// frontend/src/ProjectIDindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectID from './components/ProjectID';

const container = document.getElementById('react-project-ID');
if (container) {
  const root = createRoot(container);
  root.render(<ProjectID />);
}