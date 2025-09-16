import React from 'react';
import './Publications.css';

const Publications = () => {
  // Sample publications data - this could be fetched from an API
  const publications = [
    {
      id: 1,
      title: "Advanced Machine Learning Approaches for Predictive Analytics",
      authors: "Dr. Jane Smith, Prof. John Doe, Dr. Emily Chen",
      journal: "Journal of Artificial Intelligence Research",
      year: "2024",
      type: "Journal Article"
    },
    {
      id: 2,
      title: "Quantum Computing Applications in Cryptography",
      authors: "Prof. Michael Johnson, Dr. Sarah Wilson",
      journal: "Quantum Information Processing",
      year: "2024",
      type: "Conference Paper"
    },
    {
      id: 3,
      title: "Sustainable Energy Systems: A Comprehensive Review",
      authors: "Dr. Robert Brown, Dr. Lisa Wang, Prof. David Lee",
      journal: "Nature Energy",
      year: "2023",
      type: "Review Article"
    },
    {
      id: 4,
      title: "Neural Networks for Climate Modeling",
      authors: "Dr. Amanda Taylor, Prof. Kevin Zhang",
      journal: "Climate Dynamics",
      year: "2023",
      type: "Research Article"
    }
  ];

  return (
    <div className="page-content">
      <div className="publications-page">
        <div className="publications-header">
          <h1>Publications</h1>
          <p>Discover our research publications, papers, and scholarly articles from our ongoing research projects.</p>
          <p>Browse through our academic contributions, research findings, and innovative methodologies.</p>
        </div>
        
        <div className="publications-content">
          {publications.map((publication) => (
            <div key={publication.id} className="publication-item">
              <div className="publication-type">{publication.type}</div>
              <h3 className="publication-title">{publication.title}</h3>
              <p className="publication-authors">{publication.authors}</p>
              <div className="publication-details">
                <span className="publication-journal">{publication.journal}</span>
                <span className="publication-year">({publication.year})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
