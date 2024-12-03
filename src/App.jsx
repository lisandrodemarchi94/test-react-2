import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AddBlog, AuthorsPage } from './pages';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";
import Login from "./pages/login/Login";
import { useLocation } from "react-router-dom";
import { useAuth } from "./hooks/auth/useAuth";
import Unauthorized from "./pages/Unauthorized";
import BlogsPage from "./pages/blogs/BlogsPage";
import ROUTES from "./consts/routes";
import LogoutPage from "./pages/logout/LogoutPage";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const { ADD_BLOG, AUTHORS, BLOGS, HOME, LOGIN, UNAUTHORIZED, NOT_FOUND, LOGOUT } = ROUTES;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
        <ToastContainer position="bottom-right" closeButton={false} />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { token } = useAuth();
  const isLogged = Boolean(token);

  const shouldShowHeaderFooter = isLogged && location.pathname !== "/login";

  return (
    <div className="container">
      {shouldShowHeaderFooter && <Header />}
      <div className="content">
        <Routes>

          <Route element={<PublicRoute />}>
            <Route path={LOGIN} element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={HOME} element={<>Bienvenidos!</>} />
            <Route path={BLOGS} element={<BlogsPage />} />
            <Route path={ADD_BLOG} element={<AddBlog />} />
            <Route path={LOGOUT} element={<LogoutPage />} />
          </Route>

          <Route element={<RoleRoute requiredRole="admin" />}>
            <Route path={AUTHORS} element={<AuthorsPage />} />
          </Route>

          <Route path={UNAUTHORIZED} element={<Unauthorized />} />
          <Route path={NOT_FOUND} element={<NotFoundPage />} />

        </Routes>
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
