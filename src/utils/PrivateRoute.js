import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const PrivateRoute = ({ children, render, ...rest }) => {
  let { user } = useContext(AuthContext);
  return !user ? <Navigate to="/start" /> : children;
};

export default PrivateRoute;
