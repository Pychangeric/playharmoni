import React, { useState } from 'react';
import Login from '../Login/Login';
import SignupForm from '../Signup/Signup';

function Landingpage({ isLoggedIn, setIsLoggedIn }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSign = () => {
    setShowSignUp(!showSignUp);
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setIsLoggedIn(true); // Setting isLoggedIn to true
  };

  return (
    <div>
      {showLogin && (
        <button onClick={handleLogin} className='buttons--b'>
          Login
        </button>
      )}
      {showSignUp && (
        <button onClick={handleSign} className='buttons--a'>
          Signup
        </button>
      )}

      {showLogin && <Login />}
      {showSignUp && <SignupForm />}
    </div>
  );
}

export default Landingpage;
