import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1 className="banner-title">
            Advancing Scientific Discovery
          </h1>
          <p>
            Pioneering research and innovation at the forefront of modern science
          </p>
        </div>
        <div className="banner-visual">
          <svg
            className="banner-svg"
            viewBox="0 0 700 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background gradient definitions */}
            <defs>
              
              <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            {/* <rect width="100%" height="100%" fill="url(#bgGradient)" /> */}

            {/* Network connections */}
            <g className="network-lines" opacity="0.3">
              <line x1="150" y1="100" x2="300" y2="150" stroke="#0ea5e9" strokeWidth="1" />
              <line x1="300" y1="150" x2="450" y2="120" stroke="#0ea5e9" strokeWidth="1" />
              <line x1="450" y1="120" x2="600" y2="180" stroke="#0ea5e9" strokeWidth="1" />
              <line x1="300" y1="150" x2="350" y2="300" stroke="#06b6d4" strokeWidth="1" />
              <line x1="350" y1="300" x2="500" y2="350" stroke="#06b6d4" strokeWidth="1" />
              <line x1="150" y1="100" x2="200" y2="250" stroke="#8b5cf6" strokeWidth="1" />
              <line x1="200" y1="250" x2="350" y2="300" stroke="#8b5cf6" strokeWidth="1" />
              <line x1="600" y1="180" x2="650" y2="320" stroke="#0ea5e9" strokeWidth="1" />
              <line x1="500" y1="350" x2="650" y2="320" stroke="#06b6d4" strokeWidth="1" />
              <line x1="450" y1="120" x2="500" y2="280" stroke="#8b5cf6" strokeWidth="1" />
            </g>

            {/* Main network nodes */}
            <g className="network-nodes">
              <circle cx="150" cy="100" r="8" fill="url(#nodeGradient)" filter="url(#glow)">
                <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="150" r="12" fill="url(#accentGradient)" filter="url(#glow)">
                <animate attributeName="r" values="12;16;12" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="450" cy="120" r="10" fill="url(#nodeGradient)" filter="url(#glow)">
                <animate attributeName="r" values="10;14;10" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="180" r="9" fill="url(#accentGradient)" filter="url(#glow)">
                <animate attributeName="r" values="9;13;9" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="250" r="7" fill="url(#nodeGradient)" filter="url(#glow)">
                <animate attributeName="r" values="7;11;7" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="350" cy="300" r="11" fill="url(#accentGradient)" filter="url(#glow)">
                <animate attributeName="r" values="11;15;11" dur="2.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="500" cy="350" r="8" fill="url(#nodeGradient)" filter="url(#glow)">
                <animate attributeName="r" values="8;12;8" dur="3.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="320" r="10" fill="url(#accentGradient)" filter="url(#glow)">
                <animate attributeName="r" values="10;14;10" dur="2.9s" repeatCount="indefinite" />
              </circle>
              <circle cx="500" cy="280" r="6" fill="url(#nodeGradient)" filter="url(#glow)">
                <animate attributeName="r" values="6;10;6" dur="3.4s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Floating particles */}
            <g className="particles" opacity="0.6">
              <circle cx="100" cy="400" r="3" fill="#0ea5e9">
                <animateTransform 
                  attributeName="transform" 
                  type="translate" 
                  values="0,0; 50,-20; 0,0" 
                  dur="6s" 
                  repeatCount="indefinite" 
                />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="700" cy="450" r="2" fill="#06b6d4">
                <animateTransform 
                  attributeName="transform" 
                  type="translate" 
                  values="0,0; -30,30; 0,0" 
                  dur="8s" 
                  repeatCount="indefinite" 
                />
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="8s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="500" r="2.5" fill="#8b5cf6">
                <animateTransform 
                  attributeName="transform" 
                  type="translate" 
                  values="0,0; 40,10; 0,0" 
                  dur="7s" 
                  repeatCount="indefinite" 
                />
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="7s" repeatCount="indefinite" />
              </circle>
              <circle cx="550" cy="480" r="1.5" fill="#0ea5e9">
                <animateTransform 
                  attributeName="transform" 
                  type="translate" 
                  values="0,0; -20,-30; 0,0" 
                  dur="5s" 
                  repeatCount="indefinite" 
                />
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* DNA-like double helix (subtle) */}
            <g className="dna-helix" opacity="0.15">
              <path 
                d="M50 200 Q100 180 150 200 T250 200 T350 200 T450 200"
                stroke="#0ea5e9" 
                strokeWidth="2" 
                fill="none"
              >
                <animate 
                  attributeName="d" 
                  values="M50 200 Q100 180 150 200 T250 200 T350 200 T450 200;M50 200 Q100 220 150 200 T250 200 T350 200 T450 200;M50 200 Q100 180 150 200 T250 200 T350 200 T450 200"
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </path>
              <path 
                d="M50 220 Q100 240 150 220 T250 220 T350 220 T450 220"
                stroke="#06b6d4" 
                strokeWidth="2" 
                fill="none"
              >
                <animate 
                  attributeName="d" 
                  values="M50 220 Q100 240 150 220 T250 220 T350 220 T450 220;M50 220 Q100 200 150 220 T250 220 T350 220 T450 220;M50 220 Q100 240 150 220 T250 220 T350 220 T450 220"
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </path>
            </g>

            {/* Abstract geometric shapes */}
            <g className="geometric-shapes" opacity="0.2">
              <polygon 
                points="650,100 680,130 650,160 620,130" 
                fill="#8b5cf6"
              >
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0 650 130; 360 650 130" 
                  dur="20s" 
                  repeatCount="indefinite" 
                />
              </polygon>
              <rect 
                x="80" 
                y="350" 
                width="25" 
                height="25" 
                fill="#0ea5e9" 
                transform="rotate(45 92.5 362.5)"
              >
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="45 92.5 362.5; 405 92.5 362.5" 
                  dur="15s" 
                  repeatCount="indefinite" 
                />
              </rect>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Banner;
