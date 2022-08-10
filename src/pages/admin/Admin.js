/* eslint-disable react-hooks/exhaustive-deps */
import tableStyles from "../../styles/table.module.css";
import pageStyles from "../../styles/page.module.css";
import styles from "./admin.module.css";
import Table from "../../components/table/Table";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  deleteExercise,
  getAllExercises,
} from "../../utils/services/exerciseServices";
import {
  DATA_PER_PAGE,
  HEALTHY_STATUS,
  UNSAVED_CHANGES_MESSAGE,
  DELETE_EXERCISE_MESSAGE,
} from "../../utils/constants";
import Pagination from "../../components/pagination/Pagination";
import { Modal } from "../../components/modal/Modal";
import { ConfirmModal } from "../../components/modal/ConfirmModal";
import { getAppHelath } from "../../utils/services/apiService";
import AdminNav from "./AdminNav";
import { adminNavItems } from "../../utils/adminNavItems";
import Button from "../../components/button/Button";
import StatusLabel from "../../components/status-label/StatusLabel";
import ExerciseForm from "../../components/exercise-form/ExerciseForm";
import { getExerciseById } from "../../utils/services/exerciseServices";
import Spinner from "../../components/spinner/Spinner";
import { buildExerciseColumnsInAdminPage } from "../../utils/builders/tableColumnsBuilder";

function Admin() {
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

  const [apiStatus, setApiStatus] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Confirm modal data
  const [confirmModalData, setConfirmModalData] = useState(
    initialConfirmModalData
  );

  //Confirm modal data
  const [modalTitle, setModalTitle] = useState("");

  //Temporary solution (triggers useEffect and get actual data after exercise creation or update)
  const [updatedCount, setUpdatedCount] = useState(0);

  //Keeps reference to searchbar's input
  const searchParamsInputRef = useRef();

  /**
   * We pass this entity on our form
   * When we create exercise we pass it with empty properties
   * When we edit exercise we pass it with it's values
   */
  const [exerciseEntity, setExerciseEntity] = useState(initalExerciseEntity);

  /* First mounting of the component triggers api call to health check endpoint and
    gets info if the App is Healthy or not, after that it does the same check every 
    10 minutes and updates the current status.
    We have this first render check here because of setInteral, which
    code will execute after 10 minutes for the first time, but we
    need this status info at the moment we open admin page.
    */
  useEffect(() => {
    setIsLoading(true);
    getAllExercises(searchParams, pageable.currentPage, DATA_PER_PAGE).then(
      (response) => {
        setExercises(response.data.exercises);
        setPageable((prev) => ({
          ...prev,
          totalDataPerPage: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / DATA_PER_PAGE),
        }));
        setIsLoading(false);
      }
    );
    if (isFirstRender) {
      setSelectedNavItem(adminNavItems.exercises);
      checkApiStatus();
      setIsFirstRender(false);
    }
    /* 1000 miliseconds * 60 seconds * 10 min = 10 minutes*/
    const intervalTime = 1000 * 60 * 10;
    const interval = setInterval(() => {
      checkApiStatus();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [pageable.currentPage, searchParams, updatedCount]);

  const checkApiStatus = () => {
    getAppHelath().then((response) => {
      setApiStatus(response.data);
    });
  };

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

  //Navigation
  const handleNavClick = (value) => {
    setSelectedNavItem(value);
  };

  //DELETE SETUP
  const handleDeleteExercise = (id) => {
    deleteExercise(id)
      .then((response) => {
        setExercises(exercises.filter((x) => x.id !== id));
      })
      .catch((error) => console.error(error));
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
    } else if (operation === "update") {
      setUpdatedCount((prev) => prev + 1);
    }
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
  const handleSearchParams = (e) => {
    e.preventDefault();
    if (
      searchParamsInputRef &&
      searchParamsInputRef.current.value.trim() !== ""
    ) {
      setPageable((prev) => ({
        ...prev,
        currentPage: 1,
      }));
      //this will trigger child's useffect and then will set curr page to 1
      setSearchParams(searchParamsInputRef.current.value);
    }
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

      <div className={pageStyles["page"]}>
        <header className={styles["admin-header"]}>
          <h4 className={`${pageStyles["page-title"]}`}>Admin Panel</h4>
          <label className={styles["health-label"]}>
            Server status:
            <StatusLabel status={apiStatus} targetStatus={HEALTHY_STATUS} />
          </label>
        </header>
        <AdminNav
          onNavSelect={handleNavClick}
          setSelectedNavItem={setSelectedNavItem}
          selectedNavItem={selectedNavItem}
          handleSearchParams={handleSearchParams}
          searchParamsInputRef={searchParamsInputRef}
        />
        {selectedNavItem === adminNavItems.exercises && (
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
        )}
      </div>
    </Fragment>
  );
}
export default Admin;
