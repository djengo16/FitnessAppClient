/* eslint-disable react-hooks/exhaustive-deps */
import tableStyles from "../../styles/table.module.css";
import headingStyles from "../../styles/headings.module.css";
import styles from "./admin.module.css";
import Table from "../../components/table/Table";
import { Fragment, useEffect, useRef, useState } from "react";
import { getAllExercises } from "../../utils/services/exerciseServices";
import {
  DATA_PER_PAGE,
  HEALTHY_STATUS,
  UNSAVED_CHANGES_MESSAGE,
} from "../../utils/constants";
import Pagination from "../../components/pagination/Pagination";
import { Modal } from "../../components/modal/Modal";
import { ConfirmModal } from "../../components/modal/ConfirmModal";
import { getAppHelath } from "../../utils/services/apiService";
import AdminNav from "./AdminNav";
import { adminNavItems } from "../../utils/adminNavItems";
import Button from "../../components/button/Button";

const tableColumnsInfo = [
  {
    title: "ID",
    field: "id",
    type: "cell",
    width: "100px",
  },
  {
    title: "Exercise Name",
    field: "name",
    type: "cell",
    width: "500px",
  },
  {
    title: "Muscle group",
    field: "muscleGroup",
    type: "cell",
    width: "450px",
  },
  {
    title: "Action",
    field: "action",
    dataField: "id",
    action: "createEditAndDeleteBtn",
    type: "button",
    width: "450px",
  },
];

function Admin() {
  const initalPageable = {
    currentPage: 1,
    totalExercisesPerPage: 0,
  };
  const [pageable, setPageable] = useState(initalPageable);
  const [exercises, setExercises] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [searchParams, setSearchParams] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState("");

  const searchParamsInputRef = useRef();

  /* First mounting of the component triggers api call to health check endpoint and
    gets info if the App is Healthy or not, after that it does the same check every 
    10 minutes and updates the current status.
    We have this first render check here because of setInteral, which
    code will execute after 10 minutes for the first time, but we
    need this status info at the moment we open admin page.
    */
  useEffect(() => {
    getAllExercises(searchParams, pageable.currentPage, DATA_PER_PAGE).then(
      (response) => {
        setExercises(response.data.exercises);
        setPageable((prev) => ({
          ...prev,
          totalExercisesPerPage: response.data.pagesCount,
        }));
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
  }, [pageable.currentPage, searchParams]);

  const checkApiStatus = () => {
    getAppHelath().then((response) => {
      setApiStatus(response.data);
    });
  };

  const openModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    if (showConfirmModal) {
      hideConfirmModal();
    }
    setShowModal(false);
  };
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const handleNavClick = (value) => {
    setSelectedNavItem(value);
  };

  const actions = {
    createEditAndDeleteBtn: () => (
      <div className="d-flex justify-content-between">
        <Button
          onClick={openModal}
          buttonStyle="btn-primary"
          buttonSize="btn-medium"
        >
          Edit
        </Button>
        <Button
          onClick={openConfirmModal}
          buttonStyle="btn-danger"
          buttonSize="btn-medium"
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
      setRefresh((prev) => prev + 1);
      setSearchParams(searchParamsInputRef.current.value);
    }
  };
  const paginate = (pageNumber) =>
    setPageable((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  return (
    <Fragment>
      {showModal && <Modal onConfirm={hideModal} onCancel={openConfirmModal} />}
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={hideModal}
          onCancel={hideConfirmModal}
          message={UNSAVED_CHANGES_MESSAGE}
          action="Exiting !"
        />
      )}
      <div className={styles["admin-page"]}>
        <header>
          <h4 className={`${headingStyles["page-title"]}`}>Admin Panel</h4>
          <label className={styles["health-label"]}>
            Server status:
            <label
              title={apiStatus}
              className={`${styles["status-label"]} ${
                apiStatus === HEALTHY_STATUS ? styles.healthy : styles.unhealthy
              }`}
            />
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
              <Table
                data={exercises}
                columns={tableColumnsInfo}
                actions={actions}
              />
            </div>
            <Pagination
              dataPerPage={10}
              totalData={pageable.totalExercisesPerPage}
              paginate={paginate}
              refresh={refresh}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default Admin;
