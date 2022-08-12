import { API_URL } from "../environment";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";

export function deleteExerciseInWorkoutDay(exerciseId, workoutDayId) {
  return interceptedHttpClient.delete(
    `${API_URL}/ExerciseInWorkoutDay/exercise/${exerciseId}/workoutDay/${workoutDayId}`
  );
}

export function addExerciseInWorkoutDay(exerciseId, workoutDayId) {
  return interceptedHttpClient.put(`${API_URL}/ExerciseInWorkoutDay`, {
    exerciseId,
    workoutDayId,
  });
}
