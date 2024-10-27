import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div className='admin-dashboard-container'>
            <AuthenticatedHeader />

            <section className='dashboard-summary'>
                <Card title='Usuarios Registrados' className='dashboard-card'>
                    <p>50 Usuarios</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/usuarios')} />
                </Card>
                <Card title='Citas del Mes' className='dashboard-card'>
                    <p>30 Citas Agendadas</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/citas_a')} />
                </Card>
                <Card title='Inventario' className='dashboard-card'>
                    <p>Gestión de Inventario</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/inventario_a')} />
                </Card>
                <Card title='Servicios' className='dashboard-card'>
                    <p>Servicios Ofrecidos</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/servicios_a')} />
                </Card>
                <Card title='Vehículos' className='dashboard-card'>
                    <p>Gestión de Vehículos</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/vehiculos_a')} />
                </Card>
            </section>

            <Footer />
        </div>
    );
}

export default AdminDashboard;
