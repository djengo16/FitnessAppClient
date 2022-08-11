import styles from "./exercise-details.module.css";

const ExerciseDetails = (props) => {
  console.log(props.exercise);
  const difficultyOptions = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
  };

  // Handles different cases, when we get the numeric value
  // and when we get the string value
  const getDifficulty = (diff) => {
    if (isNaN(diff)) {
      return diff;
    } else {
      return difficultyOptions[diff];
    }
  };
  return (
    <div>
      <p>Difficulty: {getDifficulty(props.exercise.difficulty)}</p>
      {props.exercise.videoResourceUrl && (
        <section>
          <div className={styles["frame-container"]}>
            <iframe
              className={styles["exercise-video"]}
              title={props.exercise.name}
              src={props.exercise.videoResourceUrl}
              frameborder="0"
              allowfullscreen
            />
          </div>
        </section>
      )}
      <section className={styles["img-and-description"]}>
        <p className={styles["exercise-description"]}>
          {props.exercise.description}
        </p>
        {props.exercise.pictureResourceUrl && (
          <img
            className={styles["exercise-img"]}
            src={props.exercise.pictureResourceUrl}
            alt={props.exercise.name}
          />
        )}
      </section>
    </div>
  );
};
export default ExerciseDetails;
