// Sample Express.js routes for People API with MongoDB
// This is a reference implementation for your backend

/*
const express = require('express');
const multer = require('multer');
const path = require('path');
const Person = require('../models/Person'); // Your MongoDB model
const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/people/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET /api/people - Get all people
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isActive: true } : { isActive: true };
    
    const people = await Person.find(filter)
      .sort({ order: 1, name: 1 })
      .lean();
    
    res.json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ error: 'Failed to fetch people' });
  }
});

// GET /api/people/:id - Get person by ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id).lean();
    
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    
    res.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Failed to fetch person' });
  }
});

// POST /api/people - Create new person
router.post('/', async (req, res) => {
  try {
    const personData = req.body;
    
    // Validate required fields
    if (!personData.name || !personData.title || !personData.category || !personData.email) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, title, category, email' 
      });
    }
    
    const person = new Person(personData);
    const savedPerson = await person.save();
    
    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Failed to create person' });
  }
});

// PUT /api/people/:id - Update person
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    
    res.json(person);
  } catch (error) {
    console.error('Error updating person:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Failed to update person' });
  }
});

// DELETE /api/people/:id - Delete person (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

// POST /api/people/:id/image - Upload person image
router.post('/:id/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const imageUrl = `/uploads/people/${req.file.filename}`;
    
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      { imageUrl },
      { new: true }
    );
    
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    
    res.json({ 
      message: 'Image uploaded successfully',
      imageUrl,
      person 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
*/

// Usage in your main app.js file:
/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const peopleRoutes = require('./routes/people');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/lab-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/people', peopleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

// To integrate with your React component, update the useEffect in People.jsx:
/*
import { fetchPeople } from '../utils/peopleApi';

useEffect(() => {
  const loadPeople = async () => {
    try {
      setLoading(true);
      const data = await fetchPeople();
      setPeople(data);
      setError(null);
    } catch (err) {
      setError('Failed to load team members. Please try again later.');
      console.error('Error fetching people:', err);
    } finally {
      setLoading(false);
    }
  };

  loadPeople();
}, []);
*/
