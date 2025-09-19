import mongoose from 'mongoose';

// Author subdocument schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isLabMember: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false }); // Disable _id for subdocuments

// Publication Schema
const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: [authorSchema],
  journal: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  volume: {
    type: String,
    required: false
  },
  issue: {
    type: String,
    required: false
  },
  pages: {
    type: String,
    required: false
  },
  doi: {
    type: String,
    required: true,
    unique: true
  },
  pdfUrl: {
    type: String,
    required: false
  },
  codeUrl: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true,
    enum: ['Journal Article', 'Conference Paper', 'Research Article', 'Review Article', 'Book Chapter', 'Preprint']
  },
  abstract: {
    type: String,
    required: false
  },
  laySummary: {
    type: String,
    required: false
  },
  keywords: [{
    type: String
  }],
  imageUrl: {
    type: String,
    required: false
  },
  isHighlighted: {
    type: Boolean,
    default: false
  },
  citationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

// Create indexes for better performance
publicationSchema.index({ year: -1 }); // For sorting by year
publicationSchema.index({ type: 1 }); // For filtering by type
// Note: DOI index is automatically created due to unique: true constraint

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;