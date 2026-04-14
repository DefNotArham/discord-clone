import React, { Children, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";

const App = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [user, setUser] = useState(null);

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
          setUser(response?.data.user);
        } else {
          setIsAuthentication(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setIsAuthentication(false);
        setUser(null);
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
            <Homepage
              user={user}
              setUser={setUser}
              setIsAuthentication={setIsAuthentication}
            />
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
              setIsAuthentication={setIsAuthentication}
              setUser={setUser}
              user={user}
            />
          </RedirectAuthenticatedUser>
        }
      />
    </Routes>
  );
};

export default App;
