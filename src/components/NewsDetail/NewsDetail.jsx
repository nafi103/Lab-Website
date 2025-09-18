import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsDetails();
  }, [id]);

  const fetchNewsDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/news/${id}`);
      
      if (!response.ok) {
        throw new Error('News article not found');
      }
      
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching news details:', err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className='page-content'>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading news article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className='page-content'>
        <div className="error-container">
          <h2>News Article Not Found</h2>
          <p>The news article you're looking for doesn't exist or has been removed.</p>
          <div className="error-actions">
            <button onClick={() => navigate('/news')} className="back-button">
              ← Back to News
            </button>
            <button onClick={() => navigate('/')} className="home-button">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='page-content'>
      <div className="news-detail">
        <div className="news-detail-header">
          <button onClick={() => navigate('/news')} className="back-button">
            ← Back to News
          </button>
        </div>

        <article className="news-article">
          {news.image && (
            <div className="news-detail-image">
              <img src={news.image} alt={news.title} />
              {news.featured && (
                <div className="featured-badge">Featured</div>
              )}
            </div>
          )}

          <div className="news-detail-content">
            <div className="news-detail-meta">
              <span 
                className="news-category"
                style={{ backgroundColor: getCategoryColor(news.category) }}
              >
                {news.category}
              </span>
              <span className="news-date">{formatDate(news.publishDate)}</span>
            </div>

            <h1 className="news-detail-title">{news.title}</h1>

            <div className="news-detail-author-info">
              <div className="news-author">By {news.author}</div>
              {news.readTime && (
                <div className="news-read-time">{news.readTime} min read</div>
              )}
            </div>

            <div 
              className="news-detail-text"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {news.tags && news.tags.length > 0 && (
              <div className="news-detail-tags">
                <h4>Tags:</h4>
                <div className="tags-container">
                  {news.tags.map((tag, index) => (
                    <span key={index} className="news-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;