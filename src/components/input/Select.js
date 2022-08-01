import styles from "./input.module.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const Select = ({
  type,
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  options,
  ...rest
}) => {
  return (
    <div className={styles["form-control"]}>
      <label className={styles["form-label"]} htmlFor={id}>
        {label}{" "}
        {error && (
          <Tooltip title={error} placement="right">
            <IconButton>
              <img
                className={styles["warning-icon"]}
                src="/warning.svg"
                alt="warning"
              />
            </IconButton>
          </Tooltip>
        )}
      </label>
      <select
        className={`${styles["form-field"]} ${styles["form-select"]}`}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => {
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
