import express from 'express';
import Person from '../models/Person.js';

const router = express.Router();

// Get all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find().sort({ createdAt: -1 });
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single person
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update person
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;