import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { hasPermision } from "../../utils/services/authService";
import pageStyles from "../../styles/page.module.css";
import styles from "./user-details.module.css";
import UserNav from "./UserNav";

function UserDetails() {
  const params = useParams();
  const [permision, setPermision] = useState(false);
  const [userId, setUserId] = useState(params.id);

  useEffect(() => {
    setUserId(params.id);
    setPermision(hasPermision(params.id));
  }, [params.id]);

  return (
    <div className={pageStyles["page"]}>
      <h4 className={pageStyles["page-title"]}>User Details</h4>
      <div className={styles["user-details"]}>
        <section className={styles["user-nav-section"]}>
          <UserNav permision={permision} />
        </section>
        <section className={styles["user-content-section"]}>
          <Outlet context={[userId, permision]} />
        </section>
      </div>
    </div>
  );
}
export default UserDetails;
