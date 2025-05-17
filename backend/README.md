# Racing Club Backend

This backend now acts as a simple static file server for the Racing Club website, serving the frontend build.

## Overview

- No database connection required
- Serves the built frontend application
- Minimal server configuration

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Development mode**
   ```
   npm run dev
   ```

3. **Production build**
   ```
   npm run build
   npm start
   ```

## Data Management

The application now uses a static JSON-based approach:

- All data is stored in JSON files in the frontend's `src/data/` directory
- To update content, edit these JSON files directly and rebuild the frontend
- No database connection is required

## Deployment

1. Build the frontend:
   ```
   cd ../frontend
   npm run build
   ```

2. Build the backend:
   ```
   cd ../backend
   npm run build
   ```

3. Start the server:
   ```
   npm start
   ```

The server will serve the static frontend files from the `../frontend/build` directory.

## Hosting Options

You can host this application on any Node.js hosting service, or use a static site hosting service like:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

For completely static hosting with no backend server, simply deploy the contents of the `frontend/build` directory to your hosting service. 