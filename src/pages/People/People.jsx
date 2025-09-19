import React, { useState, useEffect } from 'react';
import PeopleCard from '../../components/PeopleCard/PeopleCard';
import LoadingScreen from '../../components/LoadingScreen';
import './People.css';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/people`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch people data');
      }
      
      const data = await response.json();
      setPeople(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching people:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen 
        message="Loading Our Amazing Team" 
        subMessage="Preparing to introduce you to the brilliant minds driving innovation in our laboratory..."
      />
    );
  }

  if (error) {
    return (
      <div className='page-content'>
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchPeople} className="retry-button">
            Try Again
          </button>
          <div className="error-help">
            <p>Unable to connect to the API server.</p>
            <p>Please check your internet connection or try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='page-content'>
      <div className="people-header">
        <h1>Our Team</h1>
        <p className="people-subtitle">
          Meet the brilliant minds driving innovation in our laboratory
        </p>
      </div>
      
      {people.length === 0 ? (
        <div className="empty-state">
          <h3>No team members found</h3>
          <p>Check back soon as we add our team members!</p>
        </div>
      ) : (
        <div className="people-grid">
          {people.map((person) => (
            <PeopleCard key={person._id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
