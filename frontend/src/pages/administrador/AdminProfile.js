import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AuthenticatedHeader from '../../components/AuthenticatedHeader';
import FloatingMenu from '../../components/FloatingMenu';
import '../../styles/AdminProfile.css';

function AdminProfile() {
    const [editDialog, setEditDialog] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@example.com',
        phone: '123-456-7890',
        address: 'Calle Falsa 123, Ciudad, País'
    });
    const [editedProfile, setEditedProfile] = useState({ ...profile });

    const openEditDialog = () => {
        setEditedProfile({ ...profile });
        setEditDialog(true);
    };

    const hideEditDialog = () => {
        setEditDialog(false);
    };

    const saveProfile = () => {
        setProfile({ ...editedProfile });
        setEditDialog(false);
    };

    return (
        <div className='admin-profile-container'>
            <AuthenticatedHeader />
            <FloatingMenu/>
            <section className='profile-section'>
                <Card title='Perfil del Administrador' className='profile-card'>
                    <div className='profile-details'>
                        <p><strong>Nombre:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Teléfono:</strong> {profile.phone}</p>
                        <p><strong>Dirección:</strong> {profile.address}</p>
                    </div>
                    <Button label='Editar Perfil' className='p-button-primary' onClick={openEditDialog} />
                </Card>
            </section>

            <Dialog header='Editar Perfil' visible={editDialog} style={{ width: '30vw' }} onHide={hideEditDialog}>
                <div className='edit-profile-dialog'>
                    <div className='p-field'>
                        <label htmlFor='name'>Nombre</label>
                        <InputText id='name' value={editedProfile.name} onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor='email'>Email</label>
                        <InputText id='email' value={editedProfile.email} onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor='phone'>Teléfono</label>
                        <InputText id='phone' value={editedProfile.phone} onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor='address'>Dirección</label>
                        <InputText id='address' value={editedProfile.address} onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })} />
                    </div>
                    <div className='dialog-footer'>
                        <Button label='Cancelar' icon='pi pi-times' onClick={hideEditDialog} className='p-button-text' />
                        <Button label='Guardar' icon='pi pi-check' onClick={saveProfile} autoFocus />
                    </div>
                </div>
            </Dialog>

        </div>
    );
}

export default AdminProfile;
