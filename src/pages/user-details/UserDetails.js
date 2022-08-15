import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getUserById } from "../../utils/services/usersService";
import { hasPermision } from "../../utils/services/authService";
import pageStyles from "../../styles/page.module.css";
import styles from "./user-details.module.css";
import UserNav from "./UserNav";

function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [permision, setPermision] = useState(false);

  useEffect(() => {
    setPermision(hasPermision(params.id));
    getUserById(params.id).then((response) => setUser(response.data));
    
  }, [params.id, permision]);

  return (
    <div className={pageStyles["page"]}>
      <h4 className={pageStyles["page-title"]}>{user?.email}'s Details</h4>
      <div className={styles["user-details"]}>
        <section className={styles["user-nav-section"]}>
          <UserNav permision={permision} />
        </section>
        <section className={styles["user-content-section"]}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
export default UserDetails;
