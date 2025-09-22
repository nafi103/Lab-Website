import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePeopleSection.css';

// Home page people section - showcasing our team with a carousel effect
// I wanted visitors to see the faces behind the research
const HomePeopleSection = () => {
  const [people, setPeople] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch people data when component mounts
  useEffect(() => {
    fetchPeople();
  }, []);

  // Auto-scroll carousel effect - keeps things dynamic
  useEffect(() => {
    if (people.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Loop back to start when we reach the end
        return nextIndex >= people.length ? 0 : nextIndex;
      });
    }, 4000); // Switch every 4 seconds - not too fast, not too slow

    return () => clearInterval(interval);
  }, [people.length]);

  // Get team member data from the API
  const fetchPeople = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/people?limit=8`);
      if (!response.ok) {
        throw new Error('Failed to fetch people');
      }
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonClick = (person) => {
    navigate(`/people/${person._id}`);
  };

  const handleViewAllClick = () => {
    navigate('/people');
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= people.length ? 0 : nextIndex;
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - 1;
      return prevIndexNew < 0 ? people.length - 1 : prevIndexNew;
    });
  };

  if (loading) {
    return (
      <section className="home-people-section">
        <div className="home-people-loading">
          <div className="loading-spinner"></div>
          <p>Loading team members...</p>
        </div>
      </section>
    );
  }

  if (error || people.length === 0) {
    return null; // Don't show section if there's an error or no people
  }

  return (
    <section className="home-people-section">
      <div className="home-people-container">
        {/* Header Section */}
        <div className="home-people-header">
          <div className="home-people-header-content">
            <h2>Meet Our Team</h2>
            <p>Discover the brilliant minds driving innovation and research in our laboratory</p>
          </div>
          <button 
            onClick={handleViewAllClick}
            className="home-people-view-all-btn"
          >
            View All Team Members
          </button>
        </div>

        {/* People Carousel */}
        <div className="home-people-carousel">
          {/* Navigation Buttons */}
          <button 
            className="carousel-nav-btn prev-btn"
            onClick={handlePrevClick}
            aria-label="Previous team member"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="carousel-nav-btn next-btn"
            onClick={handleNextClick}
            aria-label="Next team member"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="home-people-track-container">
            <div 
              className="home-people-track"
              style={{
                transform: `translateX(-${currentIndex * (320 + 24)}px)`, // card width + gap
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {people.map((person, index) => (
                <div 
                  key={person._id} 
                  className="home-people-card"
                  onClick={() => handlePersonClick(person)}
                >
                  <div className="home-people-card-image">
                    <img 
                      src={person.image || '/default-avatar.svg'} 
                      alt={person.name}
                      onError={(e) => {
                        e.target.src = '/default-avatar.svg';
                      }}
                    />
                  </div>
                  <div className="home-people-card-content">
                    <h3>{person.name}</h3>
                    <p className="home-people-position">{person.position}</p>
                    <p className="home-people-department">{person.department}</p>
                    {person.expertise && person.expertise.length > 0 && (
                      <div className="home-people-expertise">
                        <span className="expertise-tag">
                          {person.expertise[0]}
                        </span>
                        {person.expertise.length > 1 && (
                          <span className="expertise-more">
                            +{person.expertise.length - 1}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePeopleSection;