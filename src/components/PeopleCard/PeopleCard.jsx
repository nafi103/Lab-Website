import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PeopleCard.css';

// Individual person card component - I wanted each team member to have their own spotlight
const PeopleCard = ({ person }) => {
  const navigate = useNavigate();
  
  // Destructuring to make the code cleaner and easier to read
  const {
    _id,
    name,
    position,
    email,
    image,
    expertise
  } = person;

  // Navigate to detailed person page when card is clicked
  const handleCardClick = () => {
    navigate(`/people/${_id}`);
  };

  return (
    <div className="people-card" onClick={handleCardClick}>
      {/* Profile image with fallback to default avatar */}
      <div className="people-card-image">
        <img 
          src={image || '/default-avatar.svg'} 
          alt={name}
          onError={(e) => {
            // If image fails to load, show default avatar instead
            e.target.src = '/default-avatar.svg';
          }}
        />
      </div>
      
      <div className="people-card-content">
        <h3 className="people-card-name">{name}</h3>
        <p className="people-card-position">{position}</p>
        
        {/* Email contact - only show if available */}
        {email && (
          <div className="contact-item">
            <a 
              href={`mailto:${email}`} 
              className="contact-link"
              onClick={(e) => e.stopPropagation()} // This prevents the card click when someone clicks the email
            >
              {email}
            </a>
          </div>
        )}
        
        {/* Show expertise tags - limited to 3 for clean design */}
        {expertise && expertise.length > 0 && (
          <div className="expertise-section">
            <div className="expertise-tags">
              {expertise.slice(0, 3).map((skill, index) => (
                <span key={index} className="expertise-tag">{skill}</span>
              ))}
              {/* If there are more than 3 skills, show a count indicator */}
              {expertise.length > 3 && (
                <span className="expertise-tag more">+{expertise.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        {/* Subtle hint to let users know the card is clickable */}
        <div className="click-hint">
          <span>Click to view details</span>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
