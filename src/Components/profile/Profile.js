import React from 'react';
import './ProfilePopup.css';

const Profile = ({ userData, onClose }) => {
  return (
    <div className="profile-popup">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
