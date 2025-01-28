const express = require('express');
const dotenv = require('dotenv');
const roleRoutes = require('./routes/roleRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API Routes
app.use('/api', roleRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
