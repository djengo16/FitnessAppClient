import { getDateHour } from "../../utils/services/dateService";
import styles from "./message.module.css";

const Message = (props) => {
  let messageClass =
    props.type === "left"
      ? `${styles["msg"]} ${styles["msg-left"]}`
      : `${styles["msg"]} ${styles["msg-right"]}`;

  const profilePicture = props.profilePicture
    ? props.profilePicture
    : "/user-icon.svg";

  const messageCreated = getDateHour(props.message?.createdOn);

  return (
    <div className={messageClass}>
      <img
        className={styles["msg-img"]}
        src={profilePicture}
        alt="User profile"
      />
      <div className={styles["msg-bubble"]}>
        <p className={styles["msg-text"]}>{props.message.body}</p>
        <div className={styles["msg-date"]}>{messageCreated}</div>
      </div>
    </div>
  );
};
export default Message;
