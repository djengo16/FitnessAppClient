import styles from "./input.module.css";

const Select = (props) => {
  return (
    <div className={styles["form-control"]}>
      <label className={styles["form-label"]} htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className={`${styles["form-field"]} ${styles["form-select"]}`}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        {props.options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
