# Vitian Formula Racing Website

A modern, responsive website for the Vitian Formula Racing team built with React, TypeScript, and Tailwind CSS.

![Vitian Formula Racing Logo](/frontend/public/images/logo/vitian-formula-racing-logo.svg)

## 🚀 Live Demo

[Visit the website](https://your-racing-website-url.com) - Replace with your actual deployed website URL

## ✨ Features

- **Responsive Design**: Looks great on all devices - mobile, tablet, and desktop
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Performance Optimized**: Fast loading times and optimized assets
- **User-friendly Navigation**: Intuitive site structure
- **Content Management**: Easy-to-update content through JSON data files

### 📄 Pages

- **Home**: Team overview and latest updates
- **About**: Team history and mission statement
- **Team**: Profiles of team members
- **Cars & Projects**: Showcase of racing vehicles and technical projects
- **Events**: Calendar of upcoming and past racing events
- **Gallery**: Photos and videos from races and events
- **Sponsors**: Information about team sponsors and sponsorship opportunities
- **Merchandise**: Team merchandise shop
- **Contact**: Contact form and information

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Build Tool**: Create React App
- **Deployment**: Netlify

## 🏗️ Project Structure

```
frontend/
├── public/            # Static files
│   ├── images/        # Image assets
│   └── index.html     # HTML entry point
├── src/
│   ├── components/    # React components
│   ├── context/       # React context providers
│   ├── data/          # JSON data files
│   ├── pages/         # Page components
│   ├── services/      # Service functions
│   └── utils/         # Utility functions
├── package.json       # Project dependencies
└── tailwind.config.js # Tailwind configuration
```

## 📊 Data Management

This project uses JSON files for data management:

- Data is stored in JSON files in the `src/data/` directory
- All data access is handled through the `dataService.ts` service
- To update content, edit the JSON files directly

### Data Files:
- `members.json`: Team member information
- `projects.json`: Car and project details
- `events.json`: Racing events
- `sponsors.json`: Sponsor information
- `gallery.json`: Image gallery items
- `merchandise.json`: Merchandise items
- And more...

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/vitian-formula-racing.git
   cd vitian-formula-racing/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## 🔧 Available Scripts

- `npm start`: Run the app in development mode
- `npm test`: Run tests
- `npm run build`: Build the app for production
- `npm run eject`: Eject from Create React App (one-way operation)

## 📦 Deployment

1. Build the project
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the contents of the `build` directory to your hosting provider

### Recommended Hosting Services:
- Netlify (current deployment)
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📝 Image Management

- Place images in the `/public/images/` directory organized by category
- For team member images, use the `/public/images/team/` directory
- Reference images in your code with paths like `/images/team/member.png`

For more details, see [IMAGE_MANAGEMENT.md](/frontend/IMAGE_MANAGEMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or feedback, please contact: contact@vitianformularacing.edu

---

© 2025 Vitian Formula Racing. All rights reserved.
