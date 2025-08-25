import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals';
import { initializeAccessibilityMonitoring, initializePerformanceMonitoring } from './lib/accessibility.js'

// Initialize accessibility monitoring in development
if (import.meta.env.MODE !== 'production') {
  import('react-axe').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);