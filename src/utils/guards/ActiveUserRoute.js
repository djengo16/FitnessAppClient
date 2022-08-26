import { Navigate, useParams } from "react-router-dom";
import { hasPermission } from "../../utils/services/authService";

export function ActiveUserRoute({ children }) {
  const params = useParams();
  const permission = hasPermission(params.id);

  if (permission) {
    return children;
  }
  return <Navigate to="/" />;
}
