// src/task2/job-portal/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'job_seeker' });
  const [message, setMessage] = useState('');

  const registerUser = () => {
    if (!newUser.username || !newUser.password) {
      setMessage('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:3001/addUser', newUser)
      .then(response => {
        setMessage('User added successfully!');
        setNewUser({ username: '', password: '', role: 'job_seeker' });
      })
      .catch(error => {
        setMessage('There was an error adding the user!');
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration</h1>
      </header>
      <main>
        <section className="form-section">
          <h2>Register User</h2>
          <div className="message">{message}</div>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={e => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="employer">Employer</option>
            <option value="job_seeker">Job Seeker</option>
          </select>
          <button onClick={registerUser}>Register</button>
        </section>
      </main>
    </div>
  );
}

export default App;