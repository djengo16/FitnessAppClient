import axios from "axios";
import { API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";
import httpParamsBuilder from "../builders/httpParamsBuilder";

export function getAllUsers(search = "", page = 1, count = DATA_PER_PAGE) {
  return axios.get(`${API_URL}/Users`, httpParamsBuilder(search, page, count));
}
export async function getUserById(id) {
  return axios.get(`${API_URL}/Users/${id}`);
}
