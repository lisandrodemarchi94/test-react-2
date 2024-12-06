import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    const login = (newToken, newRole) => {
        setToken(newToken);
        setRole(newRole);
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('role', newRole);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;