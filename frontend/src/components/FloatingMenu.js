import React from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Button } from 'primereact/button';
import '../styles/FloatingMenu.css';

function FloatingMenu() {
  const speedDialItems = [
    { label: 'Dashboard', icon: 'pi pi-chart-line', command: () => window.location.href = '/adminDashboard' },
    { label: 'Usuarios', icon: 'pi pi-users', command: () => window.location.hash = '/usuarios' },
    { label: 'Citas', icon: 'pi pi-calendar', command: () => window.location.hash = '/citas_a' },
    { label: 'Inventario', icon: 'pi pi-box', command: () => window.location.hash = '/inventario_a' },
    { label: 'Personal', icon: 'pi pi-briefcase', command: () => window.location.hash = '/personal_a' },
    { label: 'Peticiones', icon: 'pi pi-envelope', command: () => window.location.hash = '/peticiones_a' },
    { label: 'Servicios', icon: 'pi pi-cog', command: () => window.location.hash = '/servicios_a' },
    { label: 'Vehículos', icon: 'pi pi-car', command: () => window.location.hash = '/vehiculos_a' }
  ];

  return (
    <div className='floating-menu-wrapper'>
      <SpeedDial model={speedDialItems} direction='up' className='floating-menu' />
    </div>
  );
}

export default FloatingMenu;
