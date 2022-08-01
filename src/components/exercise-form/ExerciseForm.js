import styles from "./exercise-form.module.css";
import { Formik } from "formik";
import Input from "../input/Input";
import Select from "../input/Select";
import Button from "../button/Button";
import {
  createExercise,
  updateExercise,
} from "../../utils/services/exerciseServices";
import errorMessages from "../../utils/messages/errorMessages";
/**
 * We will use this form for creating or updating exercises
 *
 */
const ExerciseForm = ({ data, onConfirm, onCancel }) => {
  const urlExpression = /^(ftp|http|https):\/\/[^ "]+$/;
  const regex = new RegExp(urlExpression);
  const muscleGroups = [
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Abs",
    "Traps",
    "Cardio",
  ];
  const difficulty = ["Easy", "Medium", "Hard"];
  return (
    <div>
      <Formik
        /**
         * Destructuring and setting the exercise data from parent component.
         * The data has empty properties if it's for creating a new exercise
         * and actual property values if it's editing.
         */
        initialValues={{
          ...data,
        }}
        //`Error: ${errorMessageConstats.emptyEmail}`
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = `Error: ${errorMessages.exerciseNameRequired}`;
          }
          if (!values.muscleGroup) {
            errors.muscleGroup = `Error: ${errorMessages.muscleGroupIsRequired}`;
          }
          if (!values.difficulty) {
            errors.difficulty = `Error: ${errorMessages.difficultyNameIsRequired}`;
          }
          if (values.videoResourceUrl && !regex.test(values.videoResourceUrl)) {
            errors.videoResourceUrl = `Error: ${errorMessages.invalidUrl}`;
          }
          if (
            values.pictureResourceUrl &&
            !regex.test(values.pictureResourceUrl)
          ) {
            errors.pictureResourceUrl = `Error: ${errorMessages.invalidUrl}`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          //if we have id its update othervise its create

          if (values.id) {
            updateExercise(values)
              .then(() => {
                onConfirm();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setSubmitting(false);
              });
          } else {
            createExercise(values)
              .then(() => {
                onConfirm();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }
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
          <form onSubmit={handleSubmit} className={styles["exercise-form"]}>
            <div className={styles["small-fields"]}>
              <Input
                id="name"
                type="text"
                name="name"
                label="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
              />
              <Select
                id="muscleGroup"
                type="text"
                name="muscleGroup"
                label="Muscle group"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.muscleGroup}
                error={errors.muscleGroup}
                options={muscleGroups}
              />
              <Select
                type="text"
                id="difficulty"
                name="difficulty"
                label="Difficulty"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.difficulty}
                error={errors.difficulty}
                options={difficulty}
              />
              <Input
                type="text"
                id="videoResourceUrl"
                name="videoResourceUrl"
                label="Video url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.videoResourceUrl}
                error={errors.videoResourceUrl}
              />
              <div className={styles["form-img-section"]}>
                <label className={styles["img-label"]}>Image</label>
                {values.pictureResourceUrl && !errors.pictureResourceUrl ? (
                  <img
                    className={styles["exercise-img"]}
                    alt="img"
                    src={values.pictureResourceUrl}
                  ></img>
                ) : (
                  <div className={styles["placeholder"]} />
                )}
                <Input
                  type="text"
                  id="pictureResourceUrl"
                  name="pictureResourceUrl"
                  label="Image url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pictureResourceUrl}
                  error={errors.pictureResourceUrl}
                />
              </div>
            </div>
            <Input
              id="description"
              className={styles["form-textarea"]}
              rows="5"
              type="textarea"
              name="description"
              label="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
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
    </div>
  );
};
export default ExerciseForm;
