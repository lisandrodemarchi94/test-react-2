import { useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";

import "./LoginPage.css";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginError, loginFn, loginLoading } = useLogin();

    const handleClickLogin = () => {
        if (email && password) {
            loginFn({ email, password });
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Iniciar sesión</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button
                    disabled={!email || !password}
                    onClick={handleClickLogin}
                >
                    {loginLoading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
                {loginError && (
                    <p className="text-danger">Ócurrio un error al iniciar sesion.</p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;