import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/administrador/AdminDashboard';
import RegisteredUsers from './pages/administrador/RegisteredUsers';

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
      </Routes>
    </Router>
  );
}

export default AppRouter;
