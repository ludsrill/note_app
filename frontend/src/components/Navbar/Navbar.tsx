import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
const NavBar = () => {
  return (
    <Nav>
      <NavMenu>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/add-task">
          Add Task
        </NavLink>
        <NavLink to="/registration">
          Registration
        </NavLink>
      </NavMenu>
    </Nav >
  );
}

export default NavBar