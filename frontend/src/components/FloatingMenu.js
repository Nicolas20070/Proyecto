import React from 'react';
import { SpeedDial } from 'primereact/speeddial';
import '../styles/FloatingMenu.css';

function FloatingMenu() {
  const speedDialItems = [
    { label: 'Dashboard', icon: 'pi pi-chart-line', command: () => window.location.href = '/adminDashboard' },
    { label: 'Usuarios', icon: 'pi pi-users', command: () => window.location.href = '/usuarios' },
    { label: 'Citas', icon: 'pi pi-calendar', command: () => window.location.href = '/citas_a' },
    { label: 'Inventario', icon: 'pi pi-box', command: () => window.location.href = '/inventario_a' },
    { label: 'Servicios', icon: 'pi pi-cog', command: () => window.location.href = '/servicios_a' },
    { label: 'Vehículos', icon: 'pi pi-car', command: () => window.location.href = '/vehiculos_a' }
  ];

  return (
    <div className="floating-menu-wrapper">
      <SpeedDial model={speedDialItems} direction="up" className="floating-menu" buttonClassName="p-button-primary" />
    </div>
  );
}

export default FloatingMenu;
