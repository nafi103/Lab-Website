import React from 'react';
import './NewsCard.css';

const NewsCard = ({ news, onClick }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="news-card" onClick={() => onClick && onClick(news)}>
      {news.image && (
        <div className="news-card-image">
          <img src={news.image} alt={news.title} />
          {news.featured && (
            <div className="featured-badge">Featured</div>
          )}
        </div>
      )}
      
      <div className="news-card-content">
        <div className="news-card-main">
          <div className="news-card-header">
            <span className="news-category">
              {news.category}
            </span>
            <span className="news-date">{formatDate(news.publishDate)}</span>
          </div>
          
          <h3 className="news-title">{news.title}</h3>
          
          <p className="news-excerpt">
            {news.excerpt || news.content.substring(0, 150) + '...'}
          </p>
        </div>
        
        <div className="news-card-bottom">
          <div className="news-card-footer">
            <div className="news-author">By {news.author}</div>
            {news.readTime && (
              <div className="news-read-time">{news.readTime} min read</div>
            )}
          </div>
          
          {news.tags && news.tags.length > 0 && (
            <div className="news-tags">
              {news.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="news-tag">#{tag}</span>
              ))}
            </div>
          )}
          
          <div className="read-more-hint">
            <span>Click to read full article</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;