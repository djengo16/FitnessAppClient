import Card from "../../components/card/Card";
import cardStyles from "../../components/card/card.module.css";
import formStyles from "../../styles/form.module.css";
import errorMessageConstats from "../../utils/messages/errorMessages";
import { Formik, ErrorMessage } from "formik";
import { login } from "../../utils/services/authService";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/button/Button";

export default function Login() {
  const [navigate, setNavigate] = useState(false);
  return (
    <Card className={cardStyles["card-wrapper-10p"]}>
      {navigate && <Navigate to="/" />}
      <Formik
        initialValues={{ email: "", password: "", server: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = `Error: ${errorMessageConstats.emptyEmail}`;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = `Error: ${errorMessageConstats.invalidEmail}`;
          }
          if (!values.password) {
            errors.password = `Error: ${errorMessageConstats.emptyPassword}`;
          } else if (values.password.length < 6) {
            errors.password = `Error: ${errorMessageConstats.passwordMinLength}`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          //  onFormSubmit(values);
          login(values)
            .then(() => {
              setNavigate(true);
            })
            .catch((err) => {
              setFieldError("server", err.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={formStyles["form"]}>
            <label
              name="email"
              className={`${formStyles["form-label"]} ${
                errors.email ? formStyles["label-input-error"] : ""
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={`${formStyles["form-input"]} ${
                errors.email ? formStyles["form-input-error"] : ""
              }`}
            />
            <label
              name="password"
              className={`${formStyles["form-label"]} ${
                errors.password ? formStyles["label-input-error"] : ""
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={`${formStyles["form-input"]} ${
                errors.password ? formStyles["form-input-error"] : ""
              }`}
            />
            <div className={`${formStyles["form-error"]}`}>
              <ErrorMessage
                className={formStyles["error-message"]}
                name="email"
                component="span"
              />
              <ErrorMessage
                className={formStyles["error-message"]}
                name="password"
                component="span"
              />
              <ErrorMessage
                className={formStyles["error-message"]}
                name="server"
                component="span"
              />
            </div>
            <div className={"d-flex justify-content-between"}>
              <Button
                type="submit"
                disabled={isSubmitting}
                buttonStyle="btn-primary"
                buttonSize="btn-small"
              >
                Login
              </Button>
              <Button
                isLink={true}
                to="/register"
                buttonStyle="btn-secondary"
                buttonSize="btn-small"
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Card>
  );
}
