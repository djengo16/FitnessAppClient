import Accordion from "react-bootstrap/Accordion";
import Button from "../button/Button";
import WorkoutPlan from "../workout-plan/WorkoutPlan";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import styles from "./generated-plans.module.css";
import boostrapCustomizedStyles from "../../styles/bootstrap.customized.module.css";
import { assignProgram } from "../../utils/services/workoutsService";
import { Navigate } from "react-router-dom";
import { Fragment, useState } from "react";
import Spinner from "../spinner/Spinner";
import { buildWorkoutPlanColumns } from "../../utils/builders/tableColumnsBuilder";
import useToast from "../../hooks/useToast";
import Toast from "../toast/Toast";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";
import { getUserActivePlanId } from "../../utils/services/usersService";
import { setupTrainingDayNotification } from "../../utils/services/notificationService";
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
  const [redirect, setRedirect] = useState({
    doRedirect: false,
    url: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  const handlePlanChoose = (id) => {
    const planToAssign = plans.find((plan) => plan.id === id);
    setIsLoading(true);

    assignProgram(planToAssign)
      .then(() => {
        //configure toast message and setinterval to prevent immediate redirect
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setToastConfig({
          severity: severityTypes.success,
          message: toastMessages.assignedProgram,
        });

        //setActivePlan
        getUserActivePlanId(planToAssign.userId).then((res) => {
          const planId = res.data;
          if (planId) {
            //Local storage
            localStorage.setItem("activePlanId", planId);
            //Notification
            setupTrainingDayNotification(planToAssign.userId, planId);
          }
        });

        //toast config
        handleOpenToast();
        setInterval(() => {
          setIsLoading(false);
          setRedirect({
            doRedirect: true,
            url: `/users/${planToAssign.userId}/workoutplan/${id}`,
          });
        }, 3000);
      })
      .catch((err) => {
        setToastConfig({
          severity: severityTypes.error,
          message: err.message,
        });
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      {redirect.doRedirect && <Navigate to={redirect.url} exact={true} />}
      {isLoading && <Spinner />}
      {!isLoading && (
        <Accordion defaultActiveKey="1" className={`mt-3`}>
          {plans.map((plan) => {
            counter = counter + 1;
            return (
              <Accordion.Item
                key={plan.id}
                eventKey={counter}
                className={boostrapCustomizedStyles["acc-item"]}
              >
                <Accordion.Header
                  className={boostrapCustomizedStyles["acc-header"]}
                >
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
                <Accordion.Body
                  className={boostrapCustomizedStyles["acc-body"]}
                >
                  <WorkoutPlan
                    tableColumnsInfo={buildWorkoutPlanColumns()}
                    workoutPlan={plan}
                  />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </Fragment>
  );
};
export default GeneratedPlans;
