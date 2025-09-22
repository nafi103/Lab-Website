import React from 'react';
import './Footer.css';

// Footer component - I wanted to include useful links and contact info
// Plus a bit of visual flair with the animated atom logo
const Footer = () => {
  const currentYear = new Date().getFullYear(); // Always keep the copyright year current

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Lab Information and Branding */}
          <div className="footer-section">
            <div className="footer-logo">
              {/* Custom animated atom icon - I thought it fit the scientific theme */}
              <div className="logo-icon">
                <div className="atom">
                  <div className="nucleus"></div>
                  <div className="orbit orbit-1"></div>
                  <div className="orbit orbit-2"></div>
                  <div className="orbit orbit-3"></div>
                </div>
              </div>
              <h3>Research Lab</h3>
            </div>
            <p className="footer-description">
              Advancing scientific discovery through innovation and collaboration. 
              Our research spans multiple disciplines including machine learning, 
              quantum computing, and computational biology.
            </p>
            {/* Social media and contact links */}
            <div className="social-links">
              <a href="https://twitter.com/researchlab" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="https://linkedin.com/company/researchlab" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span className="social-icon">💼</span>
              </a>
              <a href="https://github.com/researchlab" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span className="social-icon">💻</span>
              </a>
              <a href="mailto:contact@researchlab.edu" aria-label="Email">
                <span className="social-icon">✉️</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/people">Our Team</a></li>
              <li><a href="/publications">Publications</a></li>
              <li><a href="/news">News & Updates</a></li>
            </ul>
          </div>

          {/* Research Areas */}
          <div className="footer-section">
            <h4>Research Areas</h4>
            <div className="footer-research-area">
              <p>Machine Learning</p>
              <p>Quantum Computing</p>
              <p>Computational Biology</p>
              <p>Data Science</p>
              <p>Systems Biology</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <div className="footer-contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p>Research Building, Room 301</p>
                  <p>City, State 12345</p>
                </div>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon">🕒</span>
                <div>
                  <p><strong>Office Hours:</strong></p>
                  <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                  <p>Lab Access: 24/7 for students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Research Lab. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;