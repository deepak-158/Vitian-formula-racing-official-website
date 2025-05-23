# Team Members Admin Management

We've implemented a custom CMS solution for managing team members data that works without Content Security Policy (CSP) issues.

## Option 1: Use the Custom Web CMS

We've created a browser-based CMS just for your team members:

1. Go to your website URL + `/admin`
2. You'll see the Team Members Editor interface
3. Edit members directly in your browser:
   - Click any member in the sidebar to edit them
   - Use the "+ New Member" button to add new members
   - Use "Delete Member" to remove team members
   - Click "Save All Changes" when you're done

## Option 2: Use the CLI Tool

For command-line users, we've created a terminal tool:

1. Open a terminal in the project root directory
2. Run the following command:
   ```
   npm run update-members
   ```
3. Follow the on-screen prompts to:
   - View all members
   - Add a new member
   - Edit an existing member
   - Delete a member

## Option 3: Edit the JSON File Directly

You can also edit the members.json file directly:

1. Navigate to: `src/data/members.json`
2. Make your changes following the existing format
3. Save the file
4. Run `npm run copy-data` to copy the updated data to the build directory

## File Structure

The members.json file has the following structure:

```json
[
  {
    "id": "1",
    "name": "Team Member Name",
    "role": "Team Role",
    "bio": "Short biography of the team member",
    "image_url": "/path/to/image.jpg",
    "social_links": {
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "https://twitter.com/username",
      "github": "https://github.com/username"
    }
  },
  // Additional members...
]
```

## Help and Support

If you need assistance with managing team members data, please contact the site administrator.

If you need assistance with managing team members data, please contact the site administrator.
