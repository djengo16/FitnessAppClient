import { API_URL } from "./../environment";
import { DATA_PER_PAGE } from "../constants";
import httpParamsBuilder from "../builders/httpParamsBuilder";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";
/**
 *
 * @param exercise  => {id, name, musclegroup}
 */
export function getAllExercises(
  search = "",
  page = 1,
  count = DATA_PER_PAGE,
  difficulty = 0,
  muscleGroup = 0
) {
  return interceptedHttpClient.get(
    `${API_URL}/Exercises`,
    httpParamsBuilder({ search, page, count, difficulty, muscleGroup })
  );
}

export function deleteExercise(id) {
  return interceptedHttpClient.delete(`${API_URL}/Exercises/${id}`);
}

export function getExerciseById(id) {
  return interceptedHttpClient.get(`${API_URL}/Exercises/${id}`);
}
export function createExercise(model) {
  return interceptedHttpClient.post(`${API_URL}/Exercises/create`, model);
}
export function updateExercise(model) {
  return interceptedHttpClient.put(`${API_URL}/Exercises/update`, model);
}
//Exercise in workout day
export function deleteExerciseInWorkoutDay(exerciseId, workoutDayId) {
  return interceptedHttpClient.delete(
    `${API_URL}/ExerciseInWorkoutDay/exercise/${exerciseId}/workoutDay/${workoutDayId}`
  );
}
