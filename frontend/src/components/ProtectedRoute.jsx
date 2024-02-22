import React from "react";
// import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../isAuthenticated"; // Import the isAuthenticated function
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
