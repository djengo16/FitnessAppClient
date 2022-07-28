import styles from "./status.module.css";
const StatusLabel = (props) => {
  return (
    <label
      title={props.status}
      className={`${styles["status-label"]} ${
        props.status === props.targetStatus ? styles.active : styles.inactive
      }`}
    />
  );
};
export default StatusLabel;
