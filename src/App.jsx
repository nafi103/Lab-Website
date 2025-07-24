import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import PersonDetail from './components/PersonDetail/PersonDetail'
import { Home, About, People, News, Publications } from './pages'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
      </div>
    </Router>
  )
}

export default App
