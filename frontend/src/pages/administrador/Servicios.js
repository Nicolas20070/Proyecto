import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import FloatingMenu from '../../components/FloatingMenu';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/Services.css';

function Services() {
  const [services, setServices] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [serviceDialog, setServiceDialog] = useState(false);
  const [viewServiceDialog, setViewServiceDialog] = useState(false);
  const [deleteServiceDialog, setDeleteServiceDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [service, setService] = useState({ nombre: '', descripcion: '', valor: '', repuestos: '', duracion: '', imagen: '' });

  useEffect(() => {
    setServices([
      { id: 1, nombre: 'Cambio de Aceite', descripcion: 'Cambio completo de aceite y filtro', valor: 120, repuestos: 'Aceite, Filtro de Aceite', duracion: '1 hora', imagen: 'https://via.placeholder.com/150' },
      { id: 2, nombre: 'Alineación y Balanceo', descripcion: 'Alineación de ruedas y balanceo de neumáticos', valor: 80, repuestos: 'Plomos de Balanceo', duracion: '1.5 horas', imagen: 'https://via.placeholder.com/150' },
      // Agrega más servicios aquí
    ]);
  }, []);

  const openNew = () => {
    setService({ nombre: '', descripcion: '', valor: '', repuestos: '', duracion: '', imagen: '' });
    setSelectedService(null);
    setServiceDialog(true);
  };

  const hideDialog = () => {
    setServiceDialog(false);
  };

  const hideViewServiceDialog = () => {
    setViewServiceDialog(false);
  };

  const hideDeleteServiceDialog = () => {
    setDeleteServiceDialog(false);
  };

  const saveService = () => {
    let _services = [...services];
    if (selectedService) {
      const index = _services.findIndex((s) => s.id === selectedService.id);
      _services[index] = service;
    } else {
      service.id = Math.floor(Math.random() * 1000) + 1;
      _services.push(service);
    }
    setServices(_services);
    setServiceDialog(false);
  };

  const editService = (service) => {
    setService({ ...service });
    setSelectedService(service);
    setServiceDialog(true);
  };

  const viewService = (service) => {
    setService({ ...service });
    setViewServiceDialog(true);
  };

  const confirmDeleteService = (service) => {
    setService(service);
    setDeleteServiceDialog(true);
  };

  const deleteService = () => {
    let _services = services.filter((s) => s.id !== service.id);
    setServices(_services);
    setDeleteServiceDialog(false);
    setService({ nombre: '', descripcion: '', valor: '', repuestos: '', duracion: '', imagen: '' });
  };

  return (
    <div>
        <AuthenticatedHeader/>
    <div className='services-container'>
      <h1>Gestión de Servicios</h1>
      <Toolbar className='mb-4' right={() => (
        <Button label='Nuevo Servicio' icon='pi pi-plus' className='p-button-success' onClick={openNew} />
      )}></Toolbar>
      <div className='datatable-wrapper'>
        <DataTable value={services} paginator rows={5} globalFilter={globalFilter} header={<InputText type='search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar Servicio...' />}>
          <Column field='nombre' header='Nombre' sortable></Column>
          <Column field='valor' header='Valor' sortable></Column>
          <Column field='duracion' header='Duración' sortable></Column>
          <Column
            header='Acciones'
            body={(rowData) => (
              <div className='action-buttons'>
                <Button icon='pi pi-eye' className='p-button-rounded p-button-info mr-2' onClick={() => viewService(rowData)} />
                <Button icon='pi pi-pencil' className='p-button-rounded p-button-warning mr-2' onClick={() => editService(rowData)} />
                <Button icon='pi pi-trash' className='p-button-rounded p-button-danger' onClick={() => confirmDeleteService(rowData)} />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
      <Dialog visible={serviceDialog} header={selectedService ? 'Editar Servicio' : 'Nuevo Servicio'} modal className='p-fluid' style={{ width: '800px' }} footer={
        <>
          <Button label='Cancelar' icon='pi pi-times' className='p-button-text' onClick={hideDialog} />
          <Button label='Guardar' icon='pi pi-check' className='p-button-text' onClick={saveService} />
        </>
      } onHide={hideDialog}>
        <div className='dialog-content'>
          <div className='dialog-left'>
            <div className='p-field'>
              <label htmlFor='nombre'>Nombre</label>
              <InputText id='nombre' value={service.nombre} onChange={(e) => setService({ ...service, nombre: e.target.value })} required autoFocus />
            </div>
            <div className='p-field'>
              <label htmlFor='descripcion'>Descripción</label>
              <InputText id='descripcion' value={service.descripcion} onChange={(e) => setService({ ...service, descripcion: e.target.value })} required />
            </div>
            <div className='p-field'>
              <label htmlFor='valor'>Valor</label>
              <InputText id='valor' value={service.valor} onChange={(e) => setService({ ...service, valor: e.target.value })} required />
            </div>
            <div className='p-field'>
              <label htmlFor='repuestos'>Repuestos</label>
              <InputText id='repuestos' value={service.repuestos} onChange={(e) => setService({ ...service, repuestos: e.target.value })} required />
            </div>
            <div className='p-field'>
              <label htmlFor='duracion'>Duración</label>
              <InputText id='duracion' value={service.duracion} onChange={(e) => setService({ ...service, duracion: e.target.value })} required />
            </div>
          </div>
          <div className='dialog-right'>
            <div className='p-field'>
              <label htmlFor='imagen'>Imagen URL</label>
              <InputText id='imagen' value={service.imagen} onChange={(e) => setService({ ...service, imagen: e.target.value })} required />
            </div>
            <div className='image-preview'>
              <img src={service.imagen} alt={service.nombre} />
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog visible={viewServiceDialog} header='Detalle del Servicio' modal className='p-fluid' style={{ width: '1000px' }} footer={
        <>
          <Button label='Cerrar' icon='pi pi-times' className='p-button-text' onClick={hideViewServiceDialog} />
        </>
      } onHide={hideViewServiceDialog}>
        <div className='dialog-content'>
          <div className='dialog-left'>
            <div className='p-field'>
              <h3>Nombre</h3>
              <p>{service.nombre}</p>
            </div>
            <div className='p-field'>
              <h3>Descripción</h3>
              <p>{service.descripcion}</p>
            </div>
            <div className='p-field'>
              <h3>Valor</h3>
              <p>${service.valor}</p>
            </div>
            <div className='p-field'>
              <h3>Repuestos</h3>
              <p>{service.repuestos}</p>
            </div>
            <div className='p-field'>
              <h3>Duración</h3>
              <p>{service.duracion}</p>
            </div>
          </div>
          <div className='dialog-right'>
            <div className='p-field'>
              <h3>Imagen</h3>
              <a href={service.imagen} target='_blank' rel='noopener noreferrer'>{service.imagen}</a>
              <div className='image-preview'>
                <img src={service.imagen} alt={service.nombre} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog visible={deleteServiceDialog} header='Confirmar Eliminación' modal footer={
        <>
          <Button label='No' icon='pi pi-times' className='p-button-text' onClick={hideDeleteServiceDialog} />
          <Button label='Sí' icon='pi pi-check' className='p-button-text' onClick={deleteService} />
        </>
      } onHide={hideDeleteServiceDialog}>
        <p>¿Está seguro de que desea eliminar el servicio <strong>{service.nombre}</strong>?</p>
      </Dialog>
      <FloatingMenu />
    </div>
    </div>
  );
}

export default Services;
