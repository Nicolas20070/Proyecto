import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/Inventario.css';

function Inventario() {
  const [repuestos, setRepuestos] = useState([
    {
      repuesto_id: 1,
      nombre: 'Filtro de Aceite',
      descripcion: 'Filtro de aceite para motor',
      categoria: 'Filtros',
      marca_compatible: 'BMW',
      numero_parte: '123ABC',
      precio: 50000,
      precio_venta: 80000,
      cantidad: 10,
      cantidad_minima: 5,
      ubicacion: 'Almacén A1',
      proveedor: 'Proveedor A',
      estado: 'Activo',
    },
    {
      repuesto_id: 2,
      nombre: 'Pastillas de Freno',
      descripcion: 'Juego de pastillas de freno delantero',
      categoria: 'Frenos',
      marca_compatible: 'Mini Cooper',
      numero_parte: '456DEF',
      precio: 75000,
      precio_venta: 120000,
      cantidad: 3,
      cantidad_minima: 5,
      ubicacion: 'Almacén B2',
      proveedor: 'Proveedor B',
      estado: 'Por agotarse',
    },
    {
      repuesto_id: 3,
      nombre: 'Aceite de Motor',
      descripcion: 'Aceite sintético para motor',
      categoria: 'Aceites y Fluidos',
      marca_compatible: 'Ambos',
      numero_parte: '789GHI',
      precio: 95000,
      precio_venta: 150000,
      cantidad: 2,
      cantidad_minima: 5,
      ubicacion: 'Almacén C3',
      proveedor: 'Proveedor C',
      estado: 'Por agotarse',
    },
    {
      repuesto_id: 4,
      nombre: 'Filtro de Aire',
      descripcion: 'Filtro de aire para motor',
      categoria: 'Filtros',
      marca_compatible: 'BMW',
      numero_parte: '159JKL',
      precio: 45000,
      precio_venta: 70000,
      cantidad: 7,
      cantidad_minima: 5,
      ubicacion: 'Almacén D4',
      proveedor: 'Proveedor D',
      estado: 'Activo',
    },
    {
      repuesto_id: 5,
      nombre: 'Bujías',
      descripcion: 'Bujías de encendido para motor',
      categoria: 'Eléctrico',
      marca_compatible: 'BMW',
      numero_parte: '963MNO',
      precio: 30000,
      precio_venta: 50000,
      cantidad: 6,
      cantidad_minima: 5,
      ubicacion: 'Almacén E5',
      proveedor: 'Proveedor E',
      estado: 'Activo',
    },
    {
      repuesto_id: 6,
      nombre: 'Filtro de Combustible',
      descripcion: 'Filtro de combustible para motor',
      categoria: 'Filtros',
      marca_compatible: 'Mini Cooper',
      numero_parte: '258PQR',
      precio: 50000,
      precio_venta: 85000,
      cantidad: 4,
      cantidad_minima: 5,
      ubicacion: 'Almacén F6',
      proveedor: 'Proveedor F',
      estado: 'Por agotarse',
    },
    {
      repuesto_id: 7,
      nombre: 'Radiador',
      descripcion: 'Radiador de refrigeración del motor',
      categoria: 'Motor',
      marca_compatible: 'Ambos',
      numero_parte: '357STU',
      precio: 200000,
      precio_venta: 300000,
      cantidad: 8,
      cantidad_minima: 5,
      ubicacion: 'Almacén G7',
      proveedor: 'Proveedor G',
      estado: 'Activo',
    },
    {
      repuesto_id: 8,
      nombre: 'Disco de Freno',
      descripcion: 'Disco de freno trasero',
      categoria: 'Frenos',
      marca_compatible: 'BMW',
      numero_parte: '159VWX',
      precio: 120000,
      precio_venta: 180000,
      cantidad: 5,
      cantidad_minima: 5,
      ubicacion: 'Almacén H8',
      proveedor: 'Proveedor H',
      estado: 'Activo',
    },
    {
      repuesto_id: 9,
      nombre: 'Amortiguador',
      descripcion: 'Amortiguador delantero',
      categoria: 'Suspensión',
      marca_compatible: 'Mini Cooper',
      numero_parte: '753YZA',
      precio: 180000,
      precio_venta: 250000,
      cantidad: 3,
      cantidad_minima: 5,
      ubicacion: 'Almacén I9',
      proveedor: 'Proveedor I',
      estado: 'Por agotarse',
    },
  ]);

  const [repuestoDialog, setRepuestoDialog] = useState(false);
  const [detalleDialog, setDetalleDialog] = useState(false);
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);
  const [estadoFiltro, setEstadoFiltro] = useState(null);
  const toast = React.useRef(null);

  const categorias = [
    { label: 'Motor', value: 'Motor' },
    { label: 'Transmisión', value: 'Transmisión' },
    { label: 'Suspensión', value: 'Suspensión' },
    { label: 'Frenos', value: 'Frenos' },
    { label: 'Carrocería', value: 'Carrocería' },
    { label: 'Eléctrico', value: 'Eléctrico' },
    { label: 'Aceites y Fluidos', value: 'Aceites y Fluidos' },
    { label: 'Filtros', value: 'Filtros' },
    { label: 'Neumáticos', value: 'Neumáticos' },
    { label: 'Accesorios', value: 'Accesorios' },
  ];

  const estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Por agotarse', value: 'Por agotarse' },
    { label: 'Agotado', value: 'Agotado' },
    { label: 'Descontinuado', value: 'Descontinuado' },
  ];

  const repuestoVacio = {
    nombre: '', descripcion: '', categoria: '', marca_compatible: '', numero_parte: '',
    precio: 0, precio_venta: 0, cantidad: 0, cantidad_minima: 5, ubicacion: '', proveedor: '', estado: 'Activo'
  };

  const [repuesto, setRepuesto] = useState(repuestoVacio);

  const guardarRepuesto = () => {
    if (repuesto.repuesto_id) {
      setRepuestos(repuestos.map(r => (r.repuesto_id === repuesto.repuesto_id ? repuesto : r)));
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Repuesto actualizado',
        life: 3000
      });
    } else {
      setRepuestos([...repuestos, { ...repuesto, repuesto_id: repuestos.length + 1 }]);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Repuesto creado',
        life: 3000
      });
    }
    setRepuestoDialog(false);
    setRepuesto(repuestoVacio);
  };

  const nuevoRepuesto = () => {
    setRepuesto(repuestoVacio);
    setIsEditing(false);
    setRepuestoDialog(true);
  };

  const stockBajo = repuestos.filter(rep => rep.cantidad < rep.cantidad_minima);

  const generarReportePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Stock Bajo', 20, 10);
    doc.autoTable({
      head: [['Nombre', 'Cantidad', 'Cantidad Mínima', 'Ubicación']],
      body: stockBajo.map(rep => [rep.nombre, rep.cantidad, rep.cantidad_minima, rep.ubicacion])
    });
    doc.save('reporte_stock_bajo.pdf');
  };

  const header = (
    <div className="table-header">
      <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={nuevoRepuesto} tooltip="Nuevo Repuesto" />
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
        placeholder="Buscar..."
        className="p-input-icon-left"
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div className="action-buttons">
      <Button icon="pi pi-eye" className="p-button-info" onClick={() => setDetalleDialog(true) && setRepuestoSeleccionado(rowData)} tooltip="Ver detalles" />
      <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => setIsEditing(true) && setRepuesto(rowData) && setRepuestoDialog(true)} tooltip="Editar" />
    </div>
  );

  return (
    <div className="inventario-container">
        <AuthenticatedHeader/>
        <FloatingMenu/>
      <Toast ref={toast} />

      <DataTable
        value={repuestos}
        paginator rows={4}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="No se encontraron repuestos"
      >
        <Column field="nombre" header="Nombre" sortable />
        <Column field="categoria" header="Categoría" sortable />
        <Column field="cantidad" header="Cantidad" sortable />
        <Column field="precio" header="Precio Compra" body={(rowData) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(rowData.precio)} sortable />
        <Column field="estado" header="Estado" sortable />
        <Column body={actionTemplate} header="Acciones" />
      </DataTable>

      {/* Sección de Stock Bajo */}
      <div className="stock-bajo-container">
        <h3>Repuestos con Stock Bajo</h3>
        <DataTable value={stockBajo} paginator rows={3} emptyMessage="No hay repuestos con stock bajo">
          <Column field="nombre" header="Nombre" />
          <Column field="cantidad" header="Cantidad" />
          <Column field="cantidad_minima" header="Cantidad Mínima" />
          <Column field="ubicacion" header="Ubicación" />
        </DataTable>
        <Button label="Generar Reporte en PDF" icon="pi pi-file-pdf" className="p-button-danger" onClick={generarReportePDF} />
      </div>

      {/* Detalle del repuesto */}
      <Dialog visible={detalleDialog} style={{ width: '30vw' }} header="Detalles del Repuesto" modal onHide={() => setDetalleDialog(false)}>
        {repuestoSeleccionado && (
          <div>
            <p><strong>Nombre:</strong> {repuestoSeleccionado.nombre}</p>
            <p><strong>Descripción:</strong> {repuestoSeleccionado.descripcion}</p>
            {/* Otros detalles del repuesto */}
            <Button label="Cerrar" icon="pi pi-times" onClick={() => setDetalleDialog(false)} />
          </div>
        )}
      </Dialog>

      {/* Formulario para agregar o editar */}
      <Dialog visible={repuestoDialog} style={{ width: '60vw' }} header={isEditing ? 'Editar Repuesto' : 'Nuevo Repuesto'} modal onHide={() => setRepuestoDialog(false)}>
        <div className="form-grid">
          <div className="form-col">
            {/* Campos del formulario */}
          </div>
        </div>
        <div className="dialog-footer">
          <Button label="Cancelar" icon="pi pi-times" onClick={() => setRepuestoDialog(false)} />
          <Button label="Guardar" icon="pi pi-check" onClick={guardarRepuesto} />
        </div>
      </Dialog>
    </div>
  );
}

export default Inventario;
