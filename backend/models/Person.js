import mongoose from 'mongoose';

// Person model - defining the structure for team member data
// I moved this from server.js to keep things organized
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Everyone needs a name!
  },
  position: {
    type: String,
    required: true // Job title or role in the lab
  },
  email: {
    type: String,
    required: true,
    unique: true // Each person should have a unique email
  },
  phone: {
    type: String,
    required: false // Phone is optional - some people prefer privacy
  },
  bio: {
    type: String,
    required: false // Not everyone likes writing bios
  },
  image: {
    type: String,
    required: false // Profile picture path - defaults to avatar if not provided
  },
  expertise: [{
    type: String // Array of skills/expertise areas
  }],
  education: {
    type: String,
    required: false // Academic background info
  },
  joinDate: {
    type: Date,
    default: Date.now // When they joined the lab
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Person = mongoose.model('Person', personSchema);

export default Person;