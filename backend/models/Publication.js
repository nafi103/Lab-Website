import mongoose from 'mongoose';

// Author subdocument - I wanted to distinguish between lab members and external collaborators
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Author's full name
  },
  isLabMember: {
    type: Boolean,
    required: true,
    default: false // Flag to highlight our lab's contributions
  }
}, { _id: false }); // No need for separate IDs on subdocuments

// Publication model - showcasing our research output
// This is probably one of the most important parts of an academic website
const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // The paper title - needs to be descriptive
  },
  authors: [authorSchema], // Array of all authors
  journal: {
    type: String,
    required: true // Where it was published
  },
  year: {
    type: Number,
    required: true // Publication year for sorting and filtering
  },
  volume: {
    type: String,
    required: false // Journal volume
  },
  issue: {
    type: String,
    required: false // Journal issue number
  },
  pages: {
    type: String,
    required: false // Page range like "123-145"
  },
  doi: {
    type: String,
    required: true,
    unique: true // Digital Object Identifier - should be unique
  },
  pdfUrl: {
    type: String,
    required: false // Link to full paper PDF
  },
  codeUrl: {
    type: String,
    required: false // Link to code repository if available
  },
  type: {
    type: String,
    required: true,
    // Different types of academic publications
    enum: ['Journal Article', 'Conference Paper', 'Research Article', 'Review Article', 'Book Chapter', 'Preprint']
  },
  abstract: {
    type: String,
    required: false // Paper summary
  },
  laySummary: {
    type: String,
    required: false // Plain English explanation for general audience
  },
  keywords: [{
    type: String // Research keywords for categorization
  }],
  imageUrl: {
    type: String,
    required: false // Featured image or figure from the paper
  },
  isHighlighted: {
    type: Boolean,
    default: false // Flag for featuring important publications
  },
  citationCount: {
    type: Number,
    default: 0 // Academic impact metric
  }
}, {
  timestamps: true // Track when publications are added and updated
});

// Database indexes for better query performance
publicationSchema.index({ year: -1 }); // Sorting by year (newest first)
publicationSchema.index({ type: 1 }); // Filtering by publication type
// DOI gets an automatic index because it's unique

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;