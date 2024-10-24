import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/my-blogs"}>My Blogs</NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
