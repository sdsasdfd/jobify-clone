import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/Dashboard";
import Navlinks from "./Navlinks";

const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
