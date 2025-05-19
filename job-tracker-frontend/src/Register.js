import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('User registered successfully! You can now log in.');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        </div>

        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
      </form>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
}

export default Register;
