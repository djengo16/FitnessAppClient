import { Formik } from "formik";
import styles from "./edit-user-form.module.css";
import errorMessages from "../../utils/messages/errorMessages";
import Input from "../../components/input/Input";
import {
  validateEmail,
  validatePhoneNumber,
  validateUserName,
} from "../../utils/inputValidators";
import Button from "../../components/button/Button";
import { updateUser } from "../../utils/services/usersService";
const UserEditForm = ({ user, onUserUpdate, onCancel }) => {
  return (
    <Formik
      initialValues={{
        ...user,
      }}
      validate={(values) => {
        console.log(values);
        const errors = {};
        if (!values.email) {
          errors.email = `Error: ${errorMessages.emptyEmail}`;
        }
        if (!validateEmail) {
          errors.email = `Error: ${errorMessages.invalidEmail}`;
        }
        if (values.firstName && !validateUserName(values.firstName)) {
          errors.firstName = `Error: ${errorMessages.invalidFirstName}`;
        }
        if (values.lastName && !validateUserName(values.lastName)) {
          errors.lastName = `Error: ${errorMessages.invalidLastName}`;
        }
        if (values.phoneNumber && !validatePhoneNumber(values.phoneNumber)) {
          errors.phoneNumber = `Error: ${errorMessages.invalidPhoneNumber}`;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        //We don't have to update data if there is no difference
        if (JSON.stringify(values) === JSON.stringify(user)) {
          onCancel();
        }
        updateUser(values)
          .then((res) => {
            //success, data, errorMessage
            onUserUpdate(true, values);
          })
          .catch((err) => {
            onUserUpdate(false, null, err.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className={styles["user-form"]}>
          <div className={styles["small-inputs-section"]}>
            <Input
              id="email"
              type="email"
              name="email"
              label="Email address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
            />
            <Input
              id="firstName"
              type="text"
              name="firstName"
              label="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              error={errors.firstName}
            />
            <Input
              id="lastName"
              type="text"
              name="lastName"
              label="Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              error={errors.lastName}
            />
            <Input
              id="phoneNumber"
              type="number"
              name="phoneNumber"
              label="Phone Number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              error={errors.phoneNumber}
            />
          </div>
          <Input
            className={styles["form-textarea"]}
            id="description"
            type="textarea"
            name="description"
            label="About"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            error={errors.description}
            rows="5"
          />
          <div className={styles["form-footer"]}>
            <Button
              disabled={isSubmitting}
              type="submit"
              buttonStyle="btn-primary"
              buttonSize="btn-large"
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              buttonStyle="btn-danger"
              buttonSize="btn-large"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default UserEditForm;
