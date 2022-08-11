import ExerciseFilter from "./ExerciseFilter";
import Table from "../table/Table";
import Pagination from "../pagination/Pagination";
import { buildExerciseColumnsInUserPage } from "../../utils/builders/tableColumnsBuilder";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import { getAllExercises } from "../../utils/services/exerciseServices";
import { DATA_PER_PAGE } from "../../utils/constants";
import { Modal } from "../modal/Modal";
import ExerciseDetails from "../exercise-details/ExerciseDetails";

const Exercises = (props) => {
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

  const [showModal, setShowModal] = useState(false);
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

  const handleExerciseDetails = (id) => {
    setShowModal(true);
    const currExercise = exercises.find((x) => x.id === id);
    setExerciseDetails(currExercise);
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
        {/* //TODO: MAKE ADD BUTTON WORK
        <Button
          onClick={(result) => ""}
          buttonStyle="btn-secondary"
          buttonSize="btn-small"
        >
          Add
        </Button> */}
      </div>
    ),
  };

  const refreshPage = () => {
    setPageable((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  // data={workoutDay.exercisesInWorkoutDays}
  //     columns={props.tableColumnsInfo}
  //     actions={actions}
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
      <ExerciseFilter setFilterable={setFilterable} refreshPage={refreshPage} />
      <Table data={exercises} columns={tableColumnsInfo} actions={actions} />
      <Pagination pageable={pageable} setPageable={setPageable} />
    </div>
  );
};
export default Exercises;
