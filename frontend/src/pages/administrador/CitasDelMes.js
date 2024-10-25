import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import FloatingMenu from '../../components/FloatingMenu';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/CitasDelMes.css';

function CitasDelMes() {
  const [appointments, setAppointments] = useState([
    { id: 1, cliente: 'Juan Perez', fecha: '2023-11-01', servicio: 'Mantenimiento Preventivo', telefono: '123-456-7890', vehiculo: 'BMW X5', comentario: 'Revisión completa de sistema eléctrico.' },
    { id: 2, cliente: 'Maria Garcia', fecha: '2023-11-05', servicio: 'Reparación de Frenos', telefono: '987-654-3210', vehiculo: 'Mini Cooper S', comentario: 'Problemas con el pedal de freno.' },
    { id: 3, cliente: 'Carlos López', fecha: '2023-11-10', servicio: 'Cambio de Aceite', telefono: '555-123-4567', vehiculo: 'BMW Serie 3', comentario: 'Cambio de aceite y filtro.' },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [visible, setVisible] = useState(false);

  const onFilterDate = (date) => {
    setSelectedDate(date);
    if (date) {
      const filteredAppointments = appointments.filter(appointment => appointment.fecha.startsWith(date.toISOString().split('T')[0]));
      setAppointments(filteredAppointments);
    } else {
      setAppointments([
        { id: 1, cliente: 'Juan Perez', fecha: '2023-11-01', servicio: 'Mantenimiento Preventivo', telefono: '123-456-7890', vehiculo: 'BMW X5', comentario: 'Revisión completa de sistema eléctrico.' },
        { id: 2, cliente: 'Maria Garcia', fecha: '2023-11-05', servicio: 'Reparación de Frenos', telefono: '987-654-3210', vehiculo: 'Mini Cooper S', comentario: 'Problemas con el pedal de freno.' },
        { id: 3, cliente: 'Carlos López', fecha: '2023-11-10', servicio: 'Cambio de Aceite', telefono: '555-123-4567', vehiculo: 'BMW Serie 3', comentario: 'Cambio de aceite y filtro.' },
      ]);
    }
  };

  const viewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setVisible(true);
  };

  return (
    <div>
      <AuthenticatedHeader/>
    <div className='citas-del-mes-container'>
      <h1>Citas del Mes</h1>
      <div className='datatable-toolbar'>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText type='search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar...' />
        </span>
        <Calendar value={selectedDate} onChange={(e) => onFilterDate(e.value)} placeholder='Filtrar por Fecha' />
      </div>
      <div className='datatable-wrapper'>
        <DataTable value={appointments} paginator rows={5} globalFilter={globalFilter} className='citas-del-mes-table'>
          <Column field='cliente' header='Cliente' sortable></Column>
          <Column field='fecha' header='Fecha' sortable></Column>
          <Column field='servicio' header='Servicio' sortable></Column>
          <Column
            header='Acciones'
            body={(rowData) => (
              <div className='action-buttons'>
                <Button icon='pi pi-eye' className='p-button-info' onClick={() => viewDetails(rowData)} />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
      <Dialog header='Detalles de la Cita' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        {selectedAppointment && (
          <div className='appointment-details'>
            <p><strong>Cliente:</strong> {selectedAppointment.cliente}</p>
            <p><strong>Fecha:</strong> {selectedAppointment.fecha}</p>
            <p><strong>Servicio:</strong> {selectedAppointment.servicio}</p>
            <p><strong>Teléfono:</strong> {selectedAppointment.telefono}</p>
            <p><strong>Vehículo:</strong> {selectedAppointment.vehiculo}</p>
            <p><strong>Comentario:</strong> {selectedAppointment.comentario}</p>
            <p><strong>Estado:</strong> En Proceso</p>
            <p><strong>Mecánico Asignado:</strong> José Martínez</p>
            <p><strong>Duración Estimada:</strong> 2 horas</p>
            <p><strong>Costo Aproximado:</strong> $150</p>
          </div>
        )}
      </Dialog>
      <FloatingMenu />
    </div>
    </div>
  );
}

export default CitasDelMes;
