import mongoose from 'mongoose';

// News model - for all lab announcements, updates, and articles
// I wanted to keep our community informed about what's happening
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Every article needs a catchy title
  },
  content: {
    type: String,
    required: true // The main article content
  },
  excerpt: {
    type: String,
    required: false // Optional summary for previews
  },
  category: {
    type: String,
    required: true,
    // I predefined categories to keep things organized
    enum: ['Research', 'Publication', 'Event', 'Award', 'Conference', 'Collaboration', 'General']
  },
  author: {
    type: String,
    required: true // Who wrote this article?
  },
  image: {
    type: String,
    required: false // Featured image for the article
  },
  tags: [{
    type: String // Hashtag-style tags for better categorization
  }],
  publishDate: {
    type: Date,
    default: Date.now // When this was published
  },
  featured: {
    type: Boolean,
    default: false // Special flag for highlighting important articles
  },
  readTime: {
    type: Number, // Reading time in minutes - helps set expectations
    required: false
  }
}, {
  timestamps: true // Track when articles are created and updated
});

const News = mongoose.model('News', newsSchema);

export default News;