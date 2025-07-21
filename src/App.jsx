import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home, About, People, News, Publications } from './pages'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/people" element={<People />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
