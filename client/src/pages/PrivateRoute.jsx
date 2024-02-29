import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
