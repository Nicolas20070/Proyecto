import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import FloatingMenu from '../../components/FloatingMenu';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/Inventario.css';

function Inventario() {
  const [items, setItems] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [itemDialog, setItemDialog] = useState(false);
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [item, setItem] = useState({ nombre: '', cantidad: '', descripcion: '' });

  useEffect(() => {
    // Cargar datos iniciales de inventario (ejemplo)
    setItems([
      { id: 1, nombre: 'Aceite de Motor', cantidad: 50, descripcion: 'Aceite sintético 5W-30 para BMW y Mini Cooper.' },
      { id: 2, nombre: 'Pastillas de Freno', cantidad: 30, descripcion: 'Juego de pastillas de freno delanteras y traseras.' },
      { id: 3, nombre: 'Filtro de Aire', cantidad: 20, descripcion: 'Filtro de aire de alto rendimiento para BMW.' }
    ]);
  }, []);

  const openNew = () => {
    setItem({ nombre: '', cantidad: '', descripcion: '' });
    setSelectedItem(null);
    setItemDialog(true);
  };

  const hideDialog = () => {
    setItemDialog(false);
  };

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
  };

  const saveItem = () => {
    let _items = [...items];
    if (selectedItem) {
      const index = _items.findIndex((i) => i.id === selectedItem.id);
      _items[index] = item;
    } else {
      item.id = Math.floor(Math.random() * 1000) + 1;
      _items.push(item);
    }
    setItems(_items);
    setItemDialog(false);
  };

  const editItem = (item) => {
    setItem({ ...item });
    setSelectedItem(item);
    setItemDialog(true);
  };

  const confirmDeleteItem = (item) => {
    setItem(item);
    setDeleteItemDialog(true);
  };

  const deleteItem = () => {
    let _items = items.filter((i) => i.id !== item.id);
    setItems(_items);
    setDeleteItemDialog(false);
    setItem({ nombre: '', cantidad: '', descripcion: '' });
  };

  return (
    <div>
        <AuthenticatedHeader/>
    <div className='inventario-container'>
      <h1>Inventario</h1>
      <Toolbar className='mb-4' right={() => (
        <Button label='Nuevo Artículo' icon='pi pi-plus' className='p-button-success' onClick={openNew} />
      )}></Toolbar>
      <div className='datatable-wrapper'>
        <DataTable value={items} paginator rows={5} globalFilter={globalFilter} header={<InputText type='search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar Artículo...' />}>          <Column field='nombre' header='Nombre' sortable></Column>
          <Column field='cantidad' header='Cantidad' sortable></Column>
          <Column field='descripcion' header='Descripción' sortable></Column>
          <Column
            header='Acciones'
            body={(rowData) => (
              <div className='action-buttons'>
                <Button icon='pi pi-pencil' className='p-button-rounded p-button-warning mr-2' onClick={() => editItem(rowData)} />
                <Button icon='pi pi-trash' className='p-button-rounded p-button-danger' onClick={() => confirmDeleteItem(rowData)} />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
      <Dialog visible={itemDialog} header={selectedItem ? 'Editar Artículo' : 'Nuevo Artículo'} modal className='p-fluid' footer={
        <>
          <Button label='Cancelar' icon='pi pi-times' className='p-button-text' onClick={hideDialog} />
          <Button label='Guardar' icon='pi pi-check' className='p-button-text' onClick={saveItem} />
        </>
      } onHide={hideDialog}>
        <div className='p-field'>
          <label htmlFor='nombre'>Nombre</label>
          <InputText id='nombre' value={item.nombre} onChange={(e) => setItem({ ...item, nombre: e.target.value })} required autoFocus />
        </div>
        <div className='p-field'>
          <label htmlFor='cantidad'>Cantidad</label>
          <InputText id='cantidad' value={item.cantidad} onChange={(e) => setItem({ ...item, cantidad: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='descripcion'>Descripción</label>
          <InputText id='descripcion' value={item.descripcion} onChange={(e) => setItem({ ...item, descripcion: e.target.value })} required />
        </div>
      </Dialog>
      <Dialog visible={deleteItemDialog} header='Confirmar Eliminación' modal footer={
        <>
          <Button label='No' icon='pi pi-times' className='p-button-text' onClick={hideDeleteItemDialog} />
          <Button label='Sí' icon='pi pi-check' className='p-button-text' onClick={deleteItem} />
        </>
      } onHide={hideDeleteItemDialog}>
        <p>¿Está seguro de que desea eliminar el artículo <strong>{item.nombre}</strong>?
        </p>
      </Dialog>
      <FloatingMenu />
    </div>
    </div>
  );
}

export default Inventario;
