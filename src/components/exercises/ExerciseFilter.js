import { useEffect, useRef, useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import styles from "./exercise-filter.module.css";
import {
  getDifficultyOptions,
  getMuscleGroupOptions,
} from "../../utils/services/trainingOptionsService";

function optionMapper(option) {
  if (option.key === -1) {
    return (
      <option selected="true" disabled key={option.key}>
        {option.value}
      </option>
    );
  }
  return (
    <option key={option.key} value={option.key}>
      {option.value}
    </option>
  );
}

/**
 *
 * @filterable {object} -> {searchParams, muscleGroup, difficulty}
 * @setFilterable {function} -> sets new value to filterable
 * @returns component with search bar and filters
 */

const ExerciseFilter = ({ setFilterable, refreshPage }) => {
  const [muscleGroupOptions, setMuscleGroups] = useState([
    { key: -1, value: "Muscle Groups" },
    { key: 0, value: "All" },
  ]);
  const [difficultyOptions, setDifficulty] = useState([
    { key: -1, value: "Difficulty" },
    { key: 0, value: "All" },
  ]);

  const searchParamsInputRef = useRef();

  useEffect(() => {
    getMuscleGroupOptions().then((response) => {
      //escaping double concatenation
      if (muscleGroupOptions.length <= 2) {
        setMuscleGroups((prev) => prev.concat(response.data));
      }
    });
    getDifficultyOptions().then((response) => {
      if (muscleGroupOptions.length <= 2) {
        setDifficulty((prev) => prev.concat(response.data));
      }
    });
  }, []);

  const handleMuscleGroupChange = (e) => {
    console.log("are we");
    setFilterable((prev) => ({
      ...prev,
      muscleGroup: e.target.value,
    }));
    refreshPage();
  };

  const handleDifficultyChange = (e) => {
    setFilterable((prev) => ({
      ...prev,
      difficulty: e.target.value,
    }));
    refreshPage();
  };

  const handleSearchParams = (e) => {
    e.preventDefault();
    setFilterable((prev) => ({
      ...prev,
      searchParams: searchParamsInputRef.current.value,
    }));
    refreshPage();
  };

  return (
    <div className={styles["exercise-filter-section"]}>
      <SearchBar
        placeholder={"Find Exercise"}
        ref={searchParamsInputRef}
        handleSearchParams={handleSearchParams}
      />
      <div className={styles["exercise-filters"]}>
        <select
          onChange={handleMuscleGroupChange}
          className={styles["exercise-filter-select"]}
        >
          {muscleGroupOptions.map((option) => optionMapper(option))}
        </select>
        <select
          onChange={handleDifficultyChange}
          className={styles["exercise-filter-select"]}
        >
          {difficultyOptions.map((option) => optionMapper(option))}
        </select>
      </div>
    </div>
  );
};
export default ExerciseFilter;
