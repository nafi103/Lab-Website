import React, { useState, useEffect } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import './Publications.css';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState({});

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/publications`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }
      
      const data = await response.json();
      setPublications(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching publications:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAbstract = (id) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderAuthors = (authors) => {
    return authors.map((author, index) => (
      <span key={index}>
        {author.isLabMember ? (
          <strong className="lab-member">{author.name}</strong>
        ) : (
          <span>{author.name}</span>
        )}
        {index < authors.length - 1 && ", "}
      </span>
    ));
  };

  if (loading) {
    return (
      <LoadingScreen 
        message="Loading Publications" 
        subMessage="Retrieving our latest research papers and scholarly articles..."
      />
    );
  }

  if (error) {
    return (
      <div className='page-content'>
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchPublications} className="retry-button">
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

  // Sort publications by year (newest first)
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

  // Group publications by year
  // ... (keep all code from the top until the return statement)

// Group publications by year (this part stays the same)
const publicationsByYear = [...publications].reduce((acc, pub) => {
    if (!acc[pub.year]) {
        acc[pub.year] = [];
    }
    // Sort publications within the year (optional but good practice)
    acc[pub.year].push(pub);
    return acc;
}, {});

// --- THE FIX IS HERE ---
// 1. Get the keys (the years) from the object.
// 2. Sort these keys in descending numerical order.
const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b - a);

return (
    <div className="page-content">
        <div className="publications-page">
            <div className="publications-header">
                {/* ... (your header code is perfect, no changes needed) ... */}
            </div>

            <div className="publications-content">
                {/* 3. Map over the NEW sorted array of years */}
                {sortedYears.map((year) => (
                    <div key={year} className="year-section">
                        <h2 className="year-header">{year}</h2>
                        {/* 4. Access the publications for that year from the original object */}
                        {publicationsByYear[year].map((publication, index) => (
                            <div
                                key={publication._id || publication.id}
                                className="publication-item"
                                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                            >
                                {/* ... (the rest of your publication item JSX is perfect) ... */}
                                <div className="publication-header">
                                    <div className="publication-type">{publication.type}</div>
                                    <div className="publication-links">
                                        <a
                                            href={`https://doi.org/${publication.doi}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-button doi-link"
                                        >
                                            <span className="link-icon">🔗</span>
                                            DOI
                                        </a>
                                        <a
                                            href={publication.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-button pdf-link"
                                        >
                                            <span className="link-icon">📄</span>
                                            PDF
                                        </a>
                                        {publication.codeUrl && (
                                            <a
                                                href={publication.codeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="link-button code-link"
                                            >
                                                <span className="link-icon">💻</span>
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="publication-title">{publication.title}</h3>

                                <p className="publication-authors">
                                    {renderAuthors(publication.authors)}
                                </p>

                                <div className="publication-details">
                                    <span className="publication-journal">{publication.journal}</span>
                                    <span className="publication-citation">
                                        {publication.year}, Vol. {publication.volume}({publication.issue}), pp. {publication.pages}
                                    </span>
                                </div>

                                {publication.keywords && (
                                    <div className="publication-keywords">
                                        <strong>Keywords:</strong> {publication.keywords.join(", ")}
                                    </div>
                                )}

                                {publication.laySummary && (
                                    <div className="publication-lay-summary">
                                        <strong>Summary:</strong> {publication.laySummary}
                                    </div>
                                )}

                                {publication.imageUrl && (
                                    <div className="publication-image">
                                        <img src={publication.imageUrl} alt={publication.title} />
                                    </div>
                                )}

                                <div className="publication-abstract">
                                    <button
                                        className="abstract-toggle"
                                        onClick={() => toggleAbstract(publication._id || publication.id)}
                                    >
                                        {expandedAbstracts[publication._id || publication.id] ? 'Hide Abstract' : 'Show Abstract'}
                                    </button>
                                    {expandedAbstracts[publication._id || publication.id] && (
                                        <p className="abstract-text">{publication.abstract}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};

export default Publications;