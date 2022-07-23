import axios from "axios";
import { API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";

export function getAllUsers(
  searchParams = "",
  page = 1,
  count = DATA_PER_PAGE
) {
  const url =
    searchParams.length > 0
      ? `${API_URL}/Users?search=${searchParams}&page=${page}&count=${count}`
      : `${API_URL}/Users?page=${page}&count=${count}`;

  return axios.get(url);
}
export async function getUserById(id) {
  return axios.get(`${API_URL}/Users/${id}`);
}
