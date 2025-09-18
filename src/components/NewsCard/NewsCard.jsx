import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPlainTextExcerpt = (htmlContent, maxLength = 150) => {
    // Create a temporary div to extract text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Return truncated plain text
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  const handleClick = () => {
    navigate(`/news/${news._id}`);
  };

  return (
    <div className="news-card" onClick={handleClick}>
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
            {news.excerpt || getPlainTextExcerpt(news.content)}
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
        </div>
      </div>
    </div>
  );
};

export default NewsCard;