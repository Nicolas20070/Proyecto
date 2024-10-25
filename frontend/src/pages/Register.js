import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../styles/Register.css';

function RegisteredUsers() {
  const [users, setUsers] = useState([
    { id: 1, usuario: 'admin', email: 'admin@example.com', rol: 'Administrador' },
    { id: 2, usuario: 'usuario1', email: 'user1@example.com', rol: 'Usuario' },
    { id: 3, usuario: 'usuario2', email: 'user2@example.com', rol: 'Usuario' },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToView, setUserToView] = useState(null);

  const roles = [
    { label: 'Todos', value: null },
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Usuario', value: 'Usuario' }
  ];

  const onEditUser = (user) => {
    setUserToEdit(user);
    setShowEditDialog(true);
  };

  const onViewUser = (user) => {
    setUserToView(user);
    setShowInfoDialog(true);
  };

  const onDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const dialogFooter = (
    <div>
      <Button label="Cerrar" icon="pi pi-times" onClick={() => setShowInfoDialog(false)} className="p-button-text" />
    </div>
  );

  const editDialogFooter = (
    <div>
      <Button label="Guardar" icon="pi pi-check" onClick={() => setShowEditDialog(false)} className="p-button-primary" />
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowEditDialog(false)} className="p-button-secondary" />
    </div>
  );

  return (
    <div>
        <AuthenticatedHeader/>
        <FloatingMenu/>
        <div className='registered-users-container'>
          <h1>Usuarios Registrados</h1>
          <div className='datatable-toolbar'>
            <span className='p-input-icon-left'>
              <i className='pi pi-search' />
              <InputText type='search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder='Buscar...' />
            </span>
            <Dropdown value={selectedRole} options={roles} onChange={(e) => setSelectedRole(e.value)} placeholder='Filtrar por Rol' />
          </div>
          <div className='datatable-wrapper'>
            <DataTable value={users} paginator rows={5} globalFilter={globalFilter} className='registered-users-table'>
              <Column field='usuario' header='Usuario' sortable></Column>
              <Column field='email' header='Correo Electrónico' sortable></Column>
              <Column field='rol' header='Rol' sortable></Column>
              <Column
                header='Acciones'
                body={(rowData) => (
                  <div className='action-buttons'>
                    <Button icon='pi pi-eye' className='p-button-info' onClick={() => onViewUser(rowData)} />
                    <Button icon='pi pi-pencil' className='p-button-warning' onClick={() => onEditUser(rowData)} />
                    <Button icon='pi pi-trash' className='p-button-danger' onClick={() => onDeleteUser(rowData.id)} />
                  </div>
                )}
              ></Column>
            </DataTable>
          </div>

          <Dialog header='Detalles del Usuario' visible={showInfoDialog} style={{ width: '50vw' }} footer={dialogFooter} onHide={() => setShowInfoDialog(false)}>
            {userToView && (
              <div className='dialog-info'>
                <p><label>Usuario:</label> {userToView.usuario}</p>
                <p><label>Correo Electrónico:</label> {userToView.email}</p>
                <p><label>Rol:</label> {userToView.rol}</p>
              </div>
            )}
          </Dialog>

          <Dialog header='Editar Usuario' visible={showEditDialog} style={{ width: '60vw' }} footer={editDialogFooter} onHide={() => setShowEditDialog(false)}>
            {userToEdit && (
              <div className='dialog-edit-form'>
                <div className='form-field-wrapper'>
                  <div className='p-field'>
                    <label htmlFor='username'>Nombre de Usuario</label>
                    <InputText id='username' value={userToEdit.usuario} onChange={(e) => setUserToEdit({ ...userToEdit, usuario: e.target.value })} />
                  </div>
                  <div className='p-field'>
                    <label htmlFor='email'>Correo Electrónico</label>
                    <InputText id='email' value={userToEdit.email} onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })} />
                  </div>
                  <div className='p-field'>
                    <label htmlFor='rol'>Rol</label>
                    <Dropdown id='rol' value={userToEdit.rol} options={roles.filter(role => role.value !== null)} onChange={(e) => setUserToEdit({ ...userToEdit, rol: e.value })} placeholder='Seleccionar Rol' />
                  </div>
                </div>
              </div>
            )}
          </Dialog>
        </div>
    </div>
  );
}

export default RegisteredUsers;
