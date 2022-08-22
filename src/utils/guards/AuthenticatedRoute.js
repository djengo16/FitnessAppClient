import { Navigate } from "react-router-dom";
import { tokenStorage } from "../services/storageService";

export function AuthenticatedRoute({ children }) {
  const token = tokenStorage.getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
