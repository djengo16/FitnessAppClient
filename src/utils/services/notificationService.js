import httpParamsBuilder from "../builders/httpParamsBuilder";
import { API_URL } from "../environment";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";

export function getTrainingNotification(id) {
  return interceptedHttpClient.get(
    `${API_URL}/Notifications/trainingDay`,
    httpParamsBuilder({ id })
  );
}

export function viewNotificationRequest(id) {
  console.log(id);
  return interceptedHttpClient.put(`${API_URL}/Notifications/view/${id}`);
}
