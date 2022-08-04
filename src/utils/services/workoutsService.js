import { API_URL } from "../environment";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";

export function getUserWorkouts(userId) {
  return interceptedHttpClient.get(`${API_URL}/Workouts/myplans/`, {
    params: { userId },
  });
}
export function personalize(data) {
  return interceptedHttpClient.post(`${API_URL}/Workouts/personalize`, data);
}
export function assignProgram(data) {
  return interceptedHttpClient.post(
    `${API_URL}/Workouts/personalize/assign`,
    data
  );
}
