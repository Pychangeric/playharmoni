import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    // Implement your logout logic here
    // You can clear local storage, reset states, or perform API calls
    // For example, you can clear the token and trigger the onLogout callback
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
