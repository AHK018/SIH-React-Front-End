import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';


// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVJ2WmFZfVpgfV9CZVZRQmY/P1ZhSXxQd0diWH1fdHFVQWNbWEw=');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.error = () => {};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();