import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = ({ isLogged }) => {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/authors", label: "Autores" },
  ];

  const loggedLinks = [
    { to: "/new-blog", label: "Nuevo Blog" },
    { to: "/logout", label: "Cerrar sesión" },
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
        {isLogged &&
          loggedLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
      </div>
    </nav>
  );
};

export default Header;
