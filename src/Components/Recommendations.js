// recommendations.js
import React, { useState } from 'react';
import axios from 'axios';

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`/users/${userId}/recommendations`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <h2>Personalized Recommendations</h2>
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            <strong>Title:</strong> {recommendation.title} <br />
            <strong>Artist:</strong> {recommendation.artist} <br />
            <strong>Genre:</strong> {recommendation.genre} <br />
            <strong>Duration:</strong> {recommendation.duration} seconds <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
