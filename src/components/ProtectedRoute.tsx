import React from "react";
import { Navigate } from "react-router-dom";

interface PropTypes {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<PropTypes> = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return children;

};

export default ProtectedRoute
