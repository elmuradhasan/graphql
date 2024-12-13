// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
type props = {
  isLoggedIn: boolean;
  children: any;
};
const ProtectedRoute = ({ isLoggedIn, children }: props) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
