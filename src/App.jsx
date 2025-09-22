import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import PersonDetail from './components/PersonDetail/PersonDetail'
import NewsDetail from './components/NewsDetail/NewsDetail'
import { Home, About, People, News, Publications } from './pages'
import './App.css'
import './styles/global.css'
import './styles/background.css'

// This is the main App component - basically the heart of my website
// I'm using React Router to handle all the different pages and navigation
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation stays consistent across all pages */}
        <Navbar />
        <Routes>
          {/* Home page - where visitors first land */}
          <Route path="/" element={<Home />} />
          
          {/* News section - I wanted to keep users updated on lab activities */}
          <Route 
            path="/news" 
            element={
              <main className="main-content">
                <div className="container">
                  <News />
                </div>
              </main>
            } 
          />
          
          {/* Publications page - showcasing our research work */}
          <Route 
            path="/publications" 
            element={
              <main className="main-content">
                <div className="container">
                  <Publications />
                </div>
              </main>
            } 
          />
          
          {/* People page - meet the team behind the research */}
          <Route 
            path="/people" 
            element={
              <main className="main-content">
                <div className="container">
                  <People />
                </div>
              </main>
            } 
          />
          
          {/* Individual person detail page - dynamic routing with :id parameter */}
          {/* Individual person detail page - dynamic routing with :id parameter */}
          <Route 
            path="/people/:id" 
            element={
              <main className="main-content">
                <div className="container">
                  <PersonDetail />
                </div>
              </main>
            } 
          />
          
          {/* News detail page - for reading full news articles */}
          <Route 
            path="/news/:id" 
            element={
              <main className="main-content">
                <div className="container">
                  <NewsDetail />
                </div>
              </main>
            } 
          />
          
          {/* About page - telling our story and mission */}
          <Route 
            path="/about" 
            element={
              <main className="main-content">
                <div className="container">
                  <About />
                </div>
              </main>
            } 
          />
        </Routes>
        {/* Footer appears on every page for consistency */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
