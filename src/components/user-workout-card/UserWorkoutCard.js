import styles from "./user-workout-card.module.css";
import StatusLabel from "../status-label/StatusLabel";
import { Link } from "react-router-dom";
const UserWorkoutCard = (props) => {
  return (
    <Link to={`/users/${props.userId}/workoutplan/${props.id}`}>
      <article className={styles["user-workout-card"]}>
        <header className={styles["user-workout-card-head"]}>
          <p>{`Goal: ${props.goal}`}</p>
          <p>
            {`Status: ${props.isActive ? "Active " : "Inactive "}`}
            <StatusLabel status={props.isActive} targetStatus={true} />
          </p>
          <p>{`Work days: ${props.workoutDays}`}</p>
          <p>{`Difficulty: ${props.difficulty}`}</p>
        </header>
        <footer className={styles["user-workout-card-footer"]}>
          <p>
            Plan Id: <span className={styles["plan-id"]}>{props.id}</span>
          </p>
        </footer>
      </article>
    </Link>
  );
};
export default UserWorkoutCard;
