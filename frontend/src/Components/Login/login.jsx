import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({setToken}) => {
  
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3700/api/v1/users/login', {
        email,
        password
      });
      console.log(response.data);
      const data = response.data;
      setToken(data);
      

      setMessage(response.data.message);

      setTimeout(() => {
        Navigate('/dashboard');
      }, 2000);
     
    } catch (error) {
      console.error(error);
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
      <h2>Please Log In</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 mx-auto">
          Submit
        </button>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </form>
      <div className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link> instead.
      </div>
    </div>
  );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login;
