// Simple test API for debugging
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Basic route handling
    const { url } = req;
    
    if (url === '/' || url === '/api') {
      return res.status(200).json({
        message: 'Research Lab API Server',
        status: 'running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'missing'
      });
    }
    
    if (url === '/api/test') {
      return res.status(200).json({
        message: 'Test endpoint working!',
        timestamp: new Date().toISOString()
      });
    }
    
    // For now, return mock data for other endpoints
    if (url === '/api/news') {
      return res.status(200).json([
        {
          _id: '1',
          title: 'Sample News Article',
          content: 'This is a sample news article for testing.',
          category: 'Research',
          author: 'Research Team',
          publishDate: new Date().toISOString()
        }
      ]);
    }
    
    if (url === '/api/people') {
      return res.status(200).json([
        {
          _id: '1',
          name: 'Dr. Sample Researcher',
          position: 'Principal Investigator',
          email: 'sample@university.edu',
          category: 'faculty'
        }
      ]);
    }
    
    if (url === '/api/publications') {
      return res.status(200).json([
        {
          _id: '1',
          title: 'Sample Research Publication',
          authors: ['Dr. Sample Researcher'],
          journal: 'Sample Journal',
          year: 2024,
          type: 'journal'
        }
      ]);
    }
    
    // 404 for other routes
    return res.status(404).json({ error: 'Route not found' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}