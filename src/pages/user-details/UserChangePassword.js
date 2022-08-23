import { Formik } from "formik";
import styles from "./user-change-password.module.css";
import Input from "../../components/input/Input";
import errorMessages from "../../utils/messages/errorMessages";
import { changePassword } from "../../utils/services/authService";
import useToast from "../../hooks/useToast";
import Toast from "../../components/toast/Toast";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";
import Button from "../../components/button/Button";

const UserChangePassword = () => {
  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  return (
    <div className={styles["change-password-section"]}>
      <h5 style={{ marginBottom: "2rem" }}>Change your password</h5>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};

          Object.keys(values).forEach((key) => {
            if (!values[key]) {
              errors[key] = `Error: ${errorMessages.emptyPassword}`;
            }
            if (values[key].length < 6) {
              errors[key] = `Error: ${errorMessages.passwordMinLength}`;
            }
          });
          if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = `Error: ${errorMessages.passwordsMatch}`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          changePassword(values)
            .then((res) => {
              setToastConfig({
                severity: severityTypes.info,
                message: toastMessages.changedPassword,
              });
              resetForm();
            })
            .catch((res) => {
              setToastConfig({
                severity: severityTypes.error,
                message: res.response.data,
              });
            })
            .finally(() => {
              handleOpenToast();
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
          <form onSubmit={handleSubmit}>
            <Input
              id="oldPassword"
              type="password"
              name="oldPassword"
              label="Current password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.oldPassword}
              error={errors.oldPassword}
            />
            <Input
              id="newPassword"
              type="password"
              name="newPassword"
              label="New password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              error={errors.newPassword}
            />
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              label="Confirm password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              error={errors.confirmPassword}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ margin: "1rem", width: "300px" }}
            >
              Change
            </Button>
          </form>
        )}
      </Formik>
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </div>
  );
};
export default UserChangePassword;
