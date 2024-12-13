import React, { useEffect, useState } from "react";
// import UserList from "./components/UserList";
import Login from "./components/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import "./style/style.css";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check login status on component mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <>
      {/* <Row style={{ flexDirection: "column", alignItems: "center" }}>
        <h2>İstifadəçi Formu</h2>
        <Login />
      </Row> */}

      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
