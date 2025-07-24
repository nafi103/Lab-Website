import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PersonDetail.css';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPersonDetails();
  }, [id]);

  const fetchPersonDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/people/${id}`);
      
      if (!response.ok) {
        throw new Error('Person not found');
      }
      
      const data = await response.json();
      setPerson(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching person details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='page-content'>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading person details...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className='page-content'>
        <div className="error-container">
          <h2>Person Not Found</h2>
          <p>{error || 'The requested person could not be found.'}</p>
          <button onClick={() => navigate('/people')} className="back-button">
            Back to People
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='page-content'>
      <div className="person-detail">
        <button onClick={() => navigate('/people')} className="back-button">
          ← Back to People
        </button>
        
        <div className="person-detail-content">
          <div className="person-detail-header">
            <div className="person-detail-image">
              <img 
                src={person.image || '/default-avatar.svg'} 
                alt={person.name}
                onError={(e) => {
                  e.target.src = '/default-avatar.svg';
                }}
              />
            </div>
            
            <div className="person-detail-info">
              <h1 className="person-detail-name">{person.name}</h1>
              <p className="person-detail-position">{person.position}</p>
              
              <div className="person-contact-info">
                {person.email && (
                  <div className="contact-detail">
                    <span className="contact-icon">✉️</span>
                    <a href={`mailto:${person.email}`} className="contact-link">
                      {person.email}
                    </a>
                  </div>
                )}
                
                {person.phone && (
                  <div className="contact-detail">
                    <span className="contact-icon">📞</span>
                    <span className="contact-text">{person.phone}</span>
                  </div>
                )}
                
                {person.office && (
                  <div className="contact-detail">
                    <span className="contact-icon">🏢</span>
                    <span className="contact-text">{person.office}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="person-detail-body">
            {person.bio && (
              <div className="detail-section">
                <h3>About</h3>
                <p className="person-bio">{person.bio}</p>
              </div>
            )}
            
            {person.education && (
              <div className="detail-section">
                <h3>Education</h3>
                <p className="person-education">{person.education}</p>
              </div>
            )}
            
            {person.expertise && person.expertise.length > 0 && (
              <div className="detail-section">
                <h3>Areas of Expertise</h3>
                <div className="expertise-list">
                  {person.expertise.map((skill, index) => (
                    <span key={index} className="expertise-tag-large">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            
            {person.joinDate && (
              <div className="detail-section">
                <h3>Laboratory Affiliation</h3>
                <p className="join-date">
                  Joined in {new Date(person.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>
            )}
            
            {person.publications && person.publications.length > 0 && (
              <div className="detail-section">
                <h3>Recent Publications</h3>
                <div className="publications-list">
                  {person.publications.slice(0, 5).map((pub, index) => (
                    <div key={index} className="publication-item">
                      <h4>{pub.title}</h4>
                      <p>{pub.journal} ({pub.year})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {person.awards && person.awards.length > 0 && (
              <div className="detail-section">
                <h3>Awards & Recognition</h3>
                <div className="awards-list">
                  {person.awards.map((award, index) => (
                    <div key={index} className="award-item">
                      <span className="award-title">{award.title}</span>
                      <span className="award-year">({award.year})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
