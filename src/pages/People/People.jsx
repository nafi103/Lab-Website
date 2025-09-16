import React, { useState, useEffect } from 'react';
import PeopleCard from '../../components/PeopleCard/PeopleCard';
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
      const response = await fetch('http://localhost:5000/api/people');
      
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
      <div className='people-page'>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading our amazing team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='people-page'>
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchPeople} className="retry-button">
            Try Again
          </button>
          <div className="error-help">
            <p>Make sure the server is running with:</p>
            <code>node server.js</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='people-page'>
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
