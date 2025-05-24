# Racing Team CMS

This custom Content Management System (CMS) allows you to edit and manage all the data for your racing team website.

## Features

- **JSON Data Editing**: Edit all data in JSON format directly in the browser
- **Automatic JSON Downloads**: After saving changes, JSON files are automatically downloaded for backup
- **Image Upload**: Upload images for team members, projects, events, etc.
- **Admin Authentication**: Secure login system to protect your data
- **Data Refresh**: Automatic refresh of data when changes are made

## Getting Started

### Running the CMS

1. Make sure you're in the frontend directory
2. Run the CMS server:
   ```
   npm run cms
   ```
   This syncs the data directories and starts the server.

### Login

1. Navigate to `/admin/login` in your browser
2. Enter the default credentials:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to the admin dashboard

### Editing Content

1. Use the sidebar navigation to select the type of content you want to edit
2. Make your changes in the JSON editor
3. Click "Save Changes" to save and download the updated JSON
4. Your changes will be immediately reflected on the website

### Uploading Images

1. Navigate to the content type where you want to add images
2. Click the "Image Uploader" tab
3. Drag and drop or select images to upload
4. Images will be saved to the appropriate folder

## Data Structure

All website data is stored in JSON files in the `frontend/src/data` directory:

- `members.json`: Team member information
- `events.json`: Racing events and competitions
- `projects.json`: Racing projects and developments
- `sponsors.json`: Sponsor information
- `news.json`: News articles
- `achievements.json`: Team achievements
- `gallery.json`: Gallery images
- `merchandise.json`: Merchandise items
- `racing-journey.json`: Racing team journey timeline
- `team-info.json`: General team information

## Troubleshooting

If you encounter issues with data not showing up in the CMS:

1. **Verify Data Files**:
   - Check that your JSON files exist in `src/data/` directory
   - Run the sync script manually: `npm run sync-data`

2. **Server Issues**:
   - Restart the server: `npm run server`
   - Try running the full dev environment: `npm run dev`

3. **Data Path Issues**:
   - The CMS first tries to load from `/src/data/` and falls back to `/data/`
   - If files aren't found in either location, check your directory structure

## Additional Commands

- `npm run dev` - Starts both the React development server and backend server
- `npm run sync-data` - Manually sync data between src/data and public/data
- `npm run start:prod` - Build the production app and start the server

## Data Flow

When you save changes in the CMS:

1. Data is saved to `src/data/*.json` files
2. The files are copied to `public/data/*.json`
3. JSON files are downloaded to your computer as a backup
4. The frontend automatically loads the most up-to-date data

## Troubleshooting

If changes are not appearing on the website:

1. Try refreshing the browser cache (Ctrl+F5)
2. Click the "Refresh Data" button in the admin header
3. Check the browser console for any errors

## Development and Customization

To modify the CMS:

1. Server-side code is in the `server` directory
2. Admin components are in `src/components/admin`
3. Admin pages are in `src/pages/admin`
4. Admin services are in `src/services/adminCmsService.ts`

## Running the CMS Locally

```bash
# Install dependencies
npm install

# Run development server with CMS
npm run dev

# Build for production
npm run build
```

## Security Notes

This CMS uses a simple authentication system. In a production environment, you should:

1. Change the default credentials
2. Implement proper authentication (JWT, OAuth, etc.)
3. Add rate limiting to prevent brute-force attacks
4. Consider using HTTPS for all connections
