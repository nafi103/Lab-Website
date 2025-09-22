import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';
import './HomeNewsSection.css';

// Home page news section - keeping visitors updated with our latest happenings
// I wanted to show the most important and recent news right on the homepage
const HomeNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load news when component mounts
  useEffect(() => {
    fetchLatestNews();
  }, []);

  // Get the latest news from our API
  const fetchLatestNews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/news`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      
      // Smart sorting: featured articles first, then by recency
      const sortedNews = data.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return dateB - dateA; // Newest first
      });
      
      // Only show 4 articles on homepage to keep it clean
      setNews(sortedNews.slice(0, 4));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewAllNews = () => {
    navigate('/news');
  };

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <section className="home-news-section">
      <div className="home-news-container">
        {/* Header Section with Title, Paragraph and Button */}
        <div className="home-news-header">
          <div className="home-news-header-content">
            <h2>Latest News</h2>
            <p>Stay updated with our latest research developments and achievements</p>
          </div>
          <button className="view-all-news-btn" onClick={handleViewAllNews}>
            View All News
          </button>
        </div>

        {/* News Content Section */}
        <div className="home-news-content-wrapper">
          {loading ? (
            <div className="home-news-loading">
              <LoadingScreen message="Loading Latest News" />
            </div>
          ) : error ? (
            <div className="home-news-error">
              <p>Unable to load news at the moment</p>
            </div>
          ) : news.length > 0 ? (
            <div className="home-news-content">
              <div className="home-news-grid">
                {/* Left - Featured/Main News */}
                <div className="home-news-main" onClick={() => handleNewsClick(news[0]._id)}>
                  <div className="home-news-main-image">
                    <img 
                      src={news[0].image || '/default-news-image.jpg'} 
                      alt={news[0].title}
                      onError={(e) => {
                        e.target.src = '/default-news-image.jpg';
                      }}
                    />
                    {news[0].featured && <span className="featured-badge">Featured</span>}
                  </div>
                  <div className="home-news-main-content">
                    <div className="home-news-category">{news[0].category}</div>
                    <h3>{news[0].title}</h3>
                    <p className="home-news-excerpt">{news[0].excerpt}</p>
                    <div className="home-news-meta">
                      <span className="home-news-date">{formatDate(news[0].publishDate)}</span>
                      <span className="home-news-author">By {news[0].author}</span>
                    </div>
                  </div>
                </div>

                {/* Right - Secondary News */}
                <div className="home-news-secondary">
                  {news.slice(1, 4).map((newsItem, index) => (
                    <div 
                      key={newsItem._id} 
                      className="home-news-item"
                      onClick={() => handleNewsClick(newsItem._id)}
                    >
                      <div className="home-news-item-image">
                        <img 
                          src={newsItem.image || '/default-news-image.jpg'} 
                          alt={newsItem.title}
                          onError={(e) => {
                            e.target.src = '/default-news-image.jpg';
                          }}
                        />
                        {newsItem.featured && <span className="featured-badge-small">Featured</span>}
                      </div>
                      <div className="home-news-item-content">
                        <div className="home-news-category">{newsItem.category}</div>
                        <h4>{newsItem.title}</h4>
                        <div className="home-news-meta">
                          <span className="home-news-date">{formatDate(newsItem.publishDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="home-news-empty">
              <p>No news articles available at the moment</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeNewsSection;