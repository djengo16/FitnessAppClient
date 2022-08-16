import { Formik } from "formik";
import styles from "./edit-user-form.module.css";
import errorMessages from "../../utils/messages/errorMessages";
import Input from "../../components/input/Input";
import { validateEmail, validateUserName } from "../../utils/inputValidators";
import Button from "../../components/button/Button";
const EditUserForm = ({ user, onCancel }) => {
  return (
    <Formik
      /**
       * Destructuring and setting the exercise data from parent component.
       * The data has empty properties if it's for creating a new exercise
       * and actual property values if it's editing.
       */
      initialValues={{
        ...user,
      }}
      //`Error: ${errorMessageConstats.emptyEmail}`
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
        if (!validateUserName(values.lastName)) {
          errors.lastName = `Error: ${errorMessages.invalidLastName}`;
        }
        console.log(errors);
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        //if we have id its update othervise its create
        //   updateExercise(values)
        //     .then(() => {
        //       onConfirm(operations.update);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     })
        //     .finally(() => {
        //       setSubmitting(false);
        //     });
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
export default EditUserForm;
