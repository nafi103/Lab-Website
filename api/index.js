import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Simple in-line route handlers to avoid import issues
// We'll define routes directly here to avoid serverless import problems

// CORS configuration for separate frontend/backend deployment
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://research-lab-website.netlify.app', // Your Netlify frontend
  'https://*.netlify.app' // Any Netlify domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp(allowedOrigin.replace('*', '.*'));
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    })) {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (only if not already connected)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab-website')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => console.error('MongoDB connection error:', error));
}

// Define schemas directly here to avoid import issues
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: false },
  category: { 
    type: String, 
    required: true,
    enum: ['Research', 'Publication', 'Event', 'Award', 'Conference', 'Collaboration', 'General']
  },
  author: { type: String, required: true },
  image: { type: String, required: false },
  tags: [{ type: String }],
  publishDate: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: false },
  image: { type: String, required: false },
  researchInterests: [{ type: String }],
  education: [{ type: String }],
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    googleScholar: { type: String },
    website: { type: String }
  },
  category: { 
    type: String, 
    required: true,
    enum: ['faculty', 'postdoc', 'phd', 'masters', 'undergraduate', 'alumni']
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  journal: { type: String, required: true },
  year: { type: Number, required: true },
  abstract: { type: String, required: false },
  doi: { type: String, required: false },
  url: { type: String, required: false },
  pdfUrl: { type: String, required: false },
  type: { 
    type: String, 
    required: true,
    enum: ['journal', 'conference', 'book', 'thesis', 'preprint']
  },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  citations: { type: Number, default: 0 }
}, { timestamps: true });

// Create models
const News = mongoose.models.News || mongoose.model('News', newsSchema);
const Person = mongoose.models.Person || mongoose.model('Person', personSchema);
const Publication = mongoose.models.Publication || mongoose.model('Publication', publicationSchema);

// API Routes - defined inline to avoid import issues

// News routes
app.get('/api/news', async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = {};
    
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
    
    const news = await newsQuery;
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// People routes
app.get('/api/people', async (req, res) => {
  try {
    const { category, status } = req.query;
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    } else {
      query.status = 'active';
    }
    
    const people = await Person.find(query).sort({ name: 1 });
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/people/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Publications routes
app.get('/api/publications', async (req, res) => {
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
    
    const publications = await publicationsQuery;
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/publications/:id', async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root route handler
app.get('/', (req, res) => {
  res.json({
    message: 'Research Lab API Server',
    status: 'running',
    endpoints: {
      test: '/api/test',
      health: '/api/health',
      people: '/api/people',
      news: '/api/news',
      publications: '/api/publications'
    },
    timestamp: new Date().toISOString()
  });
});

// Catch all for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

export default app;