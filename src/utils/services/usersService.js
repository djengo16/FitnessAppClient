import axios from "axios";
import { API_URL } from "./../environment";

export function getAllUsers(searchParams = "user", page = 1, count = 10) {
  return axios.get(
    `${API_URL}/Users?search=${searchParams}&page=${page}&count=${count}`
  );
}
export async function getUserById(id) {
  return axios.get(`${API_URL}/Users/${id}`);
}
