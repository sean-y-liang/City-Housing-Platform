const express = require('express');
const cors = require('cors'); // This is important - allows cross origin requests
const path = require('path');
const db = require('./database'); // Import the database pool

const app = express();
const port = 3000; // A free port on the local machine

app.use(cors()); // Use the CORS middleware
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch all properties
app.get('/api/properties', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM property');
    res.json(results);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch pictures for a specific property
app.get('/api/pictures/:pid', async (req, res) => {
    const pid = req.params.pid; // Extract PID from URL
    try {
      const [results] = await db.query('SELECT * FROM pictures WHERE PID = ?', [pid]);
      res.json(results);
    } catch (error) {
      console.error('Error fetching pictures:', error);
      res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
