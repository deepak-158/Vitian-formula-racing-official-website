# Netlify CMS Setup Guide

Follow these steps to set up Netlify CMS with identity management for your racing team website:

## 1. Deploy your site to Netlify

- Push your code to GitHub/GitLab/BitBucket
- Log in to [Netlify](https://app.netlify.com/)
- Click "New site from Git" and connect your repository
- Follow the steps to deploy

## 2. Enable Netlify Identity

- Go to your site settings in Netlify
- Navigate to "Identity" in the left menu
- Click "Enable Identity"
- Under "Registration preferences," choose "Invite only" to restrict access
- Scroll down to "Services" and enable "Git Gateway" to allow CMS to access Git

## 3. Configure External Providers (Optional)

- If you want to allow login via GitHub or another provider:
  - Scroll down to "External providers" 
  - Click "Add provider" and select your preferred provider
  - Follow the steps to set up OAuth

## 4. Invite Users

- Go to the "Identity" tab
- Click "Invite users"
- Enter the email addresses of team members who should have access
- They'll receive an invitation email with a link to set a password

## 5. Access the CMS

- After deployment, go to your site at `/admin/` (e.g., `https://your-site.netlify.app/admin/`)
- Log in with your invited email and password
- You should now have access to edit the site content

## Updating Content

1. Log in to the admin panel at `/admin/`
2. Select the content type you want to edit (e.g., "Team Members")
3. Make your changes
4. Click "Save" to save your changes
5. Click "Publish" to publish them to the site

## Important Notes

- Any changes made through the CMS are committed directly to your repository
- After publishing changes, Netlify will automatically rebuild and deploy your site
- The site preview may take a minute to update after publishing

For more help, visit [Netlify CMS Documentation](https://www.netlifycms.org/docs/intro/)
