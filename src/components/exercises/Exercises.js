import ExerciseFilter from "./ExerciseFilter";
import Table from "../table/Table";
import Pagination from "../pagination/Pagination";
import { buildExerciseColumnsInUserPage } from "../../utils/builders/tableColumnsBuilder";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import { getAllExercises } from "../../utils/services/exerciseServices";
import { ADD_EXERCISE_TO_PLAN, DATA_PER_PAGE } from "../../utils/constants";
import { Modal } from "../modal/Modal";
import ExerciseDetails from "../exercise-details/ExerciseDetails";
import { ConfirmModal } from "../modal/ConfirmModal";
import { addExerciseInWorkoutDay } from "../../utils/services/exerciseInWorkoutDayService";
import Toast from "../toast/Toast";
import useToast from "../../hooks/useToast";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";

const Exercises = ({ workoutDay, handleUpdateExercises }) => {
  const tableColumnsInfo = buildExerciseColumnsInUserPage();

  const initalPageable = {
    currentPage: 1,
    totalDataPerPage: 0,
    totalPages: 0,
  };

  const initialFilterable = {
    searchParams: "",
    muscleGroup: 0,
    difficulty: 0,
  };

  const initialConfirmModalData = {
    onConfirm: () => {},
    onCancel: () => {},
    message: "",
    action: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [confirmModalData, setConfirmModalData] = useState(
    initialConfirmModalData
  );

  const [pageable, setPageable] = useState(initalPageable);
  const [filterable, setFilterable] = useState(initialFilterable);

  const [exercises, setExercises] = useState();
  const [exerciseDetails, setExerciseDetails] = useState({
    name: "",
    difficulty: "",
    pictureResourceUrl: "",
    videoResourceUrl: "",
    description: "",
  });

  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  useEffect(() => {
    getAllExercises(
      filterable.searchParams,
      pageable.currentPage,
      DATA_PER_PAGE,
      filterable.difficulty,
      filterable.muscleGroup
    ).then((response) => {
      setExercises(response.data.exercises);
      setPageable((prev) => ({
        ...prev,
        totalDataPerPage: response.data.totalData,
        totalPages: Math.ceil(response.data.totalData / DATA_PER_PAGE),
      }));
    });
  }, [pageable.currentPage, filterable]);

  const checkExerciseIfAlreadyInDay = (id) =>
    workoutDay.exercisesInWorkoutDays.find((e) => e.exerciseId === id);

  const handleExerciseDetails = (id) => {
    setShowModal(true);
    const currExercise = exercises.find((x) => x.id === id);
    setExerciseDetails(currExercise);
  };

  const handleAddExercise = (id) => {
    setShowConfirmModal(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (!checkExerciseIfAlreadyInDay(id)) {
      addExerciseInWorkoutDay(id, workoutDay.id)
        .then((response) => {
          handleUpdateExercises(response.data);
          setToastConfig({
            severity: severityTypes.success,
            message: toastMessages.exerciseAdded(response.data.name),
          });
        })
        .catch((error) => {
          const message = error.message;
          setToastConfig({ severity: "error", message: { message } });
        });
    } else {
      setToastConfig({
        severity: severityTypes.warning,
        message: toastMessages.exerciseAlreadyAddded,
      });
    }

    handleOpenToast();
  };

  const actions = {
    createAddAndDetailsBtn: (id) => (
      <div className="d-flex justify-content-between">
        <Button
          onClick={handleExerciseDetails.bind(null, id)}
          buttonStyle="btn-primary"
          buttonSize="btn-small"
        >
          Details
        </Button>
        <Button
          onClick={setupAddExerciseConfirmModal.bind(null, id)}
          buttonStyle="btn-secondary"
          buttonSize="btn-small"
        >
          Add
        </Button>
      </div>
    ),
  };

  const refreshPage = () => {
    setPageable((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  const setupAddExerciseConfirmModal = (id) => {
    setConfirmModalData({
      onConfirm: () => handleAddExercise(id),
      onCancel: () => setShowConfirmModal(false),
      message: ADD_EXERCISE_TO_PLAN,
      action: "Adding!",
    });
    setShowConfirmModal(true);
  };
  return (
    <div>
      {showModal && (
        <Modal
          title={exerciseDetails.name}
          onConfirm={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        >
          <ExerciseDetails exercise={exerciseDetails} />
        </Modal>
      )}
      {showConfirmModal && <ConfirmModal {...confirmModalData} />}
      <ExerciseFilter setFilterable={setFilterable} refreshPage={refreshPage} />
      <Table data={exercises} columns={tableColumnsInfo} actions={actions} />
      <Pagination pageable={pageable} setPageable={setPageable} />
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </div>
  );
};
export default Exercises;
