import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Get all news articles with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = {}; // Start with empty query object
    
    // Filter by category if specified (and not 'all')
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Show only featured articles if requested
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Build the query with sorting (newest first)
    let newsQuery = News.find(query).sort({ publishDate: -1 });
    
    // Limit results if specified (useful for homepage)
    if (limit) {
      newsQuery = newsQuery.limit(parseInt(limit));
    }
    
    const news = await newsQuery;
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get individual news article by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new news article - for adding fresh content
router.post('/', async (req, res) => {
  try {
    const news = new News(req.body);
    const savedNews = await news.save();
    res.status(201).json(savedNews); // 201 = Successfully created
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 = Bad request
  }
});

// Update news article
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete news article
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get news categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await News.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;