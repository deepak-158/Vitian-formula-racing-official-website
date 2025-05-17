// Load environment variables first
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Create Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Basic route
app.get('/api', (req: Request, res: Response) => {
  res.json({ 
    message: 'Welcome to Racing Club API', 
    info: 'This is a static server. All data is stored in JSON files in the frontend.'
  });
});

// Serve static assets - this will serve the frontend build
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

// All other routes serve the frontend app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static server available at http://localhost:${PORT}`);
}); 