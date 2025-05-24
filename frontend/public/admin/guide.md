# VIT Bhopal Racing Team - CMS Guide

## Overview

The VIT Bhopal Racing Team website features a dual CMS system designed to accommodate different user needs and technical expertise levels.

## CMS Options

### 1. Simple CMS
**Best for:** Quick data viewing, content browsing, and basic data management

**Features:**
- 📊 **Data Visualization**: Clean, tabular view of all content
- 🔍 **Search & Filter**: Easy navigation through content sections
- 📥 **Export**: Download data as JSON files
- 👁️ **Preview**: View content details without editing
- 🚀 **Fast Access**: No authentication required for development

### 2. Advanced CMS (Decap CMS)
**Best for:** Full content management, editing, and publishing

**Features:**
- ✏️ **Rich Editor**: Full-featured content creation and editing
- 🖼️ **Media Management**: Upload and organize images
- 🔄 **Git Integration**: Version control and collaboration
- 🔐 **Authentication**: Secure access control
- 📝 **Markdown Support**: Rich text editing capabilities

## Getting Started

### For Simple CMS:
1. Navigate to `/admin` or `/admin/simple-cms.html`
2. Select a content section from the navigation
3. Use the table to browse content
4. Click actions to view details or export data

### For Advanced CMS:
1. Navigate to `/admin` and select "Advanced CMS"
2. **Development**: Automatically uses test backend
3. **Production**: Requires Netlify Identity authentication
4. Choose a collection to manage
5. Use the rich editor for content creation/editing

## Quick Reference

### URLs:
- **Main CMS**: `/admin`
- **Simple CMS**: `/admin/simple-cms.html`
- **Advanced CMS**: `/admin?mode=advanced`

---

*Last Updated: May 2025*
