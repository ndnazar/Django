// Notesindex.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import NotesWall from './components/Notes';

const container = document.getElementById('react-notes');
if (container) {
  const root = createRoot(container);
  root.render(<NotesWall />);
}