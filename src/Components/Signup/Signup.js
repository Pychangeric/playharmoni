import React, { useState } from 'react';
import './Signup.css';
import Profile from '../profile/Profile';

function Signup() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [showProfile, setShowProfile] = useState(false); // State to control the display of the Profile component
  const [userData, setUserData] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/signup', {
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
    })
      .then((response) => {
        if (response.ok) {
          setUserData({ username, email }); // Set user data
          setShowProfile(true); // Show the Profile component after successful sign-up
        } else {
          return response.json().then((data) => {
            if (data.errors) {
              setErrors(data.errors);
            } else {
              setErrors(['An unknown error occurred.']);
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(['An unknown error occurred.']);
      });
  };

  return (
    <div className='container'>
      {!showProfile ? (
        <div className='signup'>
          <form onSubmit={handleSignUp} className='up'>
            <div className='box'>
              <h1>Create account</h1>
              <label>Username:</label>
              <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} required />
              <label>Email:</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>Password:</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='minimum characters of 6' required />
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
            </div>
          </form>
        </div>
      ) : (
        <Profile userData={userData} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

export default Signup;
