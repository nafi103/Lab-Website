import express from 'express';
import Person from '../models/Person.js';

const router = express.Router();

// Get all people - returns everyone in the lab
router.get('/', async (req, res) => {
  try {
    // Sorting by newest first so new team members appear at the top
    const people = await Person.find().sort({ createdAt: -1 });
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single person by ID - for the detailed person page
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

// Create new person - for adding team members
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson); // 201 = Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 = Bad Request
  }
});

// Update person details - for editing existing team member info
router.put('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc and validate
    );
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete person - when someone leaves the lab
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