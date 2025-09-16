import React, { useState, useEffect } from 'react';
import NewsCard from '../../components/NewsCard';
import NewsModal from '../../components/NewsModal';
import LoadingScreen from '../../components/LoadingScreen';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      fetchNews();
      fetchCategories();
      setIsInitialLoad(false);
    } else {
      // For category changes, show smooth transition
      setIsUpdating(true);
      setTimeout(() => {
        fetchNews();
      }, 150); // Small delay for smooth transition
    }
  }, [selectedCategory]);

  const fetchNews = async () => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      const response = await fetch(
        `http://localhost:5000/api/news${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setIsUpdating(false);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/news/categories/all');
      if (response.ok) {
        const data = await response.json();
        setCategories(['all', ...data]);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  if (loading) {
    return (
      <LoadingScreen 
        message="Loading Latest News" 
        subMessage="Fetching the most recent updates and developments from our laboratory..."
      />
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <div className="news-page">
          <div className="news-header">
            <h1>Latest News</h1>
            <p>Stay updated with the latest developments and achievements from our research laboratory.</p>
          </div>
          <div className="error-message">
            Error loading news: {error}
            <br />
            <span className="error-hint">Make sure the server is running on port 5000</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="news-page">
        <div className="news-header">
          <h1>Latest News</h1>
          <p>Stay updated with the latest developments and achievements from our research laboratory.</p>
        </div>

        <div className="news-filters">
          <div className="category-filters">
            <span className="filter-label">Filter by category:</span>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All News' : category}
              </button>
            ))}
          </div>
        </div>

        <div className={`news-content ${isUpdating ? 'updating' : 'updated'}`}>
          {news.length === 0 ? (
            <div className="no-news">
              <h3>No news articles found</h3>
              <p>
                {selectedCategory === 'all' 
                  ? 'No news articles have been published yet.' 
                  : `No news articles found in the "${selectedCategory}" category.`
                }
              </p>
              <p className="hint">
                Add some news articles to the database to see them here!
              </p>
            </div>
          ) : (
            <div className="news-grid">
              {news.map((newsItem) => (
                <NewsCard 
                  key={newsItem._id} 
                  news={newsItem} 
                  onClick={handleNewsClick}
                />
              ))}
            </div>
          )}
        </div>

        <NewsModal 
          news={selectedNews}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default News;
