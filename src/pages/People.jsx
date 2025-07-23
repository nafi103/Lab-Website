import React, { useState, useEffect } from 'react';
import './People.css';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for development - replace with MongoDB API call
  const mockPeople = [
    {
      _id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Principal Investigator',
      category: 'faculty',
      bio: 'Dr. Johnson leads groundbreaking research in computational biology with over 15 years of experience in the field.',
      email: 'sarah.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      imageUrl: '', // Will use placeholder
      researchInterests: ['Machine Learning', 'Bioinformatics', 'Data Science'],
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      googleScholar: 'https://scholar.google.com/sarahjohnson'
    },
    {
      _id: '2',
      name: 'Dr. Michael Chen',
      title: 'Associate Professor',
      category: 'faculty',
      bio: 'Specializes in artificial intelligence and its applications in healthcare research.',
      email: 'michael.chen@university.edu',
      phone: '+1 (555) 123-4568',
      imageUrl: '',
      researchInterests: ['Artificial Intelligence', 'Healthcare', 'Neural Networks'],
      linkedIn: 'https://linkedin.com/in/michaelchen'
    },
    {
      _id: '3',
      name: 'Emily Rodriguez',
      title: 'PhD Candidate',
      category: 'students',
      bio: 'Research focus on developing novel algorithms for protein structure prediction.',
      email: 'emily.rodriguez@student.university.edu',
      imageUrl: '',
      researchInterests: ['Protein Folding', 'Structural Biology', 'Algorithm Development']
    },
    {
      _id: '4',
      name: 'James Kim',
      title: 'Research Assistant',
      category: 'students',
      bio: 'Undergraduate researcher working on machine learning applications in genomics.',
      email: 'james.kim@student.university.edu',
      imageUrl: '',
      researchInterests: ['Genomics', 'Machine Learning', 'Data Analysis']
    }
  ];

  useEffect(() => {
    // Simulate API call - replace with actual MongoDB API endpoint
    const fetchPeople = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch('/api/people');
        // const data = await response.json();
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPeople(mockPeople);
        setError(null);
      } catch (err) {
        setError('Failed to load team members. Please try again later.');
        console.error('Error fetching people:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const groupPeopleByCategory = (people) => {
    const categories = {
      faculty: [],
      students: [],
      staff: []
    };
    
    people.forEach(person => {
      if (categories[person.category]) {
        categories[person.category].push(person);
      }
    });
    
    return categories;
  };

  const renderPersonCard = (person) => (
    <div key={person._id} className="person-card">
      <div className="person-image">
        {person.imageUrl ? (
          <img src={person.imageUrl} alt={person.name} />
        ) : (
          <div className="person-image placeholder">
            {getInitials(person.name)}
          </div>
        )}
      </div>
      
      <div className="person-name">{person.name}</div>
      <div className="person-title">{person.title}</div>
      
      {person.bio && (
        <div className="person-bio">{person.bio}</div>
      )}
      
      <div className="person-contact">
        {person.email && (
          <a href={`mailto:${person.email}`} className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {person.email}
          </a>
        )}
        
        {person.phone && (
          <a href={`tel:${person.phone}`} className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            {person.phone}
          </a>
        )}
        
        {person.linkedIn && (
          <a href={person.linkedIn} target="_blank" rel="noopener noreferrer" className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        )}
      </div>
      
      {person.researchInterests && person.researchInterests.length > 0 && (
        <div className="research-interests">
          <h4>Research Interests</h4>
          <div className="interests-tags">
            {person.researchInterests.map((interest, index) => (
              <span key={index} className="interest-tag">{interest}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="people-page">
        <div className="people-container">
          <h1>Our Team</h1>
          <div className="loading-state">Loading team members...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="people-page">
        <div className="people-container">
          <h1>Our Team</h1>
          <div className="error-state">{error}</div>
        </div>
      </div>
    );
  }

  const groupedPeople = groupPeopleByCategory(people);

  return (
    <div className="people-page">
      <div className="people-container">
        <h1>Our Team</h1>
        <p className="intro-text">
          Meet the talented researchers, faculty members, and students who drive our lab's success. 
          Our diverse team brings together expertise from multiple disciplines to tackle complex research challenges.
        </p>

        {groupedPeople.faculty.length > 0 && (
          <div className="people-section">
            <h2 className="section-title">Faculty & Research Staff</h2>
            <div className="people-grid">
              {groupedPeople.faculty.map(renderPersonCard)}
            </div>
          </div>
        )}

        {groupedPeople.students.length > 0 && (
          <div className="people-section">
            <h2 className="section-title">Graduate Students & Research Assistants</h2>
            <div className="people-grid">
              {groupedPeople.students.map(renderPersonCard)}
            </div>
          </div>
        )}

        {groupedPeople.staff.length > 0 && (
          <div className="people-section">
            <h2 className="section-title">Administrative Staff</h2>
            <div className="people-grid">
              {groupedPeople.staff.map(renderPersonCard)}
            </div>
          </div>
        )}

        {people.length === 0 && (
          <div className="empty-state">
            No team members found. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
};

export default People;
