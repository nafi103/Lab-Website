import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import routes
import peopleRoutes from './routes/people.js';
import newsRoutes from './routes/news.js';
import publicationsRoutes from './routes/publications.js';

// Load environment variables
dotenv.config();

// ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

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

// Serve static files (for uploaded images)
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab-website')
.then(() => {
  console.log('Connected to MongoDB');
  // Log database info
  const dbName = mongoose.connection.db.databaseName;
  const isAtlas = process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv');
  console.log(`Database: ${dbName}`);
  console.log(`Connection Type: ${isAtlas ? 'Cloud (MongoDB Atlas)' : 'Local'}`);
})
.catch((error) => console.error('MongoDB connection error:', error));

// API Routes
app.use('/api/people', peopleRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/publications', publicationsRoutes);

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Debug: List all routes
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

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;