import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import People from './pages/People'
import News from './pages/News'
import Articles from './pages/Articles'
import Achievements from './pages/Achievements'
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
              <Route path="/articles" element={<Articles />} />
              <Route path="/people" element={<People />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
