/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useState } from "react";
import styles from "./notification.module.css";
import {
  getTrainingNotification,
  viewNotificationRequest,
} from "../../utils/services/notificationService";
import tokenStorage from "../../utils/services/tokenStorage";
import { timeSince } from "../../utils/services/dateService";
import { getUserActivePlanId } from "../../utils/services/usersService";
import { useNavigate } from "react-router-dom";

const NotificationLabel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  let navigate = useNavigate();
  const userId = tokenStorage.decodeToken()?.nameid;
  const fiveMinutesInMiliseconds = 1000 * 60 * 10;

  const getNotifications = useCallback(() => {
    getTrainingNotification(userId).then((response) => {
      const data = response.data;
      if (data.isViewed) {
        return;
      }
      const possibleDuplication = notifications.find((x) => x.id === data.id);

      if (data && !possibleDuplication)
        setNotifications((prev) => {
          prev.unshift(data);
          return [...prev];
        });
    });
  }, [notifications, userId]);

  useEffect(() => {
    if (isFirstRender) {
      getNotifications();
      setIsFirstRender(false);
    }
    const interval = setInterval(
      () => getNotifications(),
      fiveMinutesInMiliseconds
    );

    return () => clearInterval(interval);
  }, [getNotifications, fiveMinutesInMiliseconds, isFirstRender]);

  const handleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const viewNotification = (id) => {
    const notificationToView = notifications.find((x) => x.id === id);

    if (notificationToView.type === 0) {
      //clean notification
      viewNotificationRequest(id).then((res) => {
        setNotifications((prev) => prev.filter((x) => x.id !== id));
      });

      //redirect to target
      getUserActivePlanId(userId).then((response) => {
        navigate(`/users/${userId}/workoutplan/${response.data}`);
      });
    }
  };

  return (
    <div
      className={styles["notifications-label"]}
      onClick={handleNotifications}
    >
      {notifications.length > 0 && (
        <span className={styles["notifications-span"]}>
          {notifications.length}
        </span>
      )}
      <a className={showNotifications && styles["label-clicked"]}>
        <img src="/notification.svg" alt="" />
      </a>
      <div className={showNotifications ? styles.active : styles["non-active"]}>
        {notifications.map((notification) => {
          return (
            <article onClick={() => viewNotification(notification.id)}>
              <h6 className={styles["notification-header"]}>
                {notification.title}
              </h6>
              <p className={styles["notification-message"]}>
                {notification.body}
              </p>
              <span className={styles["notification-time"]}>
                {timeSince(notification.createdOn)}
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
};
export default NotificationLabel;
