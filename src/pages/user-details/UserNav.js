import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosFitness } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./user-nav.module.css";

const userNavs = [
  {
    id: 1,
    content: "Infomation",
    path: "info",
    private: false,
    icon: <AiOutlineInfoCircle />,
  },
  {
    id: 2,
    content: "Change Password",
    path: "changepassword",
    private: true,
    icon: <RiLockPasswordLine />,
  },
  {
    id: 3,
    content: "Workout plans",
    path: "workoutplans",
    private: true,
    icon: <IoIosFitness />,
  },
];

const UserNav = ({ permission }) => {
  const { pathname } = useLocation();
  const active = pathname.split("/").pop();

  return (
    <nav className={styles["user-nav"]}>
      <ul className={styles["user-ul"]}>
        {userNavs.map((nav) => {
          if ((nav.private && permission) || !nav.private) {
            return (
              <li key={nav.id}>
                <NavLink
                  to={nav.path}
                  className={`${styles["user-link"]} ${
                    active === nav.path && styles["active-user-link"]
                  }`}
                >
                  {nav.content}
                  <span style={{ paddingLeft: ".5rem" }}>{nav.icon}</span>
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
