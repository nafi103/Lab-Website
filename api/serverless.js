import mongoose from 'mongoose';

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
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
    isConnected = false;
    throw error;
  }
};

// Define schemas - simplified
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

// Create models only if they don't exist
const News = mongoose.models.News || mongoose.model('News', newsSchema);
const Person = mongoose.models.Person || mongoose.model('Person', personSchema);
const Publication = mongoose.models.Publication || mongoose.model('Publication', publicationSchema);

// Main serverless function handler
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  try {
    // Root endpoint
    if (url === '/' || url === '/api') {
      return res.status(200).json({
        message: 'Research Lab API Server',
        status: 'running',
        endpoints: {
          test: '/api/test',
          news: '/api/news',
          people: '/api/people',
          publications: '/api/publications'
        },
        timestamp: new Date().toISOString(),
        mongodb_configured: !!process.env.MONGODB_URI,
        database_connected: isConnected
      });
    }
    
    // Test endpoint - no database needed
    if (url === '/api/test') {
      return res.status(200).json({
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        method: method,
        mongodb_configured: !!process.env.MONGODB_URI,
        database_connected: isConnected
      });
    }
    
    // For database endpoints, connect first
    await connectDB();
    
    // News endpoints
    if (url === '/api/news') {
      if (method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
      const { category, featured, limit } = req.query;
      let query = {};
      
      // Don't filter by status for now - let's see all news items
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (featured === 'true') {
        query.featured = true;
      }
      
      console.log('News query:', query);
      
      let newsQuery = News.find(query).sort({ publishDate: -1 });
      
      if (limit) {
        newsQuery = newsQuery.limit(parseInt(limit));
      }
      
      const news = await newsQuery.lean().exec();
      console.log('News results:', news.length, 'items found');
      
      return res.status(200).json({
        success: true,
        count: news.length,
        data: news,
        query: query
      });
    }
    
    // Single news item
    if (url.startsWith('/api/news/')) {
      const id = url.split('/api/news/')[1];
      const news = await News.findById(id).lean();
      
      if (!news) {
        return res.status(404).json({ error: 'News not found' });
      }
      
      return res.status(200).json(news);
    }
    
    // People endpoints
    if (url === '/api/people') {
      if (method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
      const { category, status } = req.query;
      let query = {};
      
      // Don't filter by status for now - let's see all people
      if (category && category !== 'all') {
        query.category = category;
      }
      
      console.log('People query:', query);
      
      const people = await Person.find(query).sort({ name: 1 }).lean();
      console.log('People results:', people.length, 'items found');
      
      return res.status(200).json({
        success: true,
        count: people.length,
        data: people,
        query: query
      });
    }
    
    // Single person
    if (url.startsWith('/api/people/')) {
      const id = url.split('/api/people/')[1];
      const person = await Person.findById(id).lean();
      
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      
      return res.status(200).json(person);
    }
    
    // Publications endpoints
    if (url === '/api/publications') {
      if (method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
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
      
      const publications = await publicationsQuery.lean().exec();
      return res.status(200).json(publications);
    }
    
    // Single publication
    if (url.startsWith('/api/publications/')) {
      const id = url.split('/api/publications/')[1];
      const publication = await Publication.findById(id).lean();
      
      if (!publication) {
        return res.status(404).json({ error: 'Publication not found' });
      }
      
      return res.status(200).json(publication);
    }
    
    // 404 for unknown routes
    return res.status(404).json({ error: 'Route not found', url: url });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      url: url,
      timestamp: new Date().toISOString()
    });
  }
}