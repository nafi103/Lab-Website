# Lab Website

A modern, responsive React website built with Vite, featuring a complete academic lab website with navigation, people profiles, news, publications, and a backend API server.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern Navigation**: 
  - Logo and branding
  - Multi-page navigation (Home, About, People, News, Publications)
  - Mobile-friendly hamburger menu
  - Smooth hover effects and animations
- **Academic Lab Features**:
  - People profiles with detailed person pages
  - News and announcements section
  - Publications showcase
  - About page for lab information
- **Full-Stack Architecture**: 
  - React frontend with React Router for navigation
  - Express.js backend API
  - MongoDB database integration
- **Modern Styling**: Built with Tailwind CSS for rapid UI development
- **Professional Layout**: Suitable for academic and research institutions

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB (for database functionality)

### Installation

1. Clone the repository or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Running with Backend Server

To run both frontend and backend simultaneously:
```bash
npm run dev:full
```

Or run them separately:
```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend development server  
npm run dev
```

### Building for Production

Create a production build:
```bash
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── Banner/           # Hero/banner component
│   ├── Navbar/           # Main navigation component
│   ├── PeopleCard/       # People profile cards
│   └── PersonDetail/     # Individual person detail view
├── pages/
│   ├── About/            # About page
│   ├── Home/             # Homepage
│   ├── News/             # News and announcements
│   ├── People/           # People directory
│   └── Publications/     # Publications showcase
├── styles/
│   ├── background.css    # Background styling
│   └── global.css        # Global styles
├── App.jsx               # Main application component with routing
├── App.css               # Global application styles
├── index.css             # Base styles with Tailwind imports
└── main.jsx              # Application entry point
```

## Technologies Used

### Frontend
- **React**: Component-based UI library with hooks and modern patterns
- **React Router**: Client-side routing for multi-page navigation
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **JavaScript (ES6+)**: Modern JavaScript features and syntax

### Backend
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **Multer**: Middleware for handling file uploads
- **CORS**: Cross-origin resource sharing support

### Development Tools
- **ESLint**: Code linting and formatting
- **Concurrently**: Run multiple commands simultaneously

## Key Features

### Navigation
- **Multi-page Routing**: Seamless navigation between different sections
- **Responsive Design**: Optimized layouts for all screen sizes
- **Mobile Menu**: Collapsible hamburger menu for mobile devices
- **Accessibility**: Semantic HTML and keyboard navigation support

### Pages
- **Home**: Landing page with hero section and overview
- **About**: Information about the lab and research focus
- **People**: Directory of team members with profile cards
- **News**: Latest announcements and updates
- **Publications**: Showcase of research publications and papers

### Components
- **Reusable Design**: Modular components for consistent UI
- **Profile Management**: Individual person detail pages
- **Banner System**: Customizable hero sections
- **Responsive Cards**: Flexible layout components

## API Endpoints

The backend server provides REST API endpoints for:
- People management and profiles
- News and announcements
- Publications data
- File upload capabilities

## Configuration

The project includes configuration files for:
- **Tailwind CSS**: `tailwind.config.js`
- **Vite**: `vite.config.js` 
- **ESLint**: `eslint.config.js`

## Environment Setup

For full functionality, you may need to configure:
1. **MongoDB Connection**: Set up your database connection string
2. **Environment Variables**: Create a `.env` file for sensitive configuration
3. **File Upload Paths**: Configure storage locations for uploaded files

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run server`: Start backend server only
- `npm run dev:full`: Run both frontend and backend

## Contributing

This project follows modern React and JavaScript best practices:
- Component-based architecture
- Responsive design principles
- Accessible UI components
- Clean code organization

## License

This project is for academic and educational purposes.
