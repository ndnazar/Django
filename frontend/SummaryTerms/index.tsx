// src/components/TermSheetForm/index.tsx
import * as React from 'react';
import { createRoot } from 'react-dom/client'
import TermSheetForm from './SummaryTermsComponents/TermSheetForm'


createRoot(document.getElementById("terms-root")!).render(<TermSheetForm />)