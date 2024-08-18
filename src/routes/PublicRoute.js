import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";

const PublicRoute = ({ children }) => {
  const { user } = useAuthContext(); // Assuming `user` is null when not logged in

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
