import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://research-lab-website.netlify.app',
    'https://*.netlify.app'
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB connection with better error handling
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Define schemas
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  excerpt: String,
  category: String,
  author: String,
  image: String,
  tags: [String],
  publishDate: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  status: { type: String, default: 'published' }
}, { timestamps: true });

const personSchema = new mongoose.Schema({
  name: String,
  position: String,
  email: String,
  bio: String,
  image: String,
  researchInterests: [String],
  education: [String],
  socialLinks: {
    linkedin: String,
    twitter: String,
    googleScholar: String,
    website: String
  },
  category: String,
  status: { type: String, default: 'active' }
}, { timestamps: true });

const publicationSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  journal: String,
  year: Number,
  abstract: String,
  doi: String,
  url: String,
  pdfUrl: String,
  type: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  citations: { type: Number, default: 0 }
}, { timestamps: true });

// Models
const News = mongoose.models.News || mongoose.model('News', newsSchema);
const Person = mongoose.models.Person || mongoose.model('Person', personSchema);
const Publication = mongoose.models.Publication || mongoose.model('Publication', publicationSchema);

// Middleware to ensure DB connection
const ensureConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed', 
      message: error.message 
    });
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Research Lab API Server',
    status: 'running',
    endpoints: {
      test: '/api/test',
      news: '/api/news',
      people: '/api/people',
      publications: '/api/publications'
    },
    timestamp: new Date().toISOString(),
    database: isConnected ? 'connected' : 'disconnected'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    database: isConnected ? 'connected' : 'disconnected'
  });
});

// News endpoints
app.get('/api/news', ensureConnection, async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = { status: 'published' };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    let newsQuery = News.find(query).sort({ publishDate: -1 });
    
    if (limit) {
      newsQuery = newsQuery.limit(parseInt(limit));
    }
    
    const news = await newsQuery.exec();
    res.json(news);
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ error: 'Failed to fetch news', message: error.message });
  }
});

app.get('/api/news/:id', ensureConnection, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news item', message: error.message });
  }
});

// People endpoints
app.get('/api/people', ensureConnection, async (req, res) => {
  try {
    const { category, status } = req.query;
    let query = { status: status || 'active' };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const people = await Person.find(query).sort({ name: 1 });
    res.json(people);
  } catch (error) {
    console.error('People API error:', error);
    res.status(500).json({ error: 'Failed to fetch people', message: error.message });
  }
});

app.get('/api/people/:id', ensureConnection, async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch person', message: error.message });
  }
});

// Publications endpoints
app.get('/api/publications', ensureConnection, async (req, res) => {
  try {
    const { type, year, featured, limit } = req.query;
    let query = {};
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (year) {
      query.year = parseInt(year);
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    let publicationsQuery = Publication.find(query).sort({ year: -1, title: 1 });
    
    if (limit) {
      publicationsQuery = publicationsQuery.limit(parseInt(limit));
    }
    
    const publications = await publicationsQuery.exec();
    res.json(publications);
  } catch (error) {
    console.error('Publications API error:', error);
    res.status(500).json({ error: 'Failed to fetch publications', message: error.message });
  }
});

app.get('/api/publications/:id', ensureConnection, async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch publication', message: error.message });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;