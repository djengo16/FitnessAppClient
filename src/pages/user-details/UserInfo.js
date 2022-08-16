import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../../components/button/Button";
import { getUserById } from "../../utils/services/usersService";
import styles from "./user-info.module.css";

const UserInfo = () => {
  const [userId, permision] = useOutletContext();
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(userId);
    getUserById(userId).then((res) => {
      setUser(res.data);
    });
  }, []);

  const userProfilePicture = user.profilePicture ? (
    <img
      className={styles["user-profile-picture"]}
      src={user.profilePicture}
      alt="User profile"
    />
  ) : (
    <img
      className={`${styles["user-profile-picture"]} ${styles["user-defatult-picture"]}`}
      src="/user-icon.svg"
      alt="User profile"
    />
  );

  const personalInfo = (
    <ul className={styles["user-info-top-ul"]}>
      <li
        className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
      >
        <label className="col-4">Date of join</label>
        <p className="col-4 mb-1">{user.registeredOn}</p>
      </li>
      <li
        className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
      >
        <label className="col-4">Email address</label>
        <p className="col-4 mb-1">{user.email}</p>
      </li>
      {user.firstName && (
        <li
          className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
        >
          <label className="col-4">FirstName</label>
          <p className="col-4 mb-1">{user.firstName}</p>
        </li>
      )}
      {user.lastName && (
        <li
          className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
        >
          <label className="col-4">LastName</label>
          <p className="col-4 mb-1">{user.lastName}</p>
        </li>
      )}
    </ul>
  );

  return (
    <article className={styles["user-info"]}>
      <section className={styles["user-info-top"]}>
        <div className={styles["user-picture"]}>{userProfilePicture}</div>
        <div className={styles["user-text-info"]}>
          <h6 className={styles["user-heading"]}>Personal info</h6>
          {personalInfo}
        </div>
      </section>
      {user.description && (
        <section className={styles["user-info-bottom"]}>
          <h6 className={styles["user-heading"]}>About</h6>
          <p className={styles["user-description"]}>{user.description}</p>
          {permision && <Button>Edit profile</Button>}
        </section>
      )}
    </article>
  );
};
export default UserInfo;
//{"id":"1289df60-06e9-4ad1-aa24-655490004565","email":"admin@sample.com","description":null,"profilePicture":null,"firstName":null,"lastName":null,"registeredOn":"1.1.0001 г."}
