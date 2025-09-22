import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsCard.css';

// News card component - I wanted a clean, readable design for news articles
const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  
  // Helper function to format dates in a human-readable way
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract plain text from HTML content for clean excerpts
  const getPlainTextExcerpt = (htmlContent, maxLength = 150) => {
    // This trick creates a temporary element to strip HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Keep it short and sweet for the card preview
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Navigate to full article when card is clicked
  const handleClick = () => {
    navigate(`/news/${news._id}`);
  };

  return (
    <div className="news-card" onClick={handleClick}>
      {/* News image with optional featured badge */}
      {news.image && (
        <div className="news-card-image">
          <img src={news.image} alt={news.title} />
          {/* Show featured badge for important articles */}
          {news.featured && (
            <div className="featured-badge">Featured</div>
          )}
        </div>
      )}
      
      <div className="news-card-content">
        <div className="news-card-main">
          {/* Category and date info at the top */}
          <div className="news-card-header">
            <span className="news-category">
              {news.category}
            </span>
            <span className="news-date">{formatDate(news.publishDate)}</span>
          </div>
          
          {/* Article title - the main hook to draw readers in */}
          <h3 className="news-title">{news.title}</h3>
          
          {/* Article preview - either custom excerpt or auto-generated from content */}
          <p className="news-excerpt">
            {news.excerpt || getPlainTextExcerpt(news.content)}
          </p>
        </div>
        
        <div className="news-card-bottom">
          {/* Author and reading time info */}
          <div className="news-card-footer">
            <div className="news-author">By {news.author}</div>
            {news.readTime && (
              <div className="news-read-time">{news.readTime} min read</div>
            )}
          </div>
          
          {/* Tags for categorization - limited to 3 for clean design */}
          {news.tags && news.tags.length > 0 && (
            <div className="news-tags">
              {news.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="news-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;