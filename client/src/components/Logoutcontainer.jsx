import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/Dashboard";

const Logoutcontainer = () => {
  const [showLogout, setShowLogout] = useState(false);

  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => setShowLogout(!showLogout)}
        className="btn logout-btn"
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button onClick={logoutUser} className="dropdown-btn">
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default Logoutcontainer;
