import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"; // Import the shared styles

function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/faculty/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('facultyId', data.facultyId);
        navigate('/faculty/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Faculty Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default FacultyLogin;
