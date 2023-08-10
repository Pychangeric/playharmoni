import React, { useState } from 'react';
import './Signup.css';
import Login from '../Login/Login';

function SignupForm() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [switchForm, setSwitchForm] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      if (response.ok) {
        setErrors([]);
        setSignupSuccess(true);
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors(['An unknown error occurred.']);
        }
      }
    } catch (error) {
      console.error(error);
      setErrors(['An unknown error occurred.']);
    }
  };

  const handleLogin = () => {
    setSwitchForm(true);
  };

  const loginClose = () => {
    setSwitchForm(false);
  };

  return (
    <main className='container'>
      <div className='signup'>
        {!signupSuccess && !switchForm ? (
          <form onSubmit={handleSignUp} className='up'>
            <div className='box'>
              <h1>Create account</h1>
              <label>Username:</label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
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
                placeholder='minimum characters of 6'
                required
              />
              <label>Confirmation:</label>
              <input
                type='password'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <button type='submit'>Sign up</button>
              {errors.length > 0 && (
                <div className='error-container'>
                  <p className='error-message'>Validation Errors:</p>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p>
                already a member?<span onClick={handleLogin}>Login here</span>
              </p>
            </div>
          </form>
        ) : (
          <Login onClose={loginClose} />
        )}
      </div>
    </main>
  );
}

export default SignupForm;
