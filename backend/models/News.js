import mongoose from 'mongoose';

// News Schema - extracted from original server.js
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Research', 'Publication', 'Event', 'Award', 'Conference', 'Collaboration', 'General']
  },
  author: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  tags: [{
    type: String
  }],
  publishDate: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number, // in minutes
    required: false
  }
}, {
  timestamps: true
});

const News = mongoose.model('News', newsSchema);

export default News;