import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = ({ isLogged }) => {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/my-blogs", label: "Mis Blogs" },
  ];

  const loggedLinks = [
    { to: "/new-post", label: "Nuevo Blog" },
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
