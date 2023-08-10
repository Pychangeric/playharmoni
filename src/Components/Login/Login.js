import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logout from '../Logout';
import SignupForm from '../Signup/Signup';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogged, setLogged] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError('Invalid Credentials');
          throw new Error('Invalid Credentials');
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        console.log('Before navigating');
        setLogged(true);
        navigate('/home'); 
        console.log('After navigating');
      })
      .catch((error) => {
        console.error(error);
        // Handle other errors here, if needed
      });
  };

  const handleSignupLinkClick = () => {
    setShowSignup(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
  };

  return (
    <div className='login'>
      {!loading && !isLogged && !showSignup ? (
        <form onSubmit={handleLogin} className='in'>
          <div className='box'>
            <h1>Log In</h1>
            {error && <div className='error'>{error}</div>}
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='submit'>Log in</button>
          </div>
          <p>
            Don't have an account?<span onClick={handleSignupLinkClick}>Register here</span>
          </p>
        </form>
      ) : (
        isLogged ? (
          <div>
            <Logout onLogout={() => setLogged(false)} />
          </div>
        ) : (
          <SignupForm onClose={handleSignupClose} />
        )
      )}
    </div>
  );
}

export default Login;
