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
  const [viewVehicleDialog, setViewVehicleDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState(null);
  const [estadoFiltro, setEstadoFiltro] = useState(null);

  const marcas = [
    { label: 'BMW', value: 'BMW' },
    { label: 'Mini Cooper', value: 'Mini Cooper' },
  ];

  const estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'En Mantenimiento', value: 'En Mantenimiento' },
    { label: 'Inactivo', value: 'Inactivo' },
  ];

  useEffect(() => {
    setVehicles([
      { vehiculo_id: 1, placa: 'ABC123', marca: 'BMW', modelo: 'X5', anio: 2020, vin: '1HGCM82633A123456', color: 'Negro', kilometraje: 30000, ultima_revision: '2023-05-10', estado: 'Activo' },
      { vehiculo_id: 2, placa: 'XYZ789', marca: 'Mini Cooper', modelo: 'Cooper S', anio: 2019, vin: '1HGCM82633A654321', color: 'Rojo', kilometraje: 25000, ultima_revision: '2023-04-15', estado: 'En Mantenimiento' },
      { vehiculo_id: 3, placa: 'DEF456', marca: 'BMW', modelo: 'Serie 3', anio: 2018, vin: '1HGCM82633A789012', color: 'Azul', kilometraje: 45000, ultima_revision: '2023-03-22', estado: 'Inactivo' },
      { vehiculo_id: 4, placa: 'GHI101', marca: 'BMW', modelo: 'Serie 5', anio: 2021, vin: '1HGCM82633A234567', color: 'Blanco', kilometraje: 10000, ultima_revision: '2023-01-12', estado: 'Activo' },
      { vehiculo_id: 5, placa: 'JKL202', marca: 'Mini Cooper', modelo: 'Countryman', anio: 2017, vin: '1HGCM82633A345678', color: 'Verde', kilometraje: 60000, ultima_revision: '2023-06-05', estado: 'En Mantenimiento' },
      { vehiculo_id: 6, placa: 'MNO303', marca: 'BMW', modelo: 'X3', anio: 2022, vin: '1HGCM82633A456789', color: 'Gris', kilometraje: 5000, ultima_revision: '2023-07-20', estado: 'Activo' },
      { vehiculo_id: 7, placa: 'PQR404', marca: 'Mini Cooper', modelo: 'Clubman', anio: 2020, vin: '1HGCM82633A567890', color: 'Amarillo', kilometraje: 35000, ultima_revision: '2023-08-10', estado: 'Activo' },
      { vehiculo_id: 8, placa: 'STU505', marca: 'BMW', modelo: 'Serie 7', anio: 2019, vin: '1HGCM82633A678901', color: 'Negro', kilometraje: 40000, ultima_revision: '2023-09-15', estado: 'Inactivo' },
    ]);
  }, []);

  const hideViewVehicleDialog = () => {
    setViewVehicleDialog(false);
  };

  const viewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setViewVehicleDialog(true);
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    (!marcaFiltro || vehicle.marca === marcaFiltro) &&
    (!estadoFiltro || vehicle.estado === estadoFiltro)
  );

  const header = (
    <div className="table-header">
      <Dropdown
        value={marcaFiltro}
        options={marcas}
        onChange={(e) => setMarcaFiltro(e.value)}
        placeholder="Filtrar por Marca"
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
        placeholder="Buscar Vehículo..."
        className="p-input-icon-left"
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div className="action-buttons">
      <Button icon="pi pi-eye" className="p-button-rounded p-button-info" onClick={() => viewVehicle(rowData)} />
    </div>
  );

  return (
    <div>
      <AuthenticatedHeader />
      <div className="vehicles-container">

        <DataTable value={filteredVehicles} paginator rows={4} globalFilter={globalFilter} header={header} emptyMessage="No se encontraron vehículos">
          <Column field="placa" header="Placa" sortable />
          <Column field="marca" header="Marca" sortable />
          <Column field="modelo" header="Modelo" sortable />
          <Column field="anio" header="Año" sortable />
          <Column field="color" header="Color" sortable />
          <Column field="kilometraje" header="Kilometraje" sortable />
          <Column field="ultima_revision" header="Última Revisión" sortable />
          <Column field="estado" header="Estado" sortable />
        </DataTable>

        {/* Dialogo para ver detalle de vehículo */}
        <Dialog visible={viewVehicleDialog} header="Detalle del Vehículo" modal style={{ width: '50vw' }} onHide={hideViewVehicleDialog}>
          {selectedVehicle && (
            <div>
              <p><strong>Placa:</strong> {selectedVehicle.placa}</p>
              <p><strong>Marca:</strong> {selectedVehicle.marca}</p>
              <p><strong>Modelo:</strong> {selectedVehicle.modelo}</p>
              <p><strong>Año:</strong> {selectedVehicle.anio}</p>
              <p><strong>VIN:</strong> {selectedVehicle.vin}</p>
              <p><strong>Color:</strong> {selectedVehicle.color}</p>
              <p><strong>Kilometraje:</strong> {selectedVehicle.kilometraje}</p>
              <p><strong>Última Revisión:</strong> {selectedVehicle.ultima_revision}</p>
              <p><strong>Estado:</strong> {selectedVehicle.estado}</p>
              <Button label="Cerrar" icon="pi pi-times" onClick={hideViewVehicleDialog} />
            </div>
          )}
        </Dialog>
      </div>
      <FloatingMenu />
    </div>
  );
}

export default Vehicles;
