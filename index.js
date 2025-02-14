const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const roleRoutes = require('./routes/roleRoutes');
const user_routes = require('./routes/user_routes')
const article_routes=require("./routes/article_routes")
const comment_routes=require("./routes/comment_routes")

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes (you can modify this to restrict allowed origins)
app.use(cors());

// Middleware
app.use(express.json());

// API Routes
app.use('/api', roleRoutes);
app.use('/user', user_routes);
app.use('/article', article_routes);
app.use('/comment', comment_routes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
