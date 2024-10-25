import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/administrador/AdminDashboard';
import RegisteredUsers from './pages/administrador/RegisteredUsers';
import CitasDelMes from './pages/administrador/CitasDelMes';
import Inventario from './pages/administrador/Inventario';
import Personal from './pages/administrador/Personal';
import Income from './pages/administrador/Income';
import Processes from './pages/administrador/Processes';
import Servicios from './pages/administrador/Servicios';
import Vehiculos from './pages/administrador/Vehiculos';
import AdminProfile from './pages/administrador/AdminProfile';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/usuarios' element={<RegisteredUsers />} />
        <Route path='/citas_a' element={<CitasDelMes />} />
        <Route path='/inventario_a' element={<Inventario />} />
        <Route path='/personal_a' element={<Personal />} />
        <Route path='/ingresos' element={<Income />} />
        <Route path='/procesos' element={<Processes />} />        
        <Route path='/servicios_a' element={<Servicios />} />
        <Route path='/vehiculos_a' element={<Vehiculos />} />
        <Route path='/perfil_admin' element={<AdminProfile />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
