import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();

    const chartData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
            {
                label: 'Nuevos Registros',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56]
            }
        ]
    };

    const tableData = [
        { id: 1, usuario: 'admin', email: 'admin@example.com', rol: 'Administrador' },
        { id: 2, usuario: 'usuario1', email: 'user1@example.com', rol: 'Usuario' },
        { id: 3, usuario: 'usuario2', email: 'user2@example.com', rol: 'Usuario' },
    ];

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
                <Card title='Ingresos' className='dashboard-card'>
                    <p>$15,000</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/procesos_a')} />
                </Card>
                <Card title='Inventario' className='dashboard-card'>
                    <p>Gestión de Inventario</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/inventario_a')} />
                </Card>
                <Card title='Personal' className='dashboard-card'>
                    <p>Gestión del Personal</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/personal_a')} />
                </Card>
                <Card title='Peticiones' className='dashboard-card'>
                    <p>Solicitudes Pendientes</p>
                    <Button label='Ver Detalles' className='p-button-secondary' onClick={() => navigate('/peticiones_a')} />
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

            <section className='dashboard-chart'>
                <h2>Registros de Usuarios</h2>
                <Chart type='bar' data={chartData} className='chart' />
            </section>

            <section className='dashboard-table'>
                <h2>Últimos Usuarios Registrados</h2>
                <DataTable value={tableData} className='datatable'>
                    <Column field='usuario' header='Usuario' />
                    <Column field='email' header='Correo Electrónico' />
                    <Column field='rol' header='Rol' />
                </DataTable>
            </section>
            <Footer />
        </div>
    );
}

export default AdminDashboard;
