import axios from "axios";
import { API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";
import httpParamsBuilder from "../builders/httpParamsBuilder";
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
export async function getUserActivePlanId(userId) {
  return interceptedHttpClient.get(
    `${API_URL}/Users/activePlanId`,
    httpParamsBuilder({ userId })
  );
}
export async function updateUser(data) {
  return interceptedHttpClient.put(`${API_URL}/Users/edit`, data);
}
