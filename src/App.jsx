import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AddBlog, AuthorsPage, Home } from './pages';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/login/LoginPage";
import { useAuth } from "./hooks/auth/useAuth";
import ROUTES from "./consts/routes";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";
import LogoutPage from "./pages/logout/LogoutPage";
import RegisterPage from "./pages/register/RegisterPage";

import "./App.css";

const { ADD_BLOG, AUTHORS, HOME, LOGIN, NOT_FOUND, UNAUTHORIZED, LOGOUT, REGISTER } = ROUTES;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

function AppContent() {
  const location = useLocation();
  const { token } = useAuth();
  const isLogged = Boolean(token);

  const showHeaderFooter = isLogged && location.pathname !== ROUTES.LOGIN;

  return (
    <div className="container">
      {showHeaderFooter && <Header isLogged={true} />}
      <div className="content">
        <Routes>

          <Route element={<PublicRoute />}>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={REGISTER} element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={HOME} element={<Home />} />
            <Route path={ADD_BLOG} element={<AddBlog />} />
            <Route path={LOGOUT} element={<LogoutPage />} />
          </Route>

          <Route element={<RoleRoute requiredRole="admin" />}>
            <Route path={AUTHORS} element={<AuthorsPage />} />
          </Route>

          <Route path={UNAUTHORIZED} element={<>No se posee permisos</>} />
          <Route path={NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;


