import Table from "../table/Table";
import Button from "../../components/button/Button";
import { useEffect, useReducer, useState } from "react";
import WorkoutPlanNav from "./WorkoutPlanNav";
import { Modal } from "../modal/Modal";
import ExerciseDetails from "../exercise-details/ExerciseDetails";
import { ConfirmModal } from "../modal/ConfirmModal";
import { REMOVE_EXERCISE_FROM_PLAN } from "../../utils/constants";
import {
  deleteExerciseInWorkoutDay,
  updateRangeExerciseInWorkoutDay,
} from "../../utils/services/exerciseInWorkoutDayService";
import ExercisesInUserWorkoutPlan from "../exercises/ExercisesInUserWorkoutPlan";
import Toast from "../toast/Toast";
import useToast from "../../hooks/useToast";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";

const indexesOfUpdatedExercises = new Set();

const WorkoutPlan = (props) => {
  const initialConfirmModalData = {
    onConfirm: () => {},
    onCancel: () => {},
    message: "",
    action: "",
  };

  const workoutDayReducer = (state, action) => {
    switch (action.type) {
      case "initial": {
        return props.workoutPlan.workoutDays[0];
      }
      case "add-exercise": {
        state.exercisesInWorkoutDays = [
          ...state.exercisesInWorkoutDays,
          action.exercise,
        ];
        return { ...state };
      }
      case "remove-exercise": {
        let filtered = state.exercisesInWorkoutDays.filter(
          (x) => x.exerciseId !== action.exercise.exerciseId
        );
        state.exercisesInWorkoutDays = filtered;
        return state;
      }
      case "change-day": {
        return props.workoutPlan.workoutDays.find(
          (x) => x.day == action.dayOfWeekAsNum
        );
      }
      case "increase-sets-reps": {
        let updatedWorkoutDay = Object.assign({}, state);
        indexesOfUpdatedExercises.add(action.index);
        updatedWorkoutDay.exercisesInWorkoutDays[action.index][
          action.field
        ] += 1;
        return updatedWorkoutDay;
      }
      case "decrease-sets-reps": {
        let updatedWorkoutDay = Object.assign({}, state);
        indexesOfUpdatedExercises.add(action.index);
        updatedWorkoutDay.exercisesInWorkoutDays[action.index][
          action.field
        ] -= 1;
        return updatedWorkoutDay;
      }
      default:
        return state;
    }
  };

  const initialWorkoutDay = props.workoutPlan.workoutDays[0];
  const [workoutDay, dispatch] = useReducer(
    workoutDayReducer,
    initialWorkoutDay
  );

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingSetsAndReps, setEditingSetsAndReps] = useState(false);

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

  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  const onDataIcrease = (field, index) => {
    dispatch({ type: "increase-sets-reps", index: index, field: field });
  };

  const onDataDecrease = (field, index) => {
    dispatch({ type: "decrease-sets-reps", index: index, field: field });
  };

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

  const handleNavClick = (e) => {
    const dayOfWeekAsNum = e.target.id;
    dispatch({ type: "change-day", dayOfWeekAsNum });
  };

  const handleRemoveExercise = (name) => {
    const exerciseToRemove = workoutDay.exercisesInWorkoutDays.find(
      (x) => x.name === name
    );
    deleteExerciseInWorkoutDay(exerciseToRemove.exerciseId, workoutDay.id).then(
      (res) => {
        dispatch({ type: "remove-exercise", exercise: exerciseToRemove });

        setToastConfig({
          severity: severityTypes.success,
          message: toastMessages.exerciseRemoved,
        });
        handleOpenToast();
        hideConfirmModal();
      }
    );
  };

  const handleEditing = () => {
    setEditingSetsAndReps(true);
  };

  /**
   * We keep the updated exercises ids in a unique set, so we can
   * use them later in this function.
   * So the function iterates over this ids and creates collection of
   * objects (only with updated exercises). Then we send this collection
   * to the server and save the data, so everything is up to date.
   */
  const handleSaveSetsAndReps = () => {
    setEditingSetsAndReps(false);

    const exercisesToUpdate = [];

    for (const currIndex of indexesOfUpdatedExercises) {
      let currExercise = workoutDay.exercisesInWorkoutDays[currIndex];

      exercisesToUpdate.push({
        exerciseId: currExercise.exerciseId,
        workoutDayId: workoutDay.id,
        sets: currExercise.sets,
        minReps: currExercise.minReps,
        maxReps: currExercise.maxReps,
      });
    }

    updateRangeExerciseInWorkoutDay(exercisesToUpdate).then((res) => {
      setToastConfig({
        severity: severityTypes.info,
        message: toastMessages.updatedSetsAndReps,
      });
      handleOpenToast();
    });
  };

  const updateExercises = (exercise) => {
    dispatch({ type: "add-exercise", exercise });
  };

  const additionalSection = (
    <div id="addiitonal-plan-section">
      <div className="d-flex justify-content-center mt-3">
        {!editingSetsAndReps ? (
          <Button onClick={handleEditing}>Change sets/reps</Button>
        ) : (
          <Button onClick={handleSaveSetsAndReps} buttonStyle="btn-secondary">
            Save
          </Button>
        )}
      </div>
      <ExercisesInUserWorkoutPlan
        workoutDay={workoutDay}
        handleUpdateExercises={updateExercises}
      />
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </div>
  );
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
        planStatus={props.workoutPlan.isActive}
      />
      <Table
        data={workoutDay.exercisesInWorkoutDays}
        columns={props.tableColumnsInfo}
        actions={actions}
        onIncrease={onDataIcrease}
        onDecrease={onDataDecrease}
        editing={editingSetsAndReps}
      />
      {props.for === "user-plan" && additionalSection}

    </div>
  );
};
export default WorkoutPlan;
