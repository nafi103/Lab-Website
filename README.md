# Lab Website

A responsive React website built with Vite, featuring a modern navigation bar and clean design.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern Navigation Bar**: 
  - Logo on the left side
  - Navigation menu on the right (Home, People, News, Publication, Contact)
  - Mobile-friendly hamburger menu
  - Smooth hover effects and animations
- **Built with React + Vite**: Fast development and building
- **Clean UI**: Professional layout suitable for academic/research purposes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

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

### Building for Production

Create a production build:
```bash
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      # Main navigation component
│   └── Navbar.css      # Navigation styles
├── App.jsx             # Main application component
├── App.css             # Global application styles
├── index.css           # Base styles
└── main.jsx            # Application entry point
```

## Technologies Used

- **React**: Component-based UI library
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with Flexbox and responsive design
- **JavaScript (ES6+)**: Modern JavaScript features

## Navigation Features

- **Desktop View**: Horizontal navigation with hover effects
- **Mobile View**: Collapsible hamburger menu
- **Responsive Breakpoints**: Optimized for tablets and mobile devices
- **Accessibility**: Semantic HTML and keyboard navigation support
