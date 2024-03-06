import React from "react";
import Wrapper from "../assets/wrappers/Navbar.js";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "../components/Logo.jsx";
import { useDashboardContext } from "../pages/Dashboard.jsx";
import Logoutcontainer from "./Logoutcontainer.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />

          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <Logoutcontainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
