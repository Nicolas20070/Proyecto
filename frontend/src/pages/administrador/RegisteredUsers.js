import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import '../../styles/AdminDashboard.css';

function RegisteredUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Simular llamada a API para obtener los usuarios registrados
        const fetchedUsers = [
            { id: 1, username: 'admin', email: 'admin@example.com', role: 'Administrador' },
            { id: 2, username: 'usuario1', email: 'user1@example.com', role: 'Usuario' },
            { id: 3, username: 'usuario2', email: 'user2@example.com', role: 'Usuario' },
        ];
        setUsers(fetchedUsers);
    }, []);

    const deleteUser = (userId) => {
        // Implementar lógica para eliminar usuario
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => deleteUser(rowData.id)} />
        );
    };

    return (
        <div className='registered-users-container'>
            <AuthenticatedHeader />
            <h1>Usuarios Registrados</h1>
            <div className='datatable-wrapper'>
                <DataTable value={users} paginator rows={5} className='registered-users-table'>
                    <Column field='username' header='Usuario' />
                    <Column field='email' header='Correo Electrónico' />
                    <Column field='role' header='Rol' />
                    <Column body={actionBodyTemplate} header='Acciones' />
                </DataTable>
            </div>
        </div>
    );
}

export default RegisteredUsers;
