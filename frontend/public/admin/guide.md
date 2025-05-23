# VIT Racing Team - Content Management System

Our custom CMS lets you manage all website content without Content Security Policy (CSP) issues.

## Using the Web CMS

1. **Access the Admin Panel**
   - Go to your website URL + `/admin`
   - You'll see the Content Manager interface

2. **Choose Content Type**
   - Select the type of content you want to edit from the left sidebar:
     - Team Members
     - Achievements 
     - Events
     - Gallery
     - Merchandise
     - News
     - Projects
     - Racing Journey
     - Sponsors
     - Team Info

3. **Edit Content**
   - Click on any item in the list to edit it
   - Make your changes in the form fields
   - Click "Update Item" to save your changes to that item

4. **Add New Content**
   - Click the "+ New Item" button at the top
   - Fill in the details for the new item
   - Click "Update Item" to save

5. **Delete Content**
   - Select the item you want to delete
   - Click the "Delete" button (red button)
   - Confirm the deletion when prompted

6. **Save All Changes**
   - After making all your edits, additions, or deletions
   - Click the "Save All Changes" button at the top
   - Wait for the confirmation that all changes are saved

## Important Notes

- Changes aren't permanently saved until you click "Save All Changes"
- If automatic save fails, you'll be prompted to download a backup JSON file
- Upload the file to your site's repository manually if needed

## Alternative Methods

### Command Line Tool
For team members only, you can use the CLI tool:

```
npm run update-members
```

### Direct Editing
You can also edit any JSON file directly:

1. Navigate to: `src/data/[filename].json`
2. Make your changes following the existing format
3. Save the file
4. Run `npm run copy-data` to copy the updated data to the build directory

## Help and Support

If you need assistance with managing website content, please contact the site administrator.

If you need assistance with managing team members data, please contact the site administrator.
