import Table from "../table/Table";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import WorkoutPlanNav from "./WorkoutPlanNav";
import { Modal } from "../modal/Modal";
import ExerciseDetails from "../exercise-details/ExerciseDetails";
import { ConfirmModal } from "../modal/ConfirmModal";
import { REMOVE_EXERCISE_FROM_PLAN } from "../../utils/constants";
import { deleteExerciseInWorkoutDay } from "../../utils/services/exerciseServices";

const WorkoutPlan = (props) => {
  const initialConfirmModalData = {
    onConfirm: () => {},
    onCancel: () => {},
    message: "",
    action: "",
  };

  let tableColumnsInfo = [
    {
      title: "Exercise Name",
      field: "name",
      type: "cell",
      width: "40%",
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
      width: "15%",
    },
    {
      title: "Remove from plan",
      field: "details",
      dataField: "name",
      action: "createRemoveBtn",
      type: "button",
      width: "15%",
    },
  ];

  const [workoutDay, setWorkoutDay] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [exerciseDetails, setExerciseDetails] = useState({
    name: "",
    difficulty: "",
    pictureResourceUrl: "",
    videoResourceUrl: "",
    description: "",
  });
  const [confirmModalData, setConfirmModalData] = useState(
    initialConfirmModalData
  );

  if (!props.isUserWorkoutPlan) {
    tableColumnsInfo = tableColumnsInfo.filter(
      (x) => x.title !== "Remove from plan"
    );
  }

  const openDetailsModal = (name) => {
    let exercise = workoutDay.exercisesInWorkoutDays.find(
      (x) => x.name === name
    );

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

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const setupConfirmModal = (name) => {
    setConfirmModalData({
      onConfirm: () => handleRemoveExercise(name),
      onCancel: () => {
        hideConfirmModal();
      },
      message: REMOVE_EXERCISE_FROM_PLAN,
      action: "Removing!",
    });
    openConfirmModal();
  };

  const actions = {
    createDetailsBtn: (name) => (
      <div className="d-flex justify-content-between">
        <Button
          onClick={openDetailsModal.bind(null, name)}
          buttonStyle="btn-primary"
          buttonSize="btn-small"
        >
          Details
        </Button>
      </div>
    ),
    createRemoveBtn: (name) => (
      <div className="d-flex justify-content-between">
        <Button
          onClick={setupConfirmModal.bind(null, name)}
          buttonStyle="btn-danger"
          buttonSize="btn-small"
        >
          Remove
        </Button>
      </div>
    ),
  };

  const workoutDaysOfWeekAsNumber = props.workoutPlan.workoutDays.reduce(
    (prev, curr) => {
      prev.push(curr.day);
      return prev;
    },
    []
  );

  useEffect(() => {
    if (workoutDay === "") {
      setWorkoutDay(props.workoutPlan.workoutDays[0]);
    }
  }, [props.workoutPlan.workoutDays, workoutDay]);

  const handleNavClick = (e) => {
    const dayOfWeekAsNum = e.target.id;
    setWorkoutDay(
      props.workoutPlan.workoutDays.find((x) => x.day == dayOfWeekAsNum)
    );
  };

  const handleRemoveExercise = (name) => {
    const exerciseToRemove = workoutDay.exercisesInWorkoutDays.find(
      (x) => x.name === name
    );
    deleteExerciseInWorkoutDay(exerciseToRemove.exerciseId, workoutDay.id).then(
      (res) => {
        setWorkoutDay((prev) => {
          let filtered = prev.exercisesInWorkoutDays.filter(
            (x) => x.exerciseId !== exerciseToRemove.exerciseId
          );
          prev.exercisesInWorkoutDays = filtered;
          return prev;
        });
        hideConfirmModal();
      }
    );
  };
  return (
    <div>
      {showConfirmModal && <ConfirmModal {...confirmModalData} />}
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
