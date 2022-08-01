import styles from "./spinner.module.css";
const Spinner = () => {
  return (
    <div
      className={`spinner-border ${styles["spinner"]} m-5`}
      role="status"
    ></div>
  );
};

export default Spinner;
