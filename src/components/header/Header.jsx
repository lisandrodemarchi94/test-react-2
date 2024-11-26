import { NavLink } from "react-router-dom";
import ROUTES from "../../consts/routes";

import "./Header.css";

const { ADD_BLOG, AUTHORS, BLOGS, HOME, LOGOUT } = ROUTES;

const Header = () => {

  const links = [
    { to: HOME, label: "Inicio" },
    { to: BLOGS, label: "Blogs" },
    { to: AUTHORS, label: "Autores" },
    { to: ADD_BLOG, label: "Nuevo Blog" },
  ];

  return (
    <nav className="topnav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
        >
          {link.label}
        </NavLink>
      ))}
      <div className={'link-end'}>
        <NavLink
          to={LOGOUT}
        >
          Cerrar sesión
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
