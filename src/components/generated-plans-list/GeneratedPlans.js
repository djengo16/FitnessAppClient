import Accordion from "react-bootstrap/Accordion";
import Button from "../button/Button";
import WorkoutPlan from "../workout-plan/WorkoutPlan";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import styles from "./generated-plans.module.css";
import { assignProgram } from "../../utils/services/workoutsService";
import { Navigate } from "react-router-dom";
import { Fragment, useState } from "react";
import Spinner from "../spinner/Spinner";
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <Button
      type="button"
      buttonStyle="btn-primary"
      buttonSize="btn-small"
      style={{ backgroundColor: "pink" }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}

const GeneratedPlans = ({ plans }) => {
  let counter = 0;
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanChoose = (id) => {
    const planToAssign = plans.find((plan) => plan.id === id);
    setIsLoading(true);
    assignProgram(planToAssign)
      .then(() => {
        setUserId(planToAssign.userId);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      {redirect && <Navigate to={`/users/${userId}`} exact={true} />}
      {isLoading && <Spinner />}
      {!isLoading && (
        <Accordion defaultActiveKey="1" className={`${styles["acc"]} mt-3`}>
          {plans.map((plan) => {
            counter = counter + 1;
            return (
              <Accordion.Item
                key={plan.id}
                eventKey={counter}
                className={styles["acc-item"]}
              >
                <Accordion.Header className={styles["acc-header"]}>
                  <h6 className={styles["plan-title"]}>
                    Workout plan {counter}.{" "}
                  </h6>
                  <CustomToggle eventKey="0">View</CustomToggle>
                  <Button
                    onClick={() => handlePlanChoose(plan.id)}
                    buttonStyle="btn-secondary"
                    buttonSize="btn-small"
                  >
                    Choose
                  </Button>
                </Accordion.Header>
                <Accordion.Body className={styles["acc-body"]}>
                  <WorkoutPlan workoutPlan={plan} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </Fragment>
  );
};
export default GeneratedPlans;
