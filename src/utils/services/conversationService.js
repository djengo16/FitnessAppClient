import { API_URL } from "../environment";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";
/**
 *
 * @param {string} currentId The current logged user Id
 * @param {string} targetId The other participant in the chat
 * @returns
 */
export function getConversation(currentId, targetId) {
  return interceptedHttpClient.get(
    `${API_URL}/Conversations/currentUser/${currentId}/targetUser/${targetId}`
  );
}
