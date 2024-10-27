import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/ClientDashboard.css';

function ClientDashboard() {
    const appointments = [
        { id: 1, service: 'Mantenimiento General', date: '2024-11-01', status: 'Confirmada' },
        { id: 2, service: 'Cambio de Aceite', date: '2024-11-05', status: 'Pendiente' },
        { id: 3, service: 'Revisión de Frenos', date: '2024-10-28', status: 'Completada' },
    ];

    const invoices = [
        { id: 1, service: 'Mantenimiento General', amount: '$200', date: '2024-10-20', status: 'Pagada' },
        { id: 2, service: 'Cambio de Aceite', amount: '$50', date: '2024-10-25', status: 'Pendiente' },
    ];

    const vehicles = [
        { id: 1, brand: 'BMW', model: 'X5', year: 2021, plate: 'ABC-123', status: 'Activo' },
        { id: 2, brand: 'Mini Cooper', model: 'S', year: 2019, plate: 'XYZ-789', status: 'Activo' },
    ];

    const chartData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
            {
                label: 'Gastos Mensuales',
                backgroundColor: '#42A5F5',
                data: [150, 200, 180, 220, 170]
            }
        ]
    };

    return (
        <div className='client-dashboard-container'>
            <AuthenticatedHeader />
            <FloatingMenu />
            <div className='dashboard-content'>
                <section className='dashboard-summary'>
                    <Card title='Próximas Citas' className='dashboard-card'>
                        <p>{appointments.filter(appointment => appointment.status === 'Pendiente').length} Citas Pendientes</p>
                        <Button label='Ver Citas' className='p-button-secondary' onClick={() => window.location.hash = "/citas_cliente"} />
                    </Card>
                    <Card title='Facturas' className='dashboard-card'>
                        <p>{invoices.filter(invoice => invoice.status === 'Pendiente').length} Facturas Pendientes</p>
                        <Button label='Ver Facturas' className='p-button-secondary' onClick={() => window.location.hash = "/facturas_cliente"} />
                    </Card>
                    <Card title='Mis Vehículos' className='dashboard-card'>
                        <p>{vehicles.length} Vehículos Registrados</p>
                        <Button label='Ver Vehículos' className='p-button-secondary' onClick={() => window.location.hash = "/vehiculos_cliente"} />
                    </Card>
                    <Card title='Historial de Gastos' className='dashboard-card'>
                        <Chart type='bar' data={chartData} className='chart' />
                    </Card>
                </section>

                <section className='dashboard-table'>
                    <h2>Citas Recientes</h2>
                    <DataTable value={appointments} paginator rows={5} className='client-appointments-table'>
                        <Column field='service' header='Servicio' sortable></Column>
                        <Column field='date' header='Fecha' sortable></Column>
                        <Column field='status' header='Estado' sortable></Column>
                    </DataTable>
                </section>

                <section className='dashboard-table'>
                    <h2>Facturas Recientes</h2>
                    <DataTable value={invoices} paginator rows={5} className='client-invoices-table'>
                        <Column field='service' header='Servicio' sortable></Column>
                        <Column field='amount' header='Monto' sortable></Column>
                        <Column field='date' header='Fecha' sortable></Column>
                        <Column field='status' header='Estado' sortable></Column>
                    </DataTable>
                </section>

                <section className='dashboard-table'>
                    <h2>Mis Vehículos</h2>
                    <DataTable value={vehicles} paginator rows={5} className='client-vehicles-table'>
                        <Column field='brand' header='Marca' sortable></Column>
                        <Column field='model' header='Modelo' sortable></Column>
                        <Column field='year' header='Año' sortable></Column>
                        <Column field='plate' header='Placa' sortable></Column>
                        <Column field='status' header='Estado' sortable></Column>
                    </DataTable>
                </section>
            </div>
        </div>
    );
}

export default ClientDashboard;
