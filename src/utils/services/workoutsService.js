import { API_URL } from "../environment";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";

export function getUserWorkouts(userId) {
  return interceptedHttpClient.get(`${API_URL}/Workouts/myplans/`, {
    params: { userId },
  });
}
