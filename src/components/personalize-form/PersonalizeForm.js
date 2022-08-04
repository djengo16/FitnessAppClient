import Card from "../../components/card/Card";
import cardStyles from "../../components/card/card.module.css";
import { Formik } from "formik";
import Button from "../../components/button/Button";
import errorMessageConstats from "../../utils/messages/errorMessages";
import { useEffect, useState } from "react";
import {
  getDifficultyOptions,
  getGoalOptions,
} from "../../utils/services/trainingOptionsService";
import Select from "../input/Select";
import Input from "../input/Input";
import styles from "./personalize.module.css";
import { personalize } from "../../utils/services/workoutsService";

const PersonalizeForm = ({ userId, onFormSubmit }) => {
  const [difficultyOptions, setDifficultyOptions] = useState("");
  const [goalOptions, setGoalOptions] = useState("");

  useEffect(() => {
    getDifficultyOptions().then((response) => {
      setDifficultyOptions(response.data);
    });
    getGoalOptions().then((response) => {
      setGoalOptions(response.data);
    });
  }, []);
  return (
    <Card className={cardStyles["card-wrapper-10p"]} type="card-light">
      <Formik
        initialValues={{
          userId: userId,
          difficulty: 1,
          days: 3,
          goal: 1,
          count: 1,
          server: "", // this is just for errors
        }}
        validate={(values) => {
          const errors = {};
          if (!values.difficulty) {
            errors.difficulty = `Error: ${errorMessageConstats.difficultyOptionIsRequired}`;
          } else if (values.days < 3 && values.days < 5) {
            errors.days = `Error: ${errorMessageConstats.daysInRangeError}`;
          } else if (!values.days) {
            errors.days = `Error: ${errorMessageConstats.trainingDaysAreRequired}`;
          } else if (!values.goal) {
            errors.goal = `Error: ${errorMessageConstats.goalIsRequired}`;
          } else if (!values.goal) {
            errors.count = `Error: ${errorMessageConstats.programsCountInRange}`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          values.difficulty = +values.difficulty;
          values.goal = +values.goal;
          personalize(values)
            .then((response) => {
              onFormSubmit(response.data);
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
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={styles["personalize-form"]}>
            <Input
              id="days"
              type="number"
              min="3"
              max="5"
              name="days"
              label="How many days do you want to train?"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.days}
              error={errors.days}
            />
            <Select
              type="number"
              id="difficulty"
              name="difficulty"
              label="Choose your advancement!"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.difficulty}
              error={errors.difficulty}
              options={difficultyOptions}
            />
            <Select
              type="number"
              id="goal"
              name="goal"
              label="Setup your goal!"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.goal}
              error={errors.goal}
              options={goalOptions}
            />
            <Input
              id="count"
              type="number"
              min="1"
              max="10"
              name="count"
              label="How many programs do you want to generate?"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.count}
              error={errors.count}
            />
            <div className={`d-flex justify-content-around mt-4`}>
              <Button
                type="submit"
                disabled={isSubmitting}
                buttonStyle="btn-secondary"
                buttonSize="btn-small"
              >
                Personalize!
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default PersonalizeForm;
