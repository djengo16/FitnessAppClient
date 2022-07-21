import axios from "axios";
import { API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";
/**
 *
 * @param userData  => {email, password}
 */
export function getAllExercises(
  searchParams = "",
  page = 1,
  count = DATA_PER_PAGE
) {
  const url =
    searchParams.length > 0
      ? `${API_URL}/Exercises?search=${searchParams}&page=${page}&count=${count}`
      : `${API_URL}/Exercises?page=${page}&count=${count}`;

  return axios.get(url);
}
