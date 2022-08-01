import styles from "./input.module.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
const Input = ({
  type,
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  ...rest
}) => {
  return (
    <div
      className={error ? styles["error-form-cotrol"] : styles["form-control"]}
    >
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
      {type === "textarea" ? (
        <textarea
          className={`${styles["form-field"]} ${styles["form-input"]}`}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      ) : (
        <input
          className={`${styles["form-field"]} ${styles["form-input"]}`}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      )}
    </div>
  );
};

export default Input;
