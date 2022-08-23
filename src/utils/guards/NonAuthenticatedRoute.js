import { Navigate } from "react-router-dom";
import {} from "react-router";
import { tokenStorage } from "../services/storageService";

export function NonAuthenticatedRoute({ children }) {
  const token = tokenStorage.getToken();

  if (token) {
    return <Navigate to="/" />;
  }
  return children;
}
