import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import FloatingMenu from '../../components/FloatingMenu';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/RegisteredUsers.css';

function RegisteredUsers() {
  const [users, setUsers] = useState([]);
  const [userDialog, setUserDialog] = useState(false);
  const [viewUserDialog, setViewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rolFiltro, setRolFiltro] = useState(null);
  const [estadoFiltro, setEstadoFiltro] = useState(null);
  const [newUser, setNewUser] = useState({
    usuario: '', email: '', rol: 'Empleado', telefono: '', estado: 'Activo'
  });

  const roles = [
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Cliente', value: 'Cliente' },
    { label: 'Empleado', value: 'Empleado' },
  ];

  const estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
  ];

  useEffect(() => {
    setUsers([
      { usuario_id: 1, usuario: 'admin', email: 'admin@example.com', rol: 'Administrador', telefono: '123456789', estado: 'Activo' },
      { usuario_id: 2, usuario: 'cliente1', email: 'cliente1@example.com', rol: 'Cliente', telefono: '987654321', estado: 'Inactivo' },
      { usuario_id: 3, usuario: 'empleado1', email: 'empleado1@example.com', rol: 'Empleado', telefono: '456123789', estado: 'Activo' },
      { usuario_id: 4, usuario: 'cliente2', email: 'cliente2@example.com', rol: 'Cliente', telefono: '321654987', estado: 'Activo' },
      { usuario_id: 5, usuario: 'empleado2', email: 'empleado2@example.com', rol: 'Empleado', telefono: '741852963', estado: 'Inactivo' },
      { usuario_id: 6, usuario: 'admin2', email: 'admin2@example.com', rol: 'Administrador', telefono: '852963741', estado: 'Activo' },
      { usuario_id: 7, usuario: 'cliente3', email: 'cliente3@example.com', rol: 'Cliente', telefono: '159753486', estado: 'Inactivo' },
      { usuario_id: 8, usuario: 'empleado3', email: 'empleado3@example.com', rol: 'Empleado', telefono: '753159486', estado: 'Activo' },
    ]);
  }, []);

  const hideUserDialog = () => {
    setUserDialog(false);
  };

  const hideViewUserDialog = () => {
    setViewUserDialog(false);
  };

  const openNewUserDialog = () => {
    setNewUser({ usuario: '', email: '', rol: 'Empleado', telefono: '', estado: 'Activo' });
    setUserDialog(true);
  };

  const saveUser = () => {
    setUsers([...users, { ...newUser, usuario_id: users.length + 1 }]);
    setUserDialog(false);
  };

  const viewUser = (user) => {
    setSelectedUser(user);
    setViewUserDialog(true);
  };

  const filteredUsers = users.filter(user => 
    (!rolFiltro || user.rol === rolFiltro) &&
    (!estadoFiltro || user.estado === estadoFiltro)
  );

  const header = (
    <div className="table-header">
      <Button icon="pi pi-plus"  className="p-button-success" onClick={openNewUserDialog} />
      <Dropdown
        value={rolFiltro}
        options={roles}
        onChange={(e) => setRolFiltro(e.value)}
        placeholder="Filtrar por Rol"
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
        placeholder="Buscar Usuario..."
        className="p-input-icon-left"
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div className="action-buttons">
      <Button icon="pi pi-eye" className="p-button-rounded p-button-info" onClick={() => viewUser(rowData)} />
    </div>
  );

  return (
    <div>
      <AuthenticatedHeader />
      <div className="registered-users-container">

        <DataTable value={filteredUsers} paginator rows={4} globalFilter={globalFilter} header={header} emptyMessage="No se encontraron usuarios">
          <Column field="usuario" header="Usuario" sortable />
          <Column field="email" header="Correo Electrónico" sortable />
          <Column field="rol" header="Rol" sortable />
          <Column field="telefono" header="Teléfono" sortable />
          <Column field="estado" header="Estado" sortable />
          <Column body={actionTemplate} header="Acciones" />
        </DataTable>

        {/* Dialogo para agregar nuevo empleado */}
        <Dialog visible={userDialog} header="Nuevo Empleado" modal style={{ width: '50vw' }} onHide={hideUserDialog}>
          <div className="form-grid">
            <div className="p-field">
              <label htmlFor="usuario">Usuario</label>
              <InputText id="usuario" value={newUser.usuario} onChange={(e) => setNewUser({ ...newUser, usuario: e.target.value })} required autoFocus />
            </div>
            <div className="p-field">
              <label htmlFor="email">Correo Electrónico</label>
              <InputText id="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
            </div>
            <div className="p-field">
              <label htmlFor="telefono">Teléfono</label>
              <InputText id="telefono" value={newUser.telefono} onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })} />
            </div>
            <div className="p-field">
              <label htmlFor="estado">Estado</label>
              <Dropdown id="estado" value={newUser.estado} options={estados} onChange={(e) => setNewUser({ ...newUser, estado: e.value })} placeholder="Seleccione estado" />
            </div>
          </div>
          <div className="dialog-footer">
            <Button label="Cancelar" icon="pi pi-times" onClick={hideUserDialog} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveUser} />
          </div>
        </Dialog>

        {/* Dialogo para ver detalle de usuario */}
        <Dialog visible={viewUserDialog} header="Detalle del Usuario" modal style={{ width: '50vw' }} onHide={hideViewUserDialog}>
          {selectedUser && (
            <div>
              <p><strong>Usuario:</strong> {selectedUser.usuario}</p>
              <p><strong>Correo Electrónico:</strong> {selectedUser.email}</p>
              <p><strong>Rol:</strong> {selectedUser.rol}</p>
              <p><strong>Teléfono:</strong> {selectedUser.telefono}</p>
              <p><strong>Estado:</strong> {selectedUser.estado}</p>
              <Button label="Cerrar" icon="pi pi-times" onClick={hideViewUserDialog} />
            </div>
          )}
        </Dialog>
      </div>
      <FloatingMenu />
    </div>
  );
}

export default RegisteredUsers;
