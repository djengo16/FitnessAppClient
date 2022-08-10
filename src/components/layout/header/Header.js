import styles from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/services/authService";
import tokenStorage from "../../../utils/services/tokenStorage";
import { ADMIN_ROLE } from "../../../utils/environment";
import NotificationLabel from "../../notification/NotificationLabel";

export function Header() {
  const navigate = useNavigate();

  const handleNavClick = (isActive) => {
    let activeStyle = { backgroundColor: "" };
    activeStyle.backgroundColor = isActive
      ? "var(--primaryOp50)"
      : "transparent";
    return activeStyle;
  };

  const handleLogout = () => {
    logout();
    navigate("login");
  };
  const handleWorkoutPlan = () => {
    const userId = tokenStorage.decodeToken().nameid;
    const planId = localStorage.getItem("activePlanId");
    navigate(`/users/${userId}/workoutplan/${planId}`);
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
          <a href="#">
            <img src="/user-icon.svg" alt="" />
          </a>
          <div>
            <a onClick={handleLogout}>Logout</a>
            <a onClick={handleWorkoutPlan}>My plan</a>
          </div>
        </div>
      </div>
    </div>
  );
}
