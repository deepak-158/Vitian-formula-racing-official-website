# CMS Data Management Guide

This document explains how the Netlify CMS integration works with your Racing Team website and how to manage data between the CMS and your application.

## Problem Solved

The original issue was that:
1. JSON file data was not available in the CMS
2. Updates made in the CMS were not reflected in the application

## Solution Overview

We've created a two-way sync system between your application's data structure and Netlify CMS:

- **Application**: Uses JSON arrays in `frontend/src/data/`
- **CMS**: Uses individual JSON files in `data/` folders at the root level

## Directory Structure

```
racing/
├── data/                          # CMS data (individual files)
│   ├── team-info.json            # Single file config
│   ├── achievements/              # Folder-based collections
│   │   ├── 1.json
│   │   ├── 2.json
│   │   └── ...
│   ├── events/
│   ├── gallery/
│   ├── members/
│   ├── merchandise/
│   ├── news/
│   ├── projects/
│   ├── racing-journey/
│   └── sponsors/
└── frontend/
    └── src/
        └── data/                  # Application data (arrays)
            ├── team-info.json
            ├── achievements.json
            ├── events.json
            └── ...
```

## Scripts Available

### 1. `npm run cms:setup`
Converts your application's JSON arrays to individual files for the CMS.
- Run this when setting up the CMS for the first time
- Creates individual files in `/data/` folders from arrays in `/frontend/src/data/`

### 2. `npm run cms:sync`
Syncs changes from CMS back to your application.
- Run this after making changes in the CMS
- Converts individual CMS files back to arrays for your application
- Handles data format differences automatically

## Workflow

### Initial Setup (Already Done)
1. ✅ Created `data/` directory structure
2. ✅ Converted existing JSON arrays to individual files
3. ✅ Updated CMS configuration to point to correct file paths
4. ✅ Set up automatic syncing scripts

### Making Changes via CMS
1. Access your CMS at `/admin` (when deployed)
2. Make changes to any collection or team info
3. Publish changes
4. The GitHub Action will automatically run `npm run cms:sync`
5. Your application data will be updated automatically

### Making Changes via Code
1. Edit files in `frontend/src/data/`
2. Run `npm run cms:setup` to update CMS files
3. Commit and push your changes

## Data Format Differences

### Team Info Description Field
- **Application Format**: Array of strings
  ```json
  "description": [
    "First paragraph text",
    "Second paragraph text"
  ]
  ```
- **CMS Format**: Array of objects
  ```json
  "description": [
    { "paragraph": "First paragraph text" },
    { "paragraph": "Second paragraph text" }
  ]
  ```

The sync scripts handle this conversion automatically.

## Troubleshooting

### CMS shows "No entries found"
1. Check if data files exist in `/data/` folders
2. Run `npm run cms:setup` to recreate CMS files
3. Verify CMS configuration paths in `public/admin/config.yml`

### Changes in CMS not reflecting in app
1. Check if GitHub Action ran successfully
2. Manually run `npm run cms:sync` in frontend directory
3. Verify files in `frontend/src/data/` were updated

### Build failures
1. Ensure all JSON files have valid syntax
2. Check that required fields are present in all files
3. Run local build to identify specific issues

## Technical Details

### CMS Configuration
- Located in `frontend/public/admin/config.yml`
- Uses `git-gateway` backend for GitHub integration
- Points to `/data/` folders at repository root

### Automatic Sync
- GitHub Action triggers on changes to `data/**` files
- Runs sync script and commits changes to `frontend/src/data/`
- Ensures application always has latest CMS data

### File Naming
- Individual files use ID-based naming (e.g., `1.json`, `2.json`)
- Maintains sort order based on ID field
- Falls back to index-based naming if no ID present
