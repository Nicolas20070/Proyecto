import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import '../../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tipoDocumento: null,
    numeroDocumento: '',
    numeroTelefono: '',
    email: '',
    nombreUsuario: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const tiposDocumento = [
    { label: 'Cédula de Ciudadanía', value: 'Cedula' },
    { label: 'Tarjeta de Identidad', value: 'Tarjeta' },
    { label: 'Cédula de Extranjería', value: 'Extranjeria' },
    { label: 'Pasaporte', value: 'Pasaporte' }
  ];

  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='register-container'>
      <Link to='/' className='p-button p-component p-button-secondary home-button'>
        <span className='p-button-icon pi pi-arrow-left'></span>
        <span className='p-button-label'>Volver a Inicio</span>
      </Link>

      <Card title='Registrarse' className='register-card'>
        <div className='p-field'>
          <label htmlFor='nombre'>Nombre</label>
          <InputText id='nombre' value={formData.nombre} onChange={(e) => handleInputChange(e, 'nombre')} placeholder='Ingrese su nombre' />
        </div>

        <div className='p-field'>
          <label htmlFor='apellido'>Apellido</label>
          <InputText id='apellido' value={formData.apellido} onChange={(e) => handleInputChange(e, 'apellido')} placeholder='Ingrese su apellido' />
        </div>

        <div className='p-field'>
          <label htmlFor='tipoDocumento'>Tipo de Documento</label>
          <Dropdown id='tipoDocumento' value={formData.tipoDocumento} options={tiposDocumento} onChange={(e) => handleInputChange(e, 'tipoDocumento')} placeholder='Seleccione tipo de documento' />
        </div>

        <div className='p-field'>
          <label htmlFor='numeroDocumento'>Número de Documento</label>
          <InputText id='numeroDocumento' value={formData.numeroDocumento} onChange={(e) => handleInputChange(e, 'numeroDocumento')} placeholder='Ingrese el número de documento' />
        </div>

        <div className='p-field'>
          <label htmlFor='numeroTelefono'>Número de Teléfono</label>
          <InputText id='numeroTelefono' value={formData.numeroTelefono} onChange={(e) => handleInputChange(e, 'numeroTelefono')} placeholder='Ingrese su número de teléfono' />
        </div>

        <div className='p-field'>
          <label htmlFor='email'>Correo Electrónico</label>
          <InputText id='email' value={formData.email} onChange={(e) => handleInputChange(e, 'email')} placeholder='Ingrese su correo electrónico' />
        </div>

        <div className='p-field'>
          <label htmlFor='nombreUsuario'>Nombre de Usuario</label>
          <InputText id='nombreUsuario' value={formData.nombreUsuario} onChange={(e) => handleInputChange(e, 'nombreUsuario')} placeholder='Ingrese su nombre de usuario' />
        </div>

        <div className='p-field'>
          <label htmlFor='contrasena'>Contraseña</label>
          <Password id='contrasena' value={formData.contrasena} onChange={(e) => handleInputChange(e, 'contrasena')} placeholder='Ingrese su contraseña' feedback={false} toggleMask />
        </div>

        <div className='p-field'>
          <label htmlFor='confirmarContrasena'>Confirmar Contraseña</label>
          <Password id='confirmarContrasena' value={formData.confirmarContrasena} onChange={(e) => handleInputChange(e, 'confirmarContrasena')} placeholder='Confirme su contraseña' feedback={false} toggleMask />
        </div>

        <Button label='Registrarse' className='p-button-primary register-button' />
      </Card>
    </div>
  );
}

export default Register;
