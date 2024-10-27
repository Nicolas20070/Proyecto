import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/Services.css';

function Services() {
  const [services, setServices] = useState([]);
  const [serviceDialog, setServiceDialog] = useState(false);
  const [viewServiceDialog, setViewServiceDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);
  const [estadoFiltro, setEstadoFiltro] = useState(null);
  const [service, setService] = useState({
    nombre: '', descripcion: '', precio: '', duracion_estimada: '', categoria: '', estado: 'Activo'
  });

  const categorias = [
    { label: 'Mantenimiento Preventivo', value: 'Mantenimiento Preventivo' },
    { label: 'Reparación', value: 'Reparación' },
    { label: 'Diagnóstico', value: 'Diagnóstico' },
    { label: 'Personalización', value: 'Personalización' },
  ];

  const estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
  ];

  useEffect(() => {
    setServices([
      { servicio_id: 1, nombre: 'Cambio de Aceite', descripcion: 'Cambio de aceite y filtro', precio: 120.00, duracion_estimada: '01:00:00', categoria: 'Mantenimiento Preventivo', estado: 'Activo' },
      { servicio_id: 2, nombre: 'Revisión General', descripcion: 'Inspección completa del vehículo', precio: 250.00, duracion_estimada: '02:30:00', categoria: 'Diagnóstico', estado: 'Activo' },
      { servicio_id: 3, nombre: 'Reparación de Frenos', descripcion: 'Cambio de pastillas de freno', precio: 150.00, duracion_estimada: '01:30:00', categoria: 'Reparación', estado: 'Activo' },
      { servicio_id: 4, nombre: 'Pintura Personalizada', descripcion: 'Aplicación de pintura personalizada', precio: 500.00, duracion_estimada: '05:00:00', categoria: 'Personalización', estado: 'Activo' },
      { servicio_id: 5, nombre: 'Cambio de Bujías', descripcion: 'Cambio de bujías y ajuste del motor', precio: 180.00, duracion_estimada: '01:15:00', categoria: 'Mantenimiento Preventivo', estado: 'Inactivo' },
      { servicio_id: 6, nombre: 'Diagnóstico Eléctrico', descripcion: 'Evaluación completa del sistema eléctrico', precio: 220.00, duracion_estimada: '02:00:00', categoria: 'Diagnóstico', estado: 'Activo' },
      { servicio_id: 7, nombre: 'Alineación y Balanceo', descripcion: 'Ajuste de alineación y balanceo de ruedas', precio: 140.00, duracion_estimada: '01:45:00', categoria: 'Mantenimiento Preventivo', estado: 'Inactivo' },
      { servicio_id: 8, nombre: 'Reparación de Transmisión', descripcion: 'Reparación y ajuste de transmisión', precio: 750.00, duracion_estimada: '04:00:00', categoria: 'Reparación', estado: 'Activo' },
    ]);
  }, []);

  const openNewService = () => {
    setService({ nombre: '', descripcion: '', precio: '', duracion_estimada: '', categoria: '', estado: 'Activo' });
    setSelectedService(null);
    setServiceDialog(true);
  };

  const hideDialog = () => {
    setServiceDialog(false);
  };

  const hideViewDialog = () => {
    setViewServiceDialog(false);
  };

  const saveService = () => {
    let _services = [...services];
    if (selectedService) {
      const index = _services.findIndex((s) => s.servicio_id === selectedService.servicio_id);
      _services[index] = { ...service, servicio_id: selectedService.servicio_id };
    } else {
      service.servicio_id = services.length ? Math.max(...services.map(s => s.servicio_id)) + 1 : 1;
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

  const filteredServices = services.filter(service => 
    (!categoriaFiltro || service.categoria === categoriaFiltro) &&
    (!estadoFiltro || service.estado === estadoFiltro)
  );

  const header = (
    <div className="table-header">
      <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={openNewService} tooltip="Nuevo Servicio" />
      <Dropdown
        value={categoriaFiltro}
        options={categorias}
        onChange={(e) => setCategoriaFiltro(e.value)}
        placeholder="Filtrar por Categoría"
      />
      <Dropdown
        value={estadoFiltro}
        options={estados}
        onChange={(e) => setEstadoFiltro(e.value)}
        placeholder="Filtrar por Estado"
      />
      <InputText
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar Servicio..."
        className="p-input-icon-left"
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div className="action-buttons">
      <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => viewService(rowData)} />
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => editService(rowData)} />
    </div>
  );

  return (
    <div className="services-container">
      <AuthenticatedHeader/>
      <FloatingMenu/>

      <DataTable value={filteredServices} paginator rows={4} globalFilter={globalFilter} header={header} emptyMessage="No se encontraron servicios">
        <Column field="nombre" header="Nombre" sortable />
        <Column field="precio" header="Precio" sortable body={(rowData) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(rowData.precio)} />
        <Column field="duracion_estimada" header="Duración Estimada" sortable />
        <Column field="categoria" header="Categoría" sortable />
        <Column field="estado" header="Estado" sortable />
        <Column body={actionTemplate} header="Acciones" />
      </DataTable>

      {/* Dialogo para agregar o editar servicio */}
      <Dialog visible={serviceDialog} header={selectedService ? 'Editar Servicio' : 'Nuevo Servicio'} modal style={{ width: '60vw' }} onHide={hideDialog}>
        <div className="form-grid">
          <div className="form-col">
            <div className="p-field">
              <label htmlFor="nombre">Nombre</label>
              <InputText id="nombre" value={service.nombre} onChange={(e) => setService({ ...service, nombre: e.target.value })} required autoFocus />
            </div>
            <div className="p-field">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea id="descripcion" value={service.descripcion} onChange={(e) => setService({ ...service, descripcion: e.target.value })} required rows={3} />
            </div>
            <div className="p-field">
              <label htmlFor="precio">Precio</label>
              <InputText id="precio" value={service.precio} onChange={(e) => setService({ ...service, precio: e.target.value })} />
            </div>
          </div>
          <div className="form-col">
            <div className="p-field">
              <label htmlFor="duracion_estimada">Duración Estimada</label>
              <InputText id="duracion_estimada" value={service.duracion_estimada} onChange={(e) => setService({ ...service, duracion_estimada: e.target.value })} />
            </div>
            <div className="p-field">
              <label htmlFor="categoria">Categoría</label>
              <Dropdown id="categoria" value={service.categoria} options={categorias} onChange={(e) => setService({ ...service, categoria: e.value })} placeholder="Seleccione categoría" />
            </div>
            <div className="p-field">
              <label htmlFor="estado">Estado</label>
              <Dropdown id="estado" value={service.estado} options={estados} onChange={(e) => setService({ ...service, estado: e.value })} placeholder="Seleccione estado" />
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Guardar" icon="pi pi-check" className="p-button-primary" onClick={saveService} />
        </div>
      </Dialog>

      {/* Dialogo para ver detalle de servicio */}
      <Dialog visible={viewServiceDialog} header="Detalle del Servicio" modal style={{ width: '50vw' }} onHide={hideViewDialog}>
        {service && (
          <div>
            <p><strong>Nombre:</strong> {service.nombre}</p>
            <p><strong>Descripción:</strong> {service.descripcion}</p>
            <p><strong>Precio:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(service.precio)}</p>
            <p><strong>Duración Estimada:</strong> {service.duracion_estimada}</p>
            <p><strong>Categoría:</strong> {service.categoria}</p>
            <p><strong>Estado:</strong> {service.estado}</p>
            <Button label="Cerrar" icon="pi pi-times" onClick={hideViewDialog} />
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default Services;
