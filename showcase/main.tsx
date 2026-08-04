import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CalaraProvider } from '@persianstudio/calara';
import { App } from './App';
import './showcase.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalaraProvider>
      <App />
    </CalaraProvider>
  </StrictMode>,
);
