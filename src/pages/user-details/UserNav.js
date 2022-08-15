import { NavLink, useLocation } from "react-router-dom";
import styles from "./user-nav.module.css";

const userNavs = [
  {
    id: 1,
    content: "Infomation",
    path: "info",
    private: false,
  },
  {
    id: 2,
    content: "Change Password",
    path: "changepassword",
    private: true,
  },
  {
    id: 3,
    content: "Workout plans",
    path: "workoutplans",
    private: true,
  },
];

const UserNav = ({ permision }) => {
  const { pathname } = useLocation();
  const active = pathname.split("/").pop();

  return (
    <nav className={styles["user-nav"]}>
      <ul className={styles["user-ul"]}>
        {userNavs.map((nav) => {
          if ((nav.private && permision) || !nav.private) {
            return (
              <li key={nav.id}>
                <NavLink
                  to={nav.path}
                  className={`${styles["user-link"]} ${
                    active === nav.path && styles["active-user-link"]
                  }`}
                >
                  {" "}
                  {nav.content}{" "}
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};
export default UserNav;
