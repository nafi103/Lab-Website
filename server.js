import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lab-website';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
  console.log(`Database: ${mongoose.connection.db.databaseName}`);
  console.log(`Connection Type: ${MONGODB_URI.includes('mongodb+srv') ? 'Cloud (MongoDB Atlas)' : 'Local MongoDB'}`);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Person Schema
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
    required: false
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

// Routes

// Get all people
app.get('/api/people', async (req, res) => {
  try {
    const people = await Person.find().sort({ createdAt: -1 });
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single person
app.get('/api/people/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new person
app.post('/api/people', async (req, res) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update person
app.put('/api/people/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete person
app.delete('/api/people/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed database with sample data (run once)
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Person.deleteMany({});
    
    const samplePeople = [
      {
        name: "Dr. Sarah Johnson",
        position: "Principal Investigator",
        email: "sarah.johnson@lab.edu",
        phone: "+1 (555) 123-4567",
        bio: "Dr. Johnson leads our research team with over 15 years of experience in computational biology and machine learning applications in genomics.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
        expertise: ["Machine Learning", "Genomics", "Bioinformatics", "Data Science"],
        education: "Ph.D. in Computational Biology, MIT",
        joinDate: new Date('2020-01-15')
      },
      {
        name: "Dr. Michael Chen",
        position: "Senior Research Scientist",
        email: "michael.chen@lab.edu",
        phone: "+1 (555) 234-5678",
        bio: "Specializes in developing novel algorithms for protein structure prediction and drug discovery applications.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        expertise: ["Protein Folding", "Drug Discovery", "Molecular Modeling", "Deep Learning"],
        education: "Ph.D. in Chemical Engineering, Stanford",
        joinDate: new Date('2021-03-10')
      },
      {
        name: "Dr. Emily Rodriguez",
        position: "Postdoctoral Fellow",
        email: "emily.rodriguez@lab.edu",
        bio: "Working on single-cell RNA sequencing analysis and developing computational methods for understanding cellular heterogeneity.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        expertise: ["Single-cell Analysis", "RNA-seq", "Statistical Modeling", "R Programming"],
        education: "Ph.D. in Biostatistics, Harvard",
        joinDate: new Date('2022-09-01')
      },
      {
        name: "Alex Kim",
        position: "Graduate Student",
        email: "alex.kim@lab.edu",
        bio: "PhD candidate focusing on machine learning applications in precision medicine and personalized therapy prediction.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        expertise: ["Machine Learning", "Precision Medicine", "Python", "TensorFlow"],
        education: "M.S. in Computer Science, UC Berkeley",
        joinDate: new Date('2023-08-20')
      },
      {
        name: "Dr. Lisa Thompson",
        position: "Research Associate",
        email: "lisa.thompson@lab.edu",
        phone: "+1 (555) 345-6789",
        bio: "Experienced in experimental design and data analysis for high-throughput biological experiments.",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        expertise: ["Experimental Design", "Data Analysis", "Laboratory Management", "Quality Control"],
        education: "Ph.D. in Molecular Biology, Johns Hopkins",
        joinDate: new Date('2021-11-05')
      }
    ];
    
    const insertedPeople = await Person.insertMany(samplePeople);
    res.status(201).json({
      message: 'Database seeded successfully',
      count: insertedPeople.length,
      people: insertedPeople
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
