import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import {
  getUserById,
  updateUserPicture,
} from "../../utils/services/usersService";
import UserEditForm from "./UserEditForm";
import styles from "./user-info.module.css";
import { HiOutlinePhotograph } from "react-icons/hi";
import useToast from "../../hooks/useToast";
import Toast from "../../components/toast/Toast";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";
import {
  getUserProfilePicture,
  uploadImage,
} from "../../utils/services/imageService";
import { GetCloudinaryLink } from "../../utils/environment";
import Spinner from "../../components/spinner/Spinner";
import UserContext from "../../context/user-context";
import { userStorage } from "../../utils/services/storageService";

const UserInfo = () => {
  const modalTitle = "Updating information";

  const [targetUserId, permission] = useOutletContext();

  const [user, setUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageAsBinary, setUploadedImageAsBinary] = useState("");
  const [loggedUser, setLoggedUserData] = useContext(UserContext);

  const navigate = useNavigate();

  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  useEffect(() => {
    getUserById(targetUserId).then((res) => {
      setUser(res.data);
    });
  }, [targetUserId]);

  const handleUpdateUser = (success, updatedUser, errorMessage) => {
    if (success) {
      setUser(updatedUser);
      setToastConfig({
        severity: severityTypes.info,
        message: toastMessages.updatedUser,
      });
    } else {
      setToastConfig({
        severity: severityTypes.error,
        message: errorMessage,
      });
    }

    handleOpenToast();
    setOpenModal(false);
  };

  const handleFileChange = (event) => {
    const binary = event.target.files[0];
    setUploadedImageAsBinary(binary);
  };

  const handleSaveImage = () => {
    let newPictureUrl;
    /**
     * First uploading image to cloudinary
     * then we get img id from the cloudinary api and generate an img url
     * then send put request to th server, to update user profile picture url
     */
    setIsLoading(true);
    uploadImage(uploadedImageAsBinary)
      .then((res) => {
        //get new pic url from cloudinary
        newPictureUrl = GetCloudinaryLink(res.data.public_id);

        //set picture to storage
        getUserProfilePicture(targetUserId).then((res) => {
          const profilePictureUrl = res.data;
          if (profilePictureUrl) {
            userStorage.saveUserProfilePictureUrl(profilePictureUrl);
          }
        });

        //set picture to context
        setLoggedUserData((prev) => ({
          ...prev,
          profilePictureUrl: newPictureUrl,
        }));

        //update in server
        updateUserPicture(targetUserId, newPictureUrl).then((res) => {
          setUploadedImageAsBinary("");

          setUser((prev) => ({
            ...prev,
            profilePicture: newPictureUrl,
          }));

          //config and open toast
          setToastConfig({
            severity: severityTypes.success,
            message: toastMessages.updatedProfilePicture,
          });
          handleOpenToast();
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleDiscardImage = () => {
    setUploadedImageAsBinary("");
  };

  const handleSendMessage = () => {
    navigate(`/messages/${targetUserId}`);
  };

  const userProfilePicture = (function () {
    let src = "";
    if (uploadedImageAsBinary) {
      src = URL.createObjectURL(uploadedImageAsBinary);
    } else if (user.profilePicture) {
      src = user.profilePicture;
    } else {
      src = "/user-icon.svg";
    }

    return (
      <img
        className={styles["user-profile-picture"]}
        src={src}
        alt="User profile"
      />
    );
  })();

  const userOperations = (function () {
    if (isLoading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else if (permission && uploadedImageAsBinary) {
      return (
        <div>
          <Button onClick={handleSaveImage} buttonStyle="btn-secondary">
            Save
          </Button>
          <Button onClick={handleDiscardImage} buttonStyle="btn-danger">
            Discard
          </Button>
        </div>
      );
    } else if (permission) {
      return (
        <div>
          <Button onClick={setOpenModal.bind(null, true)}>Edit profile</Button>
          {loggedUser.userId !== targetUserId && (
            <Button onClick={handleSendMessage}>Send message</Button>
          )}
        </div>
      );
    }
    return (
      <div>
        <Button onClick={handleSendMessage}>Send message</Button>
      </div>
    );
  })();

  const personalInfo = (
    <ul className={styles["user-info-top-ul"]}>
      <li
        className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
      >
        <label className="col-4">Date of joining</label>
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
          <label className="col-4">First name</label>
          <p className="col-4 mb-1">{user.firstName}</p>
        </li>
      )}
      {user.lastName && (
        <li
          className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
        >
          <label className="col-4">Last name</label>
          <p className="col-4 mb-1">{user.lastName}</p>
        </li>
      )}
      {user.phoneNumber && (
        <li
          className={`${styles["user-info-top-li"]} row justify-content-flex-start`}
        >
          <label className="col-4">Phone number</label>
          <p className="col-4 mb-1">{user.phoneNumber}</p>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      {openModal && (
        <Modal title={modalTitle} onConfirm={setOpenModal.bind(null, false)}>
          <UserEditForm
            user={user}
            onUserUpdate={handleUpdateUser}
            onCancel={setOpenModal.bind(null, false)}
          />
        </Modal>
      )}
      <article className={styles["user-info"]}>
        <section className={styles["user-info-top"]}>
          <div className={styles["user-picture-section"]}>
            <div className={styles["user-picture"]}>
              {permission && (
                <>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className={`${styles["img-input"]} `}
                    onChange={handleFileChange}
                  />
                  <label
                    title="Upload photo"
                    htmlFor="file"
                    className={styles["change-picture-span"]}
                  >
                    <HiOutlinePhotograph />
                  </label>
                </>
              )}
              {userProfilePicture}
            </div>
          </div>
          <div className={styles["user-text-info"]}>
            <h6 className={styles["user-heading"]}>Personal info</h6>
            {personalInfo}
          </div>
        </section>

        <section className={styles["user-info-bottom"]}>
          {user.description && (
            <>
              <h6 className={styles["user-heading"]}>About</h6>
              <p className={styles["user-description"]}>{user.description}</p>
            </>
          )}
          {userOperations}
        </section>
      </article>
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </Fragment>
  );
};
export default UserInfo;
