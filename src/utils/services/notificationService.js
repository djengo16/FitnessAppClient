import httpParamsBuilder from "../builders/httpParamsBuilder";
import { API_URL } from "../environment";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";

export function getAllNotifications(id) {
  return interceptedHttpClient.get(
    `${API_URL}/Notifications/all`,
    httpParamsBuilder({ id })
  );
}

export function viewNotificationRequest(id) {
  return interceptedHttpClient.put(`${API_URL}/Notifications/view/${id}`);
}
