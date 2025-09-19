import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';
import './HomePublicationSection.css';

const HomePublicationSection = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestPublications();
  }, []);

  const fetchLatestPublications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/publications`);
      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }
      const data = await response.json();
      
      // Sort publications: Highlighted first, then by year (newest to oldest)
      const sortedPublications = data.sort((a, b) => {
        if (a.isHighlighted && !b.isHighlighted) return -1;
        if (!a.isHighlighted && b.isHighlighted) return 1;
        return b.year - a.year;
      });
      
      // Take only the first 3 publications for home page
      setPublications(sortedPublications.slice(0, 3));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching publications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllPublications = () => {
    navigate('/publications');
  };

  const renderAuthors = (authors) => {
    const maxAuthors = 3;
    const displayAuthors = authors.slice(0, maxAuthors);
    
    return (
      <span className="publication-authors">
        {displayAuthors.map((author, index) => (
          <span key={index}>
            {author.isLabMember ? (
              <strong className="lab-member">{author.name}</strong>
            ) : (
              <span>{author.name}</span>
            )}
            {index < displayAuthors.length - 1 && ", "}
          </span>
        ))}
        {authors.length > maxAuthors && <span>, et al.</span>}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="home-publication-section">
        <div className="container">
          <LoadingScreen 
            message="Loading Recent Publications" 
            subMessage="Fetching our latest research..."
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-publication-section">
        <div className="container">
          <div className="section-header">
            <h2>Recent Publications</h2>
          </div>
          <div className="error-message">
            <p>Unable to load publications. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-publication-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-content">
            <h2>Recent Publications</h2>
            <p className="section-subtitle">
              Explore our latest research contributions and scholarly articles
            </p>
          </div>
          <button 
            className="view-all-btn"
            onClick={handleViewAllPublications}
          >
            View All Publications
          </button>
        </div>

        {publications.length === 0 ? (
          <div className="empty-state">
            <p>No publications available at the moment.</p>
          </div>
        ) : (
          <div className="publications-grid">
            {publications.map((publication) => (
              <div key={publication._id} className="publication-card">
                {publication.isHighlighted && (
                  <div className="highlight-badge">Featured</div>
                )}
                
                <div className="publication-type">{publication.type}</div>
                
                <h3 className="publication-title">{publication.title}</h3>
                
                <div className="publication-meta">
                  {renderAuthors(publication.authors)}
                </div>
                
                <div className="publication-journal">
                  <span className="journal-name">{publication.journal}</span>
                  <span className="publication-year">({publication.year})</span>
                </div>

                {publication.laySummary && (
                  <p className="publication-summary">
                    {publication.laySummary.length > 120 
                      ? `${publication.laySummary.substring(0, 120)}...` 
                      : publication.laySummary
                    }
                  </p>
                )}

                <div className="publication-links">
                  {publication.doi && (
                    <a 
                      href={`https://doi.org/${publication.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="publication-link doi-link"
                    >
                      DOI
                    </a>
                  )}
                  {publication.pdfUrl && (
                    <a 
                      href={publication.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="publication-link pdf-link"
                    >
                      PDF
                    </a>
                  )}
                  {publication.codeUrl && (
                    <a 
                      href={publication.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="publication-link code-link"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePublicationSection;