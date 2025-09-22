import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Bringing in all my route handlers - keeping things organized
import peopleRoutes from './routes/people.js';
import newsRoutes from './routes/news.js';
import publicationsRoutes from './routes/publications.js';

// Loading up environment variables - keeping secrets safe
dotenv.config();

// This little trick helps me get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup - had to figure this out for deployment headaches!
const allowedOrigins = [
  'http://localhost:5173', // My local dev environment
  'https://research-lab-website.netlify.app', // Production frontend
  'https://*.netlify.app' // Just in case I change the domain later
];

app.use(cors({
  origin: function (origin, callback) {
    // I allow requests with no origin for mobile apps and testing tools
    if (!origin) return callback(null, true);
    
    // Check if the origin is in my allowed list (with wildcard support)
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

// Essential middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files like images from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Connecting to MongoDB - works both locally and with Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab-website')
.then(() => {
  console.log('Connected to MongoDB');
  // I like to see what database I'm connected to
  const dbName = mongoose.connection.db.databaseName;
  const isAtlas = process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv');
  console.log(`Database: ${dbName}`);
  console.log(`Connection Type: ${isAtlas ? 'Cloud (MongoDB Atlas)' : 'Local'}`);
})
.catch((error) => console.error('MongoDB connection error:', error));

// Setting up my API routes - keeping everything organized by resource
app.use('/api/people', peopleRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/publications', publicationsRoutes);

// Quick health check endpoint - useful for monitoring
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Root endpoint for Vercel deployment - shows available endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Research Lab API Server',
    status: 'running',
    endpoints: {
      test: '/api/test',
      news: '/api/news',
      people: '/api/people',
      publications: '/api/publications'
    }
  });
});

// Debug endpoint to see all registered routes - handy during development
app.get('/api/routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push(`${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push(`${Object.keys(handler.route.methods)} ${middleware.regexp}${handler.route.path}`);
        }
      });
    }
  });
  res.json({ routes });
});

// Only start the server locally - Vercel handles this in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Exporting for Vercel serverless deployment
export default app;