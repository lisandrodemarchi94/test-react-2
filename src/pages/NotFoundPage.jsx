import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404</h1>
            <h2>Página No Encontrada</h2>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;
