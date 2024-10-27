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
import Servicios from './pages/administrador/Servicios';
import Vehiculos from './pages/administrador/Vehiculos';
import AdminProfile from './pages/administrador/AdminProfile';
import EmployeeDashboard from './pages/empleado/EmployeeDashboard';
import ClientDashboard from './pages/cliente/ClientDashboard';
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
        <Route path='/servicios_a' element={<Servicios />} />
        <Route path='/vehiculos_a' element={<Vehiculos />} />
        <Route path='/perfil_admin' element={<AdminProfile />} />

        <Route path='/empleadoDashboard' element={<EmployeeDashboard/>} />

        <Route path='/clienteDashboard' element={<ClientDashboard/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
