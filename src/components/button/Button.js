import styles from "./button.module.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";
/**
 * Setting default values to btn's style and size.
 * Getting rest of the properties if there are some
 * with the spread operator.
 **/
const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  isLink,
  to,
  ...rest
}) => {
  const btnStyles = ["btn-primary", "btn-secondary", "btn-danger"];
  const btnSizes = ["btn-small", "btn-medium", "btn-large"];

  const finalBtnStyle = buttonStyle ? buttonStyle : btnStyles[0];
  const finalBtnSize = buttonSize ? buttonSize : btnSizes[0];
  let btn;
  if (isLink) {
    btn = (
      <Link
        type={type}
        to={to}
        onClick={onClick}
        className={`${styles[`btn`]} ${styles[finalBtnStyle]} ${
          styles[finalBtnSize]
        }`}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    btn = (
      <button
        onClick={onClick}
        type={type}
        className={`${styles[`btn`]} ${styles[finalBtnStyle]} ${
          styles[finalBtnSize]
        }`}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return <Fragment>{btn}</Fragment>;
};

export default Button;
