import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Implementar lógica de autenticación aquí
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    console.log('Recordarme:', rememberMe);
  };

  return (
    <div className='login-container'>
      <Link to='/' className='p-button p-component p-button-secondary home-button'>
        <span className='p-button-icon pi pi-arrow-left'></span>
        <span className='p-button-label'>Volver a Inicio</span>
      </Link>
      <Card title='Iniciar Sesión' className='login-card' style={{ width: '25rem', margin: '0 auto', padding: '2rem' }}>
        <div className='p-field'>
          <label htmlFor='username'>Nombre de Usuario</label>
          <InputText id='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ingrese su nombre de usuario' className='login-input' />
        </div>
        <div className='p-field'>
          <label htmlFor='password'>Contraseña</label>
          <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask placeholder='Ingrese su contraseña' className='p-password' />
        </div>
        <div className='forgot-password'>
          <a href='#'>¿Olvidaste tu contraseña?</a>
        </div>
        <div className='p-field-checkbox'>
          <Checkbox inputId='rememberMe' checked={rememberMe} onChange={(e) => setRememberMe(e.checked)} />
          <label htmlFor='rememberMe'>Recordarme</label>
        </div>
        <Button label='Iniciar Sesión' className='p-button-primary login-button' onClick={() => navigate('/adminDashboard')} />
      </Card>
    </div>
  );
}

export default Login;
