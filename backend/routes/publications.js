import express from 'express';
import Publication from '../models/Publication.js';

const router = express.Router();

// GET /api/publications - Get all publications
router.get('/', async (req, res) => {
  try {
    const { year, type, labMemberOnly } = req.query;
    
    // Build query object
    let query = {};
    
    // Filter by year if provided
    if (year) {
      query.year = parseInt(year);
    }
    
    // Filter by type if provided
    if (type) {
      query.type = type;
    }
    
    // Filter for publications with lab members only
    if (labMemberOnly === 'true') {
      query['authors.isLabMember'] = true;
    }
    
    // Fetch publications sorted by year (newest first), then by creation date
    const publications = await Publication.find(query)
      .sort({ year: -1, createdAt: -1 })
      .lean(); // Use lean() for better performance
    
    res.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ 
      message: 'Error fetching publications', 
      error: error.message 
    });
  }
});

// GET /api/publications/:id - Get single publication by ID
router.get('/:id', async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    
    res.json(publication);
  } catch (error) {
    console.error('Error fetching publication:', error);
    res.status(500).json({ 
      message: 'Error fetching publication', 
      error: error.message 
    });
  }
});

// POST /api/publications - Create new publication
router.post('/', async (req, res) => {
  try {
    const publication = new Publication(req.body);
    const savedPublication = await publication.save();
    res.status(201).json(savedPublication);
  } catch (error) {
    console.error('Error creating publication:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Publication with this DOI already exists',
        error: 'Duplicate DOI'
      });
    }
    
    res.status(400).json({ 
      message: 'Error creating publication', 
      error: error.message 
    });
  }
});

// PUT /api/publications/:id - Update publication
router.put('/:id', async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    
    res.json(publication);
  } catch (error) {
    console.error('Error updating publication:', error);
    res.status(400).json({ 
      message: 'Error updating publication', 
      error: error.message 
    });
  }
});

// DELETE /api/publications/:id - Delete publication
router.delete('/:id', async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({ 
      message: 'Error deleting publication', 
      error: error.message 
    });
  }
});

// GET /api/publications/stats/summary - Get publication statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Publication.aggregate([
      {
        $group: {
          _id: null,
          totalPublications: { $sum: 1 },
          totalCitations: { $sum: '$citationCount' },
          yearsActive: { $addToSet: '$year' },
          publicationTypes: { $addToSet: '$type' }
        }
      },
      {
        $project: {
          _id: 0,
          totalPublications: 1,
          totalCitations: 1,
          yearsActive: { $size: '$yearsActive' },
          publicationTypes: 1
        }
      }
    ]);
    
    const yearlyStats = await Publication.aggregate([
      {
        $group: {
          _id: '$year',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ]);
    
    res.json({
      summary: stats[0] || {
        totalPublications: 0,
        totalCitations: 0,
        yearsActive: 0,
        publicationTypes: []
      },
      byYear: yearlyStats
    });
  } catch (error) {
    console.error('Error fetching publication stats:', error);
    res.status(500).json({ 
      message: 'Error fetching publication statistics', 
      error: error.message 
    });
  }
});

export default router;