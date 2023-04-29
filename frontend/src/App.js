import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import Signup from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import Dashboard from "./Components/Dashboard/dashboards";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/header";
import Home from "./Components/Home/home";
// import Transaction from "./Components/Transactions/transaction";
import TrackerPage from "./Components/Transactions/transaction";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("token");
    localStorage.removeItem("user");
  };

  const handleSetToken = (data) => {
    setToken(data.token);
    setUser(data.user);
    Cookies.set("token", data.token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log(data.token);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setToken(token);
      setUser(user);
    }
  }, [setToken, setUser]);

  return (
    <div>
      <Router>
        <Header handleLogout={handleLogout} user={user} />
        <Routes>
          <Route path="/transactions" element={<TrackerPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={handleSetToken} />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
