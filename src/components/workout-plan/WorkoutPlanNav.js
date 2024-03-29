/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import StatusLabel from "../status-label/StatusLabel";
import styles from "./workout-plan-nav.module.css";
const WorkoutPlanNav = ({ trainingDays, onNavClick, planStatus }) => {
  const daysOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };
  const [selectedDay, setSelectedDay] = useState(setInitialDay());

  function setInitialDay() {
    let today = new Date().getDay();
    if (trainingDays.includes(today)) {
      return daysOfWeek[today];
    } else {
      return daysOfWeek[1];
    }
  }

  const handleSelection = (e) => {
    onNavClick(e);
    setSelectedDay(daysOfWeek[e.target.id]);
  };

  return (
    <nav
      className={`${styles["workout-nav"]} d-flex justify-content-between align-items-end`}
    >
      <ul className={`${styles["workout-ul"]} `}>
        {Object.keys(daysOfWeek).map((key) => {
          return (
            <li>
              <a
                onClick={handleSelection}
                key={key}
                id={key}
                className={`${
                  !trainingDays.includes(+key) ? styles["disabled-link"] : ""
                }`}
              >
                {daysOfWeek[key]}
              </a>
            </li>
          );
        })}
      </ul>
      <div style={{ position: "relative" }}>
        <span className={styles["nav-status-label"]}>
          {`Status: ${planStatus ? "Active " : "Inactive "}`}
          <StatusLabel status={planStatus} targetStatus={true} />
        </span>
        <h3 className={styles["curr-day-text"]}>{selectedDay}</h3>
      </div>
    </nav>
  );
};

export default WorkoutPlanNav;
