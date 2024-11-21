import { useState } from 'react';
import { useLogin } from '../../hooks/auth/useLogin';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginFn, loginStateError, loginStateLoading } = useLogin();

    const handleLogin = () => {
        if (email && password) {
            loginFn({ email, password });
        }
    }

    return (
        <div className='login-container'>
            <div className='login-content'>
                <h2>Iniciar sesión</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} disabled={loginStateLoading}>
                    {loginStateLoading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
                {loginStateError && (
                    <p className='text-danger'>Ócurrio un error</p>
                )}
            </div>
        </div>
    );
};

export default Login;
