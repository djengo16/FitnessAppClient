import { Accordion } from "react-bootstrap";
import Exercises from "./Exercises";
import boostrapCustomizedStyles from "../../styles/bootstrap.customized.module.css";
const ExercisesInUserWorkoutPlan = (props) => {
  return (
    <Accordion defaultActiveKey="0" className={`mt-3`}>
      <Accordion.Item
        className={boostrapCustomizedStyles["acc-item"]}
        eventKey="0"
      >
        <Accordion.Header className={boostrapCustomizedStyles["acc-header"]}>
          Add new exercise to your plan
        </Accordion.Header>
        <Accordion.Body className={boostrapCustomizedStyles["acc-body"]}>
          <Exercises />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default ExercisesInUserWorkoutPlan;
