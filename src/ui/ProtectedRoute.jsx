import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FullPage from "./FullPage";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user from the API
  const { isLoading, isAuthenticated } = useUser();

  // 2. If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While the user is loading, show a loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children ? children : <Outlet />;
}

export default ProtectedRoute;
