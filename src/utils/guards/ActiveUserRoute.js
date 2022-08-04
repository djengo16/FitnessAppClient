import { Navigate, useParams } from "react-router-dom";
import { hasPermision } from "../services/usersService";

export function ActiveUserRoute({ children }) {
  const params = useParams();
  const permision = hasPermision(params.id);

  if (permision) {
    return children;
  }
  return <Navigate to="/" />;
}
