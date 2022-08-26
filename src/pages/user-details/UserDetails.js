import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { hasPermission } from "../../utils/services/authService";
import pageStyles from "../../styles/page.module.css";
import styles from "./user-details.module.css";
import UserNav from "./UserNav";

function UserDetails() {
  const params = useParams();
  const [permission, setPermission] = useState(false);
  const [targetUserId, setUserId] = useState(params.id);

  useEffect(() => {
    setUserId(params.id);
    setPermission(hasPermission(params.id));
  }, [params.id]);

  return (
    <div className={pageStyles["page"]}>
      <h4 className={pageStyles["page-title"]}>User Details</h4>
      <div className={styles["user-details"]}>
        <section className={styles["user-nav-section"]}>
          <UserNav permission={permission} />
        </section>
        <section className={styles["user-content-section"]}>
          <Outlet context={[targetUserId, permission]} />
        </section>
      </div>
    </div>
  );
}
export default UserDetails;
