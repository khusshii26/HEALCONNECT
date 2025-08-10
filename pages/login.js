// pages/login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@lib/context';
import { useRouter } from 'next/router';
import SignIn from '@components/Auth/SignIn';

export default function Login() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user]);

  const handleMockLogin = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password');
      return;
    }
    localStorage.setItem('userType', role);
    localStorage.setItem('username', username);
    router.push(`/${role}/dashboard`);
  };

  if (user) {
    return null; // or loading indicator while redirecting
  }

  return (
    <>
      {/* OTP login component */}
      <SignIn />

      {/* Divider */}
      <hr style={{ margin: '2rem 0' }} />

      {/* Mock username-password login */}
      <div
        style={{
          maxWidth: 320,
          margin: 'auto',
          background: '#fff',
          padding: '1.5rem',
          borderRadius: 10,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Mock Login</h2>
        <form onSubmit={handleMockLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', marginBottom: 20, padding: 8 }}
          >
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
