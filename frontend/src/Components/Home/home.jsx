import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Expense Tracker</h1>
      <p>Keep track of your expenses and stay within your budget.</p>
      <Link to="/signup" className="signup-btn">
        Sign up now
      </Link>
    </div>
  );
};

export default Home;
