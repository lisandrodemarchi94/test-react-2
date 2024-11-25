import { useState } from "react";
import { useRegister } from "../../hooks/auth/useRegister";

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const { register, registerError, registerLoading } = useRegister();
    // registerData

    const handleClickRegister = () => {
        if (email && password && role) {
            register({ email, password, role });
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Registrar usuario</h2>
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
                <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button
                    disabled={!email || !password || !role}
                    onClick={handleClickRegister}
                >
                    {registerLoading ? 'Cargando...' : 'Registrar usuario'}
                </button>
                {registerError && (
                    <p className="text-danger">Ócurrio un error al registrar nuevo usuario.</p>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;