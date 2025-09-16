import React, { useEffect } from 'react';
import './NewsModal.css';

const NewsModal = ({ news, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !news) return null;

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Research': '#3B82F6',
      'Publication': '#10B981',
      'Event': '#F59E0B',
      'Award': '#EF4444',
      'Conference': '#8B5CF6',
      'Collaboration': '#EC4899',
      'General': '#6B7280'
    };
    return colors[category] || '#6B7280';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="news-modal-backdrop" onClick={handleBackdropClick}>
      <div className="news-modal">
        <div className="news-modal-header">
          <button className="news-modal-close" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>

        <div className="news-modal-content">
          {news.image && (
            <div className="news-modal-image">
              <img src={news.image} alt={news.title} />
              {news.featured && (
                <div className="featured-badge">Featured</div>
              )}
            </div>
          )}

          <div className="news-modal-body">
            <div className="news-modal-meta">
              <span 
                className="news-category"
                style={{ backgroundColor: getCategoryColor(news.category) }}
              >
                {news.category}
              </span>
              <span className="news-date">{formatDate(news.publishDate)}</span>
            </div>

            <h1 className="news-modal-title">{news.title}</h1>

            <div className="news-modal-author-info">
              <div className="news-author">By {news.author}</div>
              {news.readTime && (
                <div className="news-read-time">{news.readTime} min read</div>
              )}
            </div>

            <div className="news-modal-text">
              {news.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="news-paragraph">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {news.tags && news.tags.length > 0 && (
              <div className="news-modal-tags">
                <h4>Tags:</h4>
                <div className="tags-container">
                  {news.tags.map((tag, index) => (
                    <span key={index} className="news-tag">#{tag}</span>
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

export default NewsModal;