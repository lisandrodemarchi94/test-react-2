import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = ({ isLogged }) => {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/my-blogs", label: "Mis Blogs" },
  ];

  const loggedLinks = [
    { to: "/new-post", label: "Nuevo Blog", className: "link-end" },
    { to: "/logout", label: "Cerrar sesión", className: "link-end" },
  ];

  return (
    <nav className="topnav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {link.label}
        </NavLink>
      ))}
      {isLogged &&
        loggedLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${link.className} ${isActive ? "active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
    </nav>
  );
};

export default Header;
