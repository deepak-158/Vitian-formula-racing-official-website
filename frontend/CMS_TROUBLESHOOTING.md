# CMS Configuration Troubleshooting Guide

## ✅ Issues Fixed

### 1. CSP (Content Security Policy) Errors
**Problem:** `Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script`

**Solutions Applied:**
- ✅ Updated `_headers` file with proper CSP directives
- ✅ Added CSP configuration to `netlify.toml`
- ✅ Removed inline CSP meta tags that could conflict
- ✅ Updated to latest stable Decap CMS version (3.1.10)

### 2. Data Structure Issues
**Problem:** JSON file data not available in CMS and updates not syncing

**Solutions Applied:**
- ✅ Created proper `/data/` folder structure for CMS
- ✅ Converted array-based JSON to individual files
- ✅ Built two-way sync scripts (`cms:setup` and `cms:sync`)
- ✅ Fixed team-info.json format for CMS compatibility

## 🔧 Current Configuration

### File Structure
```
/data/                     # CMS data location
├── team-info.json        # Single file config
├── achievements/         # Individual files
├── events/
├── gallery/
├── members/
├── merchandise/
├── news/
├── projects/
├── racing-journey/
└── sponsors/

/frontend/src/data/       # Application data
├── team-info.json        # App format
├── achievements.json     # Arrays
├── events.json
└── ...
```

### Scripts Available
- `npm run cms:setup` - Convert app data to CMS format
- `npm run cms:sync` - Sync CMS changes back to app

## 🚀 Testing the CMS

### Development Mode (localhost)
1. Go to `http://localhost:3000/admin`
2. CMS should load with test backend
3. You can create/edit content without authentication
4. Changes are stored locally for testing

### Production Mode (deployed)
1. CMS requires Netlify Identity setup
2. Users need to be invited to access CMS
3. Changes are committed to your Git repository

## 🐛 Common Issues & Solutions

### Issue: "Config Errors" or CMS won't load
**Check:**
1. Is the server running? (`npm start`)
2. Are there console errors? (Open browser DevTools)
3. Is the config.yml valid YAML?

**Fix:**
```bash
# Validate YAML syntax
cd frontend
node -e "const yaml = require('js-yaml'); const fs = require('fs'); try { yaml.load(fs.readFileSync('public/admin/config.yml', 'utf8')); console.log('YAML is valid'); } catch(e) { console.error('YAML error:', e.message); }"
```

### Issue: "No entries found" in collections
**Check:**
1. Do files exist in `/data/` folders?
2. Are file paths correct in config.yml?

**Fix:**
```bash
# Regenerate CMS data
cd frontend
npm run cms:setup
```

### Issue: Changes in CMS not appearing in app
**Fix:**
```bash
# Sync CMS changes back to app
cd frontend
npm run cms:sync
```

### Issue: CSP errors in browser console
**Check:**
1. Are you accessing via `http://localhost:3000/admin`?
2. Any browser extensions blocking scripts?

**Fix:**
- Try in incognito/private browsing mode
- Disable ad blockers for localhost
- Check browser console for specific CSP violations

## 📝 Configuration Files

### _headers (CSP Configuration)
```
/admin/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://identity.netlify.com https://unpkg.com https://cdn.jsdelivr.net; ...
```

### netlify.toml (Deployment Config)
```toml
[[headers]]
  for = "/admin/*"
  [headers.values]
    Content-Security-Policy = "..."
```

### config.yml (CMS Configuration)
- Backend: git-gateway for production
- Collections: Points to `/data/` folders
- Media: Uses `/public/images/`

## 🆘 Emergency Reset

If nothing works, reset the CMS:

```bash
# 1. Backup your data
cd "c:\Users\dipak\OneDrive\Desktop\racing"
Copy-Item -Recurse data data-backup

# 2. Regenerate everything
cd frontend
npm run cms:setup

# 3. Test in browser
# Go to http://localhost:3000/admin
```

## 📞 Support

If you still encounter issues:
1. Check browser console for error messages
2. Verify all file paths are correct
3. Ensure Node.js scripts run without errors
4. Test in different browsers

The CMS should now be working correctly for both development and production use!
