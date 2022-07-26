import axios from "axios";
import { API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";
import httpParamsBuilder from "../builders/httpParamsBuilder";
/**
 *
 * @param exercise  => {id, name, musclegroup}
 */
export function getAllExercises(search = "", page = 1, count = DATA_PER_PAGE) {
  return axios.get(
    `${API_URL}/Exercises`,
    httpParamsBuilder(search, page, count)
  );
}

export function deleteExercise(id) {
  return axios.delete(`${API_URL}/Exercises/${id}`);
}
