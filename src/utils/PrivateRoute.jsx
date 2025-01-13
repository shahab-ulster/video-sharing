import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assume role is stored in localStorage during login

  // Check if the user is authenticated and has the required role
  if (!token || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
