import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = () => {
    // Implementar lógica de registro aquí
    console.log('Usuario:', username);
    console.log('Correo Electrónico:', email);
    console.log('Contraseña:', password);
    console.log('Confirmar Contraseña:', confirmPassword);
    console.log('Términos Aceptados:', termsAccepted);
  };

  return (
    <div className='register-container'>
      <Link to='/' className='p-button p-component p-button-secondary home-button'>
        <span className='p-button-icon pi pi-arrow-left'></span>
        <span className='p-button-label'>Volver a Inicio</span>
      </Link>
      <Card title='Registrarse' className='register-card' style={{ width: '25rem', margin: '0 auto', padding: '2rem' }}>
        <div className='p-field'>
          <label htmlFor='username'>Nombre de Usuario</label>
          <InputText id='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ingrese su nombre de usuario' className='register-input' />
        </div>
        <div className='p-field'>
          <label htmlFor='email'>Correo Electrónico</label>
          <InputText id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Ingrese su correo electrónico' className='register-input' />
        </div>
        <div className='p-field'>
          <label htmlFor='password'>Contraseña</label>
          <Password id='password' value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask placeholder='Ingrese su contraseña' className='register-input' />
        </div>
        <div className='p-field'>
          <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
          <Password id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false} toggleMask placeholder='Confirme su contraseña' className='register-input' />
        </div>
        <div className='p-field-checkbox'>
          <Checkbox inputId='termsAccepted' checked={termsAccepted} onChange={(e) => setTermsAccepted(e.checked)} />
          <label htmlFor='termsAccepted'>Acepto los términos y condiciones</label>
        </div>
        <Button label='Registrarse' className='p-button-primary register-button' onClick={handleRegister} />
      </Card>
    </div>
  );
}

export default Register;
