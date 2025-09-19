import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import peopleRoutes from '../backend/routes/people.js';
import newsRoutes from '../backend/routes/news.js';
import publicationsRoutes from '../backend/routes/publications.js';

// Load environment variables
dotenv.config();

const app = express();

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

// API Routes
app.use('/api/people', peopleRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/publications', publicationsRoutes);

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

// Catch all for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

export default app;