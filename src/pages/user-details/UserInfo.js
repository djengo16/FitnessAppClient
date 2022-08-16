import { Fragment, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import { getUserById } from "../../utils/services/usersService";
import EditUserForm from "./EditUserForm";
import styles from "./user-info.module.css";
import { HiOutlinePhotograph } from "react-icons/hi";
const UserInfo = () => {
  const modalTitle = "Updating information";
  const [userId, permision] = useOutletContext();
  const [user, setUser] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getUserById(userId).then((res) => {
      setUser(res.data);
    });
  }, [userId]);

  const userProfilePicture = user.profilePicture ? (
    <img
      className={styles["user-profile-picture"]}
      src={user.profilePicture}
      alt="User profile"
    />
  ) : (
    <img
      className={` ${styles["user-defatult-picture"]}`}
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
    <Fragment>
      {openModal && (
        <Modal title={modalTitle} onConfirm={setOpenModal.bind(null, false)}>
          <EditUserForm
            user={user}
            setUser={setUser}
            onCancel={setOpenModal.bind(null, false)}
          />
        </Modal>
      )}
      <article className={styles["user-info"]}>
        <section className={styles["user-info-top"]}>
          <div className={styles["user-picture"]}>
            <div className={styles["user-profile-picture"]}>
              <span
                className={styles["change-picture-span"]}
                title="Upload photo"
              >
                <HiOutlinePhotograph />
              </span>
              {userProfilePicture}
            </div>
          </div>
          <div className={styles["user-text-info"]}>
            <h6 className={styles["user-heading"]}>Personal info</h6>
            {personalInfo}
          </div>
        </section>
        {user.description && (
          <section className={styles["user-info-bottom"]}>
            <h6 className={styles["user-heading"]}>About</h6>
            <p className={styles["user-description"]}>{user.description}</p>
            {permision && (
              <Button onClick={setOpenModal.bind(null, true)}>
                Edit profile
              </Button>
            )}
          </section>
        )}
      </article>
    </Fragment>
  );
};
export default UserInfo;
