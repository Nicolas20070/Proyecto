import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import 'primereact/resources/themes/saga-blue/theme.css';  // Cambia 'lara-light-indigo' por el tema deseado
import 'primereact/resources/primereact.min.css';  // Estilos principales de PrimeReact
import 'primeicons/primeicons.css';  // Iconos de PrimeIcons
import 'primeflex/primeflex.css';  // Utilidades de PrimeFlex para diseño y espaciado


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);