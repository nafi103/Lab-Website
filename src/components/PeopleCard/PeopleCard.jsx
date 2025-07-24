import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PeopleCard.css';

const PeopleCard = ({ person }) => {
  const navigate = useNavigate();
  
  const {
    _id,
    name,
    position,
    email,
    image,
    expertise
  } = person;

  const handleCardClick = () => {
    navigate(`/people/${_id}`);
  };

  return (
    <div className="people-card" onClick={handleCardClick}>
      <div className="people-card-image">
        <img 
          src={image || '/default-avatar.svg'} 
          alt={name}
          onError={(e) => {
            e.target.src = '/default-avatar.svg';
          }}
        />
      </div>
      
      <div className="people-card-content">
        <h3 className="people-card-name">{name}</h3>
        <p className="people-card-position">{position}</p>
        
        {email && (
          <div className="contact-item">
            <a 
              href={`mailto:${email}`} 
              className="contact-link"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking email
            >
              {email}
            </a>
          </div>
        )}
        
        {expertise && expertise.length > 0 && (
          <div className="expertise-section">
            <div className="expertise-tags">
              {expertise.slice(0, 3).map((skill, index) => (
                <span key={index} className="expertise-tag">{skill}</span>
              ))}
              {expertise.length > 3 && (
                <span className="expertise-tag more">+{expertise.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        <div className="click-hint">
          <span>Click to view details</span>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
