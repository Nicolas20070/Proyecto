import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/EmployeeDashboard.css';

function EmployeeDashboard() {
    const tasks = [
        { id: 1, title: 'Revisión de inventario', status: 'En progreso', dueDate: '2024-11-01' },
        { id: 2, title: 'Mantenimiento preventivo', status: 'Pendiente', dueDate: '2024-11-03' },
        { id: 3, title: 'Reporte semanal', status: 'Completado', dueDate: '2024-10-25' },
    ];

    const messages = [
        { id: 1, from: 'Gerente', subject: 'Nueva política de seguridad', date: '2024-10-24' },
        { id: 2, from: 'Recursos Humanos', subject: 'Recordatorio de registro de horas', date: '2024-10-23' },
    ];

    const chartData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Horas Trabajadas',
                backgroundColor: '#42A5F5',
                data: [40, 38, 42, 36]
            }
        ]
    };

    return (
        <div className='employee-dashboard-container'>
            <AuthenticatedHeader />
            <FloatingMenu />
            <div className='dashboard-content'>
                <section className='dashboard-summary'>
                    <Card title='Tareas Asignadas' className='dashboard-card'>
                        <p>{tasks.filter(task => task.status !== 'Completado').length} Tareas Pendientes</p>
                        <Button label='Ver Tareas' className='p-button-secondary' onClick={() => window.location.hash = "/tareas_empleado"} />
                    </Card>
                    <Card title='Horas Trabajadas' className='dashboard-card'>
                        <Chart type='bar' data={chartData} className='chart' />
                    </Card>
                    <Card title='Mensajes' className='dashboard-card'>
                        <p>{messages.length} Mensajes Nuevos</p>
                        <Button label='Ver Mensajes' className='p-button-secondary' onClick={() => window.location.hash = "/mensajes_empleado"} />
                    </Card>
                </section>

                <section className='dashboard-table'>
                    <h2>Tareas Recientes</h2>
                    <DataTable value={tasks} paginator rows={5} className='employee-tasks-table'>
                        <Column field='title' header='Tarea' sortable></Column>
                        <Column field='status' header='Estado' sortable></Column>
                        <Column field='dueDate' header='Fecha de Vencimiento' sortable></Column>
                    </DataTable>
                </section>

                <section className='dashboard-messages'>
                    <h2>Mensajes Recientes</h2>
                    <DataTable value={messages} paginator rows={5} className='employee-messages-table'>
                        <Column field='from' header='De' sortable></Column>
                        <Column field='subject' header='Asunto' sortable></Column>
                        <Column field='date' header='Fecha' sortable></Column>
                    </DataTable>
                </section>
            </div>
        </div>
    );
}

export default EmployeeDashboard;
