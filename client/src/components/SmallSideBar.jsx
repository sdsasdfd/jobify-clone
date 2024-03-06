import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo.jsx";
import { useDashboardContext } from "../pages/Dashboard.jsx";
import Navlinks from "./Navlinks.jsx";

const SmallSideBar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
            <Navlinks />
          </header>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
