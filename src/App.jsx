import React, { Children, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/checkAuth",
          {},
          { withCredentials: true },
        );

        if (response.data.success) {
          setIsAuthentication(true);
        } else {
          setIsAuthentication(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthentication(false);
      }
    };

    checkAuth();
  }, []);

  const ProtectedRoutes = ({ children }) => {
    if (!isAuthentication) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  const RedirectAuthenticatedUser = ({ children }) => {
    if (isAuthentication) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <h1>{isAuthentication ? "Logged in" : "not logged in"}</h1>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectAuthenticatedUser>
            <RegisterPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage
              isAuthentication={isAuthentication}
              setIsAuthentication={setIsAuthentication}
            />
          </RedirectAuthenticatedUser>
        }
      />
    </Routes>
  );
};

export default App;
