import axios from "axios";
import { API_URL } from "./../environment";

const options_endpoint = `${API_URL}/options`;

export async function getDifficultyOptions() {
  return axios.get(`${options_endpoint}/difficulty`);
}

export async function getGoalOptions() {
  return axios.get(`${options_endpoint}/goal`);
}

export async function getMuscleGroupOptions() {
  return axios.get(`${options_endpoint}/muscleGroup`);
}
