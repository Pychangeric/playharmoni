import React, { useState, useEffect } from 'react';

function UserDataDisplay({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Replace 'your_api_base_url' with the actual base URL of your API
    const baseUrl = 'your_api_base_url';
    const endpoint = `/me/${userId}`;

    fetch(`${baseUrl}${endpoint}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User Data</h2>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserDataDisplay;
