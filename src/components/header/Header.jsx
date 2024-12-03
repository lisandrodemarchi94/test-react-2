import { NavLink } from "react-router-dom";
import ROUTES from "../../consts/routes";

import "./Header.css";

const { ADD_BLOG, AUTHORS, BLOGS, LOGOUT } = ROUTES;

const Header = () => {

  const links = [
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
      <div className="link-end">
        <NavLink
          key={LOGOUT}
          to={LOGOUT}
        >
          Cerrar sesión
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
