import styles from "./admin.module.css";
import { adminNavItems } from "../../utils/adminNavItems";
import SearchBar from "../../components/searchbar/SearchBar";
const AdminNav = (props) => {
  const handleNavClick = (value) => {
    props.setSelectedNavItem(value);
  };
  return (
    <nav className={styles["admin-page-nav"]}>
      <div className="d-flex justify-content-between">
        <ul className={`${styles["admin-ul"]} d-flex align-items-end`}>
          <li
            className={
              props.selectedNavItem === adminNavItems.exercises &&
              `${styles["active-li"]}`
            }
            onClick={() => handleNavClick(adminNavItems.exercises)}
          >
            Exercises
          </li>
          <li
            className={
              props.selectedNavItem === adminNavItems.other &&
              `${styles["active-li"]}`
            }
            onClick={() => handleNavClick(adminNavItems.other)}
          >
            {" "}
            Other
          </li>
        </ul>
        {props.selectedNavItem === adminNavItems.exercises && (
          <SearchBar
            placeholder={"Find Exercise"}
            ref={props.searchParamsInputRef}
            handleSearchParams={props.handleSearchParams}
          />
        )}
      </div>
    </nav>
  );
};
export default AdminNav;
