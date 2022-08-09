/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import styles from "./workout-plan-nav.module.css";
const WorkoutPlanNav = ({ trainingDays, onNavClick }) => {
  const daysOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };
  const [selectedDay, setSelectedDay] = useState(
    daysOfWeek[new Date().getDay()]
  );

  const handleSelection = (e) => {
    onNavClick(e);
    setSelectedDay(daysOfWeek[e.target.id]);
  };

  return (
    <nav className={`${styles["workout-nav"]} d-flex justify-content-between`}>
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
      <h3 className={styles["curr-day-text"]}>{selectedDay}</h3>
    </nav>
  );
};

export default WorkoutPlanNav;
