import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import FloatingMenu from '../../components/FloatingMenu';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/Vehicles.css';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [vehicleDialog, setVehicleDialog] = useState(false);
  const [viewVehicleDialog, setViewVehicleDialog] = useState(false);
  const [deleteVehicleDialog, setDeleteVehicleDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicle, setVehicle] = useState({ marca: '', modelo: '', anio: '', placa: '', propietario: '', tipo: '' });
  const vehicleTypes = [
    { label: 'Sedán', value: 'Sedán' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Convertible', value: 'Convertible' },
  ];

  useEffect(() => {
    setVehicles([
      { id: 1, marca: 'BMW', modelo: 'X5', anio: 2020, placa: 'ABC123', propietario: 'Juan Pérez', tipo: 'SUV' },
      { id: 2, marca: 'Mini', modelo: 'Cooper', anio: 2019, placa: 'XYZ789', propietario: 'María López', tipo: 'Sedán' },
      // Agrega más vehículos aquí
    ]);
  }, []);

  const openNew = () => {
    setVehicle({ marca: '', modelo: '', anio: '', placa: '', propietario: '', tipo: '' });
    setSelectedVehicle(null);
    setVehicleDialog(true);
  };

  const hideDialog = () => {
    setVehicleDialog(false);
  };

  const hideViewVehicleDialog = () => {
    setViewVehicleDialog(false);
  };

  const hideDeleteVehicleDialog = () => {
    setDeleteVehicleDialog(false);
  };

  const saveVehicle = () => {
    let _vehicles = [...vehicles];
    if (selectedVehicle) {
      const index = _vehicles.findIndex((v) => v.id === selectedVehicle.id);
      _vehicles[index] = vehicle;
    } else {
      vehicle.id = Math.floor(Math.random() * 1000) + 1;
      _vehicles.push(vehicle);
    }
    setVehicles(_vehicles);
    setVehicleDialog(false);
  };

  const editVehicle = (vehicle) => {
    setVehicle({ ...vehicle });
    setSelectedVehicle(vehicle);
    setVehicleDialog(true);
  };

  const viewVehicle = (vehicle) => {
    setVehicle({ ...vehicle });
    setViewVehicleDialog(true);
  };

  const confirmDeleteVehicle = (vehicle) => {
    setVehicle(vehicle);
    setDeleteVehicleDialog(true);
  };

  const deleteVehicle = () => {
    let _vehicles = vehicles.filter((v) => v.id !== vehicle.id);
    setVehicles(_vehicles);
    setDeleteVehicleDialog(false);
    setVehicle({ marca: '', modelo: '', anio: '', placa: '', propietario: '', tipo: '' });
  };

  return (
    <div>
        <AuthenticatedHeader/>
    <div className='vehicles-container'>
      <h1>Gestión de Vehículos</h1>
      <Button label='Nuevo Vehículo' icon='pi pi-plus' className='p-button-success mb-4' onClick={openNew} />
      <div className='datatable-wrapper'>
        <DataTable value={vehicles} paginator rows={5} globalFilter={globalFilter} header={<InputText type='search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar Vehículo...' />}>          
          <Column field='marca' header='Marca' sortable></Column>
          <Column field='modelo' header='Modelo' sortable></Column>
          <Column field='anio' header='Año' sortable></Column>
          <Column field='placa' header='Placa' sortable></Column>
          <Column field='propietario' header='Propietario' sortable></Column>
          <Column
            header='Acciones'
            body={(rowData) => (
              <div className='action-buttons'>
                <Button icon='pi pi-eye' className='p-button-rounded p-button-info mr-2' onClick={() => viewVehicle(rowData)} />
                <Button icon='pi pi-pencil' className='p-button-rounded p-button-warning mr-2' onClick={() => editVehicle(rowData)} />
                <Button icon='pi pi-trash' className='p-button-rounded p-button-danger' onClick={() => confirmDeleteVehicle(rowData)} />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
      <Dialog visible={vehicleDialog} header={selectedVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'} modal className='p-fluid' style={{ width: '800px' }} footer={
        <>
          <Button label='Cancelar' icon='pi pi-times' className='p-button-text' onClick={hideDialog} />
          <Button label='Guardar' icon='pi pi-check' className='p-button-text' onClick={saveVehicle} />
        </>
      } onHide={hideDialog}>
        <div className='p-field'>
          <label htmlFor='marca'>Marca</label>
          <InputText id='marca' value={vehicle.marca} onChange={(e) => setVehicle({ ...vehicle, marca: e.target.value })} required autoFocus />
        </div>
        <div className='p-field'>
          <label htmlFor='modelo'>Modelo</label>
          <InputText id='modelo' value={vehicle.modelo} onChange={(e) => setVehicle({ ...vehicle, modelo: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='anio'>Año</label>
          <InputText id='anio' value={vehicle.anio} onChange={(e) => setVehicle({ ...vehicle, anio: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='placa'>Placa</label>
          <InputText id='placa' value={vehicle.placa} onChange={(e) => setVehicle({ ...vehicle, placa: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='propietario'>Propietario</label>
          <InputText id='propietario' value={vehicle.propietario} onChange={(e) => setVehicle({ ...vehicle, propietario: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='tipo'>Tipo</label>
          <Dropdown id='tipo' value={vehicle.tipo} options={vehicleTypes} onChange={(e) => setVehicle({ ...vehicle, tipo: e.value })} placeholder='Seleccionar Tipo' />
        </div>
      </Dialog>
      <Dialog visible={viewVehicleDialog} header='Detalle del Vehículo' modal className='p-fluid' style={{ width: '800px' }} footer={
        <>
          <Button label='Cerrar' icon='pi pi-times' className='p-button-text' onClick={hideViewVehicleDialog} />
        </>
      } onHide={hideViewVehicleDialog}>
        <div className='p-field'>
          <h3>Marca</h3>
          <p>{vehicle.marca}</p>
        </div>
        <div className='p-field'>
          <h3>Modelo</h3>
          <p>{vehicle.modelo}</p>
        </div>
        <div className='p-field'>
          <h3>Año</h3>
          <p>{vehicle.anio}</p>
        </div>
        <div className='p-field'>
          <h3>Placa</h3>
          <p>{vehicle.placa}</p>
        </div>
        <div className='p-field'>
          <h3>Propietario</h3>
          <p>{vehicle.propietario}</p>
        </div>
        <div className='p-field'>
          <h3>Tipo</h3>
          <p>{vehicle.tipo}</p>
        </div>
      </Dialog>
      <Dialog visible={deleteVehicleDialog} header='Confirmar Eliminación' modal footer={
        <>
          <Button label='No' icon='pi pi-times' className='p-button-text' onClick={hideDeleteVehicleDialog} />
          <Button label='Sí' icon='pi pi-check' className='p-button-text' onClick={deleteVehicle} />
        </>
      } onHide={hideDeleteVehicleDialog}>
        <p>¿Está seguro de que desea eliminar el vehículo <strong>{vehicle.marca} {vehicle.modelo}</strong>?</p>
      </Dialog>
      <FloatingMenu />
    </div>
    </div>
  );
}

export default Vehicles;
