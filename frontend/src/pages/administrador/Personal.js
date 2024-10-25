import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import FloatingMenu from '../../components/FloatingMenu';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/Personal.css';

function Personal() {
  const [personal, setPersonal] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [personalDialog, setPersonalDialog] = useState(false);
  const [deletePersonalDialog, setDeletePersonalDialog] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const [employee, setEmployee] = useState({ nombre: '', puesto: '', fechaIngreso: null, salario: '', departamento: '' });

  useEffect(() => {
    // Cargar datos iniciales del personal (ejemplo)
    setPersonal([
      { id: 1, nombre: 'Juan Pérez', puesto: 'Mecánico', fechaIngreso: '2022-01-15', salario: 1500, departamento: 'Mantenimiento' },
      { id: 2, nombre: 'María Gómez', puesto: 'Administradora', fechaIngreso: '2021-11-23', salario: 2000, departamento: 'Administración' },
      { id: 3, nombre: 'Carlos López', puesto: 'Recepcionista', fechaIngreso: '2023-03-10', salario: 1200, departamento: 'Atención al Cliente' }
    ]);
  }, []);

  const openNew = () => {
    setEmployee({ nombre: '', puesto: '', fechaIngreso: null, salario: '', departamento: '' });
    setSelectedPersonal(null);
    setPersonalDialog(true);
  };

  const hideDialog = () => {
    setPersonalDialog(false);
  };

  const hideDeletePersonalDialog = () => {
    setDeletePersonalDialog(false);
  };

  const saveEmployee = () => {
    let _personal = [...personal];
    if (selectedPersonal) {
      const index = _personal.findIndex((p) => p.id === selectedPersonal.id);
      _personal[index] = employee;
    } else {
      employee.id = Math.floor(Math.random() * 1000) + 1;
      _personal.push(employee);
    }
    setPersonal(_personal);
    setPersonalDialog(false);
  };

  const editEmployee = (employee) => {
    setEmployee({ ...employee });
    setSelectedPersonal(employee);
    setPersonalDialog(true);
  };

  const confirmDeleteEmployee = (employee) => {
    setEmployee(employee);
    setDeletePersonalDialog(true);
  };

  const deleteEmployee = () => {
    let _personal = personal.filter((p) => p.id !== employee.id);
    setPersonal(_personal);
    setDeletePersonalDialog(false);
    setEmployee({ nombre: '', puesto: '', fechaIngreso: null, salario: '', departamento: '' });
  };

  return (
    <div>
        <AuthenticatedHeader/>
    <div className='personal-container'>
      <h1>Gestión de Personal</h1>
      <Toolbar className='mb-4' right={() => (
        <Button label='Nuevo Empleado' icon='pi pi-plus' className='p-button-success' onClick={openNew} />
      )}></Toolbar>
      <div className='datatable-wrapper'>
        <DataTable value={personal} paginator rows={5} globalFilter={globalFilter} header={<InputText type='search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar Empleado...' />}>
          <Column field='nombre' header='Nombre' sortable></Column>
          <Column field='puesto' header='Puesto' sortable></Column>
          <Column field='fechaIngreso' header='Fecha de Ingreso' sortable></Column>
          <Column field='salario' header='Salario' sortable></Column>
          <Column field='departamento' header='Departamento' sortable></Column>
          <Column
            header='Acciones'
            body={(rowData) => (
              <div className='action-buttons'>
                <Button icon='pi pi-pencil' className='p-button-rounded p-button-warning mr-2' onClick={() => editEmployee(rowData)} />
                <Button icon='pi pi-trash' className='p-button-rounded p-button-danger' onClick={() => confirmDeleteEmployee(rowData)} />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
      <Dialog visible={personalDialog} header={selectedPersonal ? 'Editar Empleado' : 'Nuevo Empleado'} modal className='p-fluid' footer={
        <>
          <Button label='Cancelar' icon='pi pi-times' className='p-button-text' onClick={hideDialog} />
          <Button label='Guardar' icon='pi pi-check' className='p-button-text' onClick={saveEmployee} />
        </>
      } onHide={hideDialog}>
        <div className='p-field'>
          <label htmlFor='nombre'>Nombre</label>
          <InputText id='nombre' value={employee.nombre} onChange={(e) => setEmployee({ ...employee, nombre: e.target.value })} required autoFocus />
        </div>
        <div className='p-field'>
          <label htmlFor='puesto'>Puesto</label>
          <InputText id='puesto' value={employee.puesto} onChange={(e) => setEmployee({ ...employee, puesto: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='fechaIngreso'>Fecha de Ingreso</label>
          <Calendar id='fechaIngreso' value={employee.fechaIngreso} onChange={(e) => setEmployee({ ...employee, fechaIngreso: e.value })} required showIcon />
        </div>
        <div className='p-field'>
          <label htmlFor='salario'>Salario</label>
          <InputText id='salario' value={employee.salario} onChange={(e) => setEmployee({ ...employee, salario: e.target.value })} required />
        </div>
        <div className='p-field'>
          <label htmlFor='departamento'>Departamento</label>
          <Dropdown id='departamento' value={employee.departamento} onChange={(e) => setEmployee({ ...employee, departamento: e.value })} options={['Mantenimiento', 'Administración', 'Atención al Cliente']} placeholder='Seleccione un departamento' required />
        </div>
      </Dialog>
      <Dialog visible={deletePersonalDialog} header='Confirmar Eliminación' modal footer={
        <>
          <Button label='No' icon='pi pi-times' className='p-button-text' onClick={hideDeletePersonalDialog} />
          <Button label='Sí' icon='pi pi-check' className='p-button-text' onClick={deleteEmployee} />
        </>
      } onHide={hideDeletePersonalDialog}>
        <p>¿Está seguro de que desea eliminar al empleado <strong>{employee.nombre}</strong>?</p>
      </Dialog>
      <FloatingMenu />
    </div>
    </div>
  );
}

export default Personal;
