import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/header";
import Home from "./Components/Home/home";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  const handleSetToken = (data) => {
    setToken(data.token);
    setUser(data.user);
  };

  return (
    <div>
      <Router>
        <Header handleLogout={handleLogout} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={handleSetToken} />} />
          <Route
            path="/dashboard"
            element={
              token ? <Dashboard token={token} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
