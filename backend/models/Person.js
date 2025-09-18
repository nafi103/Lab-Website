import mongoose from 'mongoose';

// Person Schema - extracted from original server.js
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  expertise: [{
    type: String
  }],
  education: {
    type: String,
    required: false
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Person = mongoose.model('Person', personSchema);

export default Person;