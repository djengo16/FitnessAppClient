import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import ExerciseForm from "../../components/exercise-form/ExerciseForm";
import { ConfirmModal } from "../../components/modal/ConfirmModal";
import { Modal } from "../../components/modal/Modal";
import Pagination from "../../components/pagination/Pagination";
import Spinner from "../../components/spinner/Spinner";
import Table from "../../components/table/Table";
import Toast from "../../components/toast/Toast";
import useToast from "../../hooks/useToast";
import tableStyles from "../../styles/table.module.css";
import { buildExerciseColumnsInAdminPage } from "../../utils/builders/tableColumnsBuilder";
import {
  DATA_PER_PAGE,
  DELETE_EXERCISE_MESSAGE,
  UNSAVED_CHANGES_MESSAGE,
} from "../../utils/constants";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";
import {
  deleteExercise,
  getAllExercises,
  getExerciseById,
} from "../../utils/services/exerciseServices";

const ExercisesInAdmin = ({ searchParams: parrentseArchParams }) => {
  const tableColumnsInfo = buildExerciseColumnsInAdminPage();
  const initalPageable = {
    currentPage: 1,
    totalDataPerPage: 0,
    totalPages: 0,
  };

  /**
   * Initial confirm modal data because two of them can be
   * displayed on this page, we have Confirm modal for deleting and another one when
   * we want to exit from editing exercise.
   */
  const initialConfirmModalData = {
    onConfirm: () => {},
    onCancel: () => {},
    message: "",
    action: "",
  };

  /**
   * Initial exercise object model. We use it to set initial value to
   * our entity exerciseEntity
   *
   */
  const initalExerciseEntity = {
    id: "",
    name: "",
    muscleGroup: "",
    difficulty: "",
    videoResourceUrl: "",
    pictureResourceUrl: "",
    description: "",
  };

  const [pageable, setPageable] = useState(initalPageable);
  const [exercises, setExercises] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //Confirm modal data
  const [confirmModalData, setConfirmModalData] = useState(
    initialConfirmModalData
  );

  //Confirm modal data
  const [modalTitle, setModalTitle] = useState("");

  //Temporary solution (triggers useEffect and get actual data after exercise creation or update)
  const [updatedCount, setUpdatedCount] = useState(0);

  /**
   * We pass this entity on our form
   * When we create exercise we pass it with empty properties
   * When we edit exercise we pass it with it's values
   */
  const [exerciseEntity, setExerciseEntity] = useState(initalExerciseEntity);

  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  //need this because the searchbar is in the navbar component
  if (parrentseArchParams !== searchParams) {
    setPageable((prev) => ({
      ...prev,
      currentPage: 1,
    }));

    setSearchParams(parrentseArchParams);
  }

  /* First mounting of the component triggers api call to health check endpoint and
    gets info if the App is Healthy or not, after that it does the same check every 
    10 minutes and updates the current status.
    We have this first render check here because of setInteral, which
    code will execute after 10 minutes for the first time, but we
    need this status info at the moment we open admin page.
    */
  useEffect(() => {
    setIsLoading(true);
    getAllExercises(searchParams, pageable.currentPage).then((response) => {
      setExercises(response.data.exercises);
      setPageable((prev) => ({
        ...prev,
        totalDataPerPage: response.data.totalData,
        totalPages: Math.ceil(response.data.totalData / DATA_PER_PAGE),
      }));
      setIsLoading(false);
    });
  }, [pageable.currentPage, searchParams, updatedCount]);

  //Main modal
  const openModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setExerciseEntity(initalExerciseEntity);
    hideConfirmModal();
    setShowModal(false);
  };

  //Confirm modal 'unsaved changes'
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  //DELETE SETUP
  const handleDeleteExercise = (id) => {
    deleteExercise(id)
      .then((response) => {
        setExercises(exercises.filter((x) => x.id !== id));
        setToastConfig({
          severity: severityTypes.success,
          message: toastMessages.exerciseDeleted,
        });
      })
      .catch((error) => {
        setToastConfig({
          severity: severityTypes.error,
          message: error.message,
        });
      });
    handleOpenToast();
    setShowConfirmModal(false);
  };

  //When exercise is created or updated
  const handleExerciseOperation = (operation) => {
    /**
     * If id is null it means that we created a new exercise,
     * and we want to go to the last page to see it,
     * otherwise we want to trigger useEffect and fetch
     * the actual data
     *
     */
    if (operation === "create") {
      setPageable((prev) => ({
        ...prev,
        currentPage: pageable.totalPages,
      }));
      setToastConfig({
        severity: severityTypes.success,
        message: toastMessages.exerciseCreated,
      });
    } else if (operation === "update") {
      setUpdatedCount((prev) => prev + 1);
      setToastConfig({
        severity: severityTypes.info,
        message: toastMessages.exerciseUpdated,
      });
    }
    handleOpenToast();
    hideModal();
  };

  const setupDeleteModal = (id) => {
    //First sets up confirm modal for deleting
    setConfirmModalData({
      onConfirm: () => handleDeleteExercise(id),
      onCancel: () => {
        hideConfirmModal();
      },
      message: DELETE_EXERCISE_MESSAGE,
      action: "Deleting!",
    });

    //then renders it
    openConfirmModal();
  };

  //EDIT SETUP
  const setupEditCancelModal = (id) => {
    //First sets up confirm modal for editing
    setConfirmModalData({
      onConfirm: () => hideModal(),
      onCancel: () => hideConfirmModal(),
      message: UNSAVED_CHANGES_MESSAGE,
      action: "Exiting!",
    });
    //then renders it
    openConfirmModal();
  };
  const setupEditModal = (id) => {
    //fetch entity data
    setModalTitle("Edit exercise");
    getExerciseById(id).then((res) => {
      setExerciseEntity(res.data);
      openModal();
    });
  };
  const setupCreateModal = () => {
    setModalTitle("Create exercise");
    openModal();
  };

  const actions = {
    createEditAndDeleteBtn: (id) => (
      <div className="d-flex justify-content-between">
        <Button
          onClick={() => setupEditModal(id)}
          buttonStyle="btn-primary"
          buttonSize="btn-small"
        >
          Edit
        </Button>
        <Button
          onClick={(result) => setupDeleteModal(id)}
          buttonStyle="btn-danger"
          buttonSize="btn-small"
        >
          Delete
        </Button>
      </div>
    ),
  };

  return (
    <Fragment>
      {showModal && (
        <Modal title={modalTitle} onConfirm={hideModal}>
          <ExerciseForm
            onConfirm={(operation) => handleExerciseOperation(operation)}
            onCancel={setupEditCancelModal}
            data={exerciseEntity}
          />
        </Modal>
      )}
      {showConfirmModal && <ConfirmModal {...confirmModalData} />}
      <div id="exercises">
        <div className={tableStyles.scrollable}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <Table
              data={exercises}
              columns={tableColumnsInfo}
              actions={actions}
            />
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Pagination pageable={pageable} setPageable={setPageable} />
          <Button
            onClick={(result) => setupCreateModal()}
            buttonStyle="btn-secondary"
            buttonSize="btn-small"
          >
            + Add exercise
          </Button>
        </div>
      </div>
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </Fragment>
  );
};
export default ExercisesInAdmin;
