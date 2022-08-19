import styles from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/services/authService";
import tokenStorage from "../../../utils/services/tokenStorage";
import { ADMIN_ROLE } from "../../../utils/environment";
import NotificationLabel from "../../notification/NotificationLabel";
import { useContext } from "react";
import UserContext from "../../../context/user-context";

export function Header() {
  const userId = tokenStorage.decodeToken().nameid;
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);

  const handleNavClick = (isActive) => {
    let activeStyle = { backgroundColor: "" };
    activeStyle.backgroundColor = isActive
      ? "var(--primaryOp50)"
      : "transparent";
    return activeStyle;
  };
  const handleLogout = () => {
    //clear context, logout and navigate
    setUserData("");
    logout();
    navigate("login");
  };
  const handleWorkoutPlan = () => {
    const planId = localStorage.getItem("activePlanId");
    navigate(`/users/${userId}/workoutplan/${planId}`);
  };
  const handleProfile = () => {
    navigate(`/users/${userId}/info`);
  };

  const getAdminLinks = () => {
    const user = tokenStorage.decodeToken();
    if (user?.role === ADMIN_ROLE) {
      return (
        <li>
          <NavLink
            style={({ isActive }) => handleNavClick(isActive)}
            to="/admin"
          >
            Admin
          </NavLink>
        </li>
      );
    }
  };
  const userImg = userData.profilePictureUrl ? (
    <img
      className={styles["user-img"]}
      src={userData.profilePictureUrl}
      alt=""
    />
  ) : (
    <img src="/user-icon.svg" alt="" />
  );

  return (
    <div className={styles.navbar}>
      <div>
        <ul>
          <li>
            <NavLink exact to="/">
              <img src="/dumbell.svg" alt="" />
            </NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => handleNavClick(isActive)} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => handleNavClick(isActive)}
              to="/users"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => handleNavClick(isActive)}
              to="/personalize"
            >
              Get plan
            </NavLink>
          </li>
          {getAdminLinks()}
        </ul>
      </div>
      <div className={styles["user-items"]}>
        <NotificationLabel />
        <div className={styles.dropdown}>
          <a href="#" onClick={handleProfile}>
            {userImg}
          </a>
          <div>
            <a onClick={handleProfile}>Profile</a>
            <a onClick={handleWorkoutPlan}>My plan</a>
            <a onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
}
