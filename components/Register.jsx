'use client'

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Login from '@/components/Login';


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  

  const handleRegister = async () => {
    const data = {
        "username": username,
        "password": password
    }
    try {
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response.data);
      // Redirect or perform other actions on successful registration
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <Layout>
    <div className='register'>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button className="btn" onClick={handleRegister}>Register</button>
    </div>
    </Layout>
  );}
  

