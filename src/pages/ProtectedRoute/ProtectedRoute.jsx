import { use } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "./../LoadingPage/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = use(AuthContext);
  const location = useLocation();

  if (user) {
    return children;
  } else {
    if (authLoading) {
      return <LoadingPage />;
    } else {
      return Navigate({
        to: "/login",
        state: location?.pathname || "",
        replace: true,
      });
    }
  }
};

export default ProtectedRoute;
