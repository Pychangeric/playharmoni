import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations(userId);
  }, [userId]);

  const fetchRecommendations = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}/recommendations`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            <strong>Title:</strong> {recommendation.song.title} <br />
            <strong>Artist:</strong> {recommendation.song.artist} <br />
            <strong>Genre:</strong> {recommendation.song.genre} <br />
            <strong>Album:</strong> {recommendation.song.album} <br />
            <strong>Duration:</strong> {recommendation.song.duration} seconds <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
