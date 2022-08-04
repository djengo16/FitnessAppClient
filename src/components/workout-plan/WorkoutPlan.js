import Table from "../table/Table";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import WorkoutPlanNav from "./WorkoutPlanNav";
import { Modal } from "../modal/Modal";
import ExerciseDetails from "../exercise-details/ExerciseDetails";
const tableColumnsInfo = [
  {
    title: "Exercise Name",
    field: "name",
    type: "cell",
    width: "20%",
  },
  {
    title: "Sets",
    field: "sets",
    type: "cell",
    width: "10%",
  },
  {
    title: "Min reps",
    field: "minReps",
    type: "cell",
    width: "10%",
  },
  {
    title: "Max reps",
    field: "maxReps",
    type: "cell",
    width: "10%",
  },
  {
    title: "Details",
    field: "details",
    dataField: "name",
    action: "createDetailsBtn",
    type: "button",
    width: "20%",
  },
];

const WorkoutPlan = (props) => {
  const [workoutDay, setWorkoutDay] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState({
    name: "",
    difficulty: "",
    pictureResourceUrl: "",
    videoResourceUrl: "",
    description: "",
  });

  const openDetailsModal = (name) => {
    let exercise = workoutDay.exercisesInWorkoutDays.find(
      (x) => x.name === name
    );
    console.log(exercise);

    setExerciseDetails({
      name: exercise.name,
      difficulty: exercise.difficulty,
      pictureResourceUrl: exercise.pictureResourceUrl,
      videoResourceUrl: exercise.videoResourceUrl,
      description: exercise.description,
    });
    setShowModal(true);
  };
  const closeDetailsModal = () => {
    setShowModal(false);
  };

  const actions = {
    createDetailsBtn: (name) => (
      <div className="d-flex justify-content-between">
        <Button
          onClick={() => openDetailsModal(name)}
          buttonStyle="btn-primary"
          buttonSize="btn-small"
        >
          Details
        </Button>
      </div>
    ),
  };
  //console.log(props.workoutPlan);
  const workoutDaysOfWeekAsNumber = props.workoutPlan.workoutDays.reduce(
    (prev, curr) => {
      prev.push(curr.day);
      return prev;
    },
    []
  );

  useEffect(() => {
    setWorkoutDay(props.workoutPlan.workoutDays[0]);
  }, []);

  const handleNavClick = (e) => {
    const dayOfWeekAsNum = e.target.id;
    setWorkoutDay(
      props.workoutPlan.workoutDays.find((x) => x.day == dayOfWeekAsNum)
    );
    console.log(workoutDay);
  };
  return (
    <div>
      {showModal && (
        <Modal
          title={exerciseDetails.name}
          onConfirm={closeDetailsModal}
          onCancel={closeDetailsModal}
        >
          <ExerciseDetails exercise={exerciseDetails} />
        </Modal>
      )}
      <WorkoutPlanNav
        trainingDays={workoutDaysOfWeekAsNumber}
        onNavClick={handleNavClick}
      />
      <Table
        data={workoutDay.exercisesInWorkoutDays}
        columns={tableColumnsInfo}
        actions={actions}
      />
    </div> //actions={actions}
  );
};
export default WorkoutPlan;
