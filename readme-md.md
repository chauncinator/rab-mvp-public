# ReadyAimBid Roofing Estimator MVP

A simple, browser-based commercial roofing estimator that allows users to create and generate PDF estimates.

## Overview

This MVP (Minimum Viable Product) version of the ReadyAimBid Roofing Estimator provides:

- A clean, modern user interface matching the ReadyAimBid brand
- Step-by-step estimate creation process
- Customer information collection
- Roof details specification
- Line-item addition for various scope items
- PDF generation of complete estimates

## Project Structure

```
readyaimbid-estimator/
├── index.html           # Main application HTML
├── styles.css           # CSS styling
├── app.js               # Application logic
└── README.md           # This file
```

## Setup Instructions

### Local Development

1. Clone this repository or download the files
2. Open the folder in your preferred code editor
3. To preview locally:
   - If you have Node.js installed, use a simple server:
     ```
     npx serve
     ```
   - Or use any local development server of your choice
   - Alternatively, you can simply open the `index.html` file in your browser

### Simple Deployment Options

For a quick MVP deployment, you have several straightforward options:

#### 1. Netlify Drop (Easiest)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire project folder
3. Your site will be instantly deployed with a Netlify subdomain

#### 2. GitHub Pages

1. Create a new GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select the main branch as the source
5. Your site will be available at `https://[username].github.io/[repository-name]/`

#### 3. Vercel

1. Sign up/in at [Vercel](https://vercel.com/)
2. Create a new project and connect to your GitHub repository (or use the Vercel CLI)
3. Deploy with default settings

#### 4. Digital Ocean App Platform

1. Sign up/in at [Digital Ocean](https://www.digitalocean.com/)
2. Navigate to the App Platform
3. Create a new app, selecting your GitHub repository
4. Follow the setup wizard, using default settings for a static site

## Future Development

This MVP provides a foundation that can be expanded to include:

- Backend integration with Supabase or similar
- User authentication
- Saving and loading estimates
- Workflow automation with n8n
- Integration with CRM systems
- Material cost calculations based on measurements
- Image/file uploads for roof documentation

## Need Help?

If you need assistance deploying or customizing this MVP, reach out to your development team for support.
