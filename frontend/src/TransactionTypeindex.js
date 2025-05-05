import React from 'react';
import { createRoot } from 'react-dom/client';
import SelectTextFields from './components/TransactionTypeDropdown';

const textBoxNode = document.getElementById('react-transaction-type');
if (textBoxNode) {
  const textBoxRoot = createRoot(textBoxNode);
  textBoxRoot.render(<SelectTextFields />);
}