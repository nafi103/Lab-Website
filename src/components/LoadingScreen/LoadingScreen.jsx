import React from 'react';
import './LoadingScreen.css';

// Loading screen component - keeps users engaged while data loads
// I made it visually interesting with multiple animated elements
const LoadingScreen = ({ message = "Loading...", subMessage = "" }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Multiple loading animations for visual interest */}
        <div className="loading-animation">
          {/* Spinning rings animation */}
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          {/* Pulsing dots animation */}
          <div className="loading-pulse">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        </div>
        
        {/* Loading message text - customizable */}
        <div className="loading-text">
          <h3 className="loading-message">{message}</h3>
          {subMessage && <p className="loading-submessage">{subMessage}</p>}
        </div>
        
        {/* Progress bar animation for visual feedback */}
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
      
      <div className="loading-background">
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
        <div className="floating-element floating-4"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;