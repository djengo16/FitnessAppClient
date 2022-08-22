import { tokenStorage } from "../services/storageService";
export default function headerConfig() {
  const token = tokenStorage.getToken();
  return {
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}
