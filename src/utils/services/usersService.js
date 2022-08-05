import axios from "axios";
import { ADMIN_ROLE, API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";
import httpParamsBuilder from "../builders/httpParamsBuilder";
import tokenStorage from "./tokenStorage";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";

export function getAllUsers(search = "", page = 1, count = DATA_PER_PAGE) {
  return axios.get(
    `${API_URL}/Users`,
    httpParamsBuilder({ search, page, count })
  );
}
export async function getUserById(id) {
  return axios.get(`${API_URL}/Users/${id}`);
}

export async function getUserWorkoutPlan(userId, planId) {
  return interceptedHttpClient.get(
    `${API_URL}/Users/workoutPlan`,
    httpParamsBuilder({ userId, planId })
  );
}
/**
 *
 * @param {current logged user id} id
 * @returns {True if parameter id is equal to current logged user's id or current user is in admin role}
 *
 */
export function hasPermision(id) {
  const token = tokenStorage.decodeToken();
  const activeUserId = token.nameid;
  const activeUserRole = token.role;

  if (id === activeUserId || activeUserRole === ADMIN_ROLE) return true;

  return false;
}
