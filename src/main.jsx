// main.jsx
import React,{ StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Import the App component
import './index.css';  // Import global styles (if any)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
