import { Navigate } from "react-router-dom";
import { tokenStorage } from "../services/storageService";
import { ADMIN_ROLE } from "../environment";

export function AdminRoute({ children }) {
  const role = tokenStorage.decodeToken().role;

  if (role === ADMIN_ROLE) {
    return children;
  }
  return <Navigate to="/" />;
}
