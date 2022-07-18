import axios from "axios";
import { API_URL } from "./../environment";

export function getAllUsers() {
  return axios.get(`${API_URL}/Users`);
}
export async function getUserById(id) {
  return axios.get(`${API_URL}/Users/${id}`);
}
