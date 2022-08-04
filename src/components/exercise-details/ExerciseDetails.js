import styles from "./exercise-details.module.css";

const ExerciseDetails = (props) => {
  console.log(props.exercise.videoResourceUrl);
  console.log(props.exercise.pictureResourceUrl);
  const difficultyOptions = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
  };
  return (
    <div>
      {props.exercise.videoResourceUrl && (
        <section>
          <p>Difficulty: {difficultyOptions[props.exercise.difficulty]}</p>
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
