import styles from "./button.module.css";

function PrimaryBtn(props) {
  return (
    <button onClick={props.action} className={styles["primary-btn"]}>
      {props.content}
    </button>
  );
}

export default PrimaryBtn;
