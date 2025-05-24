# Netlify Identity Setup Guide

This guide will help you set up Netlify Identity for the Racing Team CMS admin authentication.

## Prerequisites

1. A Netlify account
2. Your site deployed to Netlify
3. Access to your Netlify site dashboard

## Step 1: Enable Netlify Identity

1. Go to your Netlify site dashboard
2. Navigate to **Identity** in the left sidebar
3. Click **Enable Identity**
4. Your Identity service is now active

## Step 2: Configure Identity Settings

### Basic Settings
1. In the Identity tab, click **Settings and usage**
2. Under **Registration preferences**, select **Invite only** (recommended for admin-only access)
3. Under **Email templates**, customize the invitation and confirmation emails if desired

### External Providers (Optional)
1. In Identity settings, go to **External providers**
2. Enable providers like Google, GitHub, etc. if you want social login
3. Configure the OAuth settings for each provider

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local` in your frontend folder:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local`:
   ```env
   REACT_APP_NETLIFY_SITE_URL=https://your-actual-site-name.netlify.app
   REACT_APP_ADMIN_EMAILS=your-admin@email.com,another-admin@email.com
   ADMIN_EMAILS=your-admin@email.com,another-admin@email.com
   ```

3. In your Netlify site dashboard, go to **Site configuration** > **Environment variables**
4. Add the server-side environment variable:
   - **Key**: `ADMIN_EMAILS`
   - **Value**: `your-admin@email.com,another-admin@email.com`

## Step 4: Invite Admin Users

1. In your Netlify Identity dashboard, click **Invite users**
2. Enter the email addresses of users who should have admin access
3. These users will receive invitation emails
4. Make sure these email addresses match those in your `ADMIN_EMAILS` environment variable

## Step 5: Set Admin Roles (Optional)

For more advanced role management:

1. After a user accepts their invitation, go to the Identity dashboard
2. Click on the user
3. In the **App metadata** section, add:
   ```json
   {
     "roles": ["admin"]
   }
   ```
4. Save the changes

## Step 6: Test the Authentication

1. Deploy your site with the new changes
2. Navigate to `/admin/login` on your site
3. Click "Login with Netlify Identity"
4. Use an invited admin account to log in
5. You should be redirected to the admin dashboard

## Security Features

- **Invite-only**: Only invited users can create accounts
- **Admin verification**: Users must be in the admin emails list or have admin role
- **JWT tokens**: Secure token-based authentication
- **Automatic logout**: Non-admin users are logged out immediately

## Troubleshooting

### Users can't access admin after login
- Check that their email is in the `ADMIN_EMAILS` environment variable
- Verify the environment variable is set both locally and on Netlify
- Ensure the email address matches exactly (case-sensitive)

### Identity widget not appearing
- Check that the Netlify Identity script is included in `public/index.html`
- Verify your site URL is correct in the environment variables
- Check browser console for JavaScript errors

### Registration not working
- Ensure "Invite only" is enabled in Netlify Identity settings
- Users must be invited through the Netlify dashboard first

## Production Deployment

Before going to production:

1. Review and update admin email addresses
2. Set secure environment variables on Netlify
3. Test the complete authentication flow
4. Consider setting up email templates for a professional look
5. Review user roles and permissions

## Additional Security

For enhanced security in production:

1. Enable email confirmation requirements
2. Set up password policies in Identity settings
3. Monitor user access through Netlify logs
4. Regularly review and update admin user list
5. Consider implementing session timeouts

## Support

If you encounter issues:
1. Check Netlify Function logs in your site dashboard
2. Review browser console for client-side errors
3. Verify all environment variables are correctly set
4. Test with a fresh invitation to a new email address
