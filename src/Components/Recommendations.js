import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations(userId);
  }, [userId]);

  const fetchRecommendations = async (userId) => {
    try {
      const response = await axios.get(`/recommendations?user_id=${userId}`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <h2>Recommended Music</h2>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            {/* Display recommendation details */}
            {recommendation.title} - {recommendation.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
