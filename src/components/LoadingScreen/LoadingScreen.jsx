import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = "Loading...", subMessage = "" }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-pulse">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        </div>
        
        <div className="loading-text">
          <h3 className="loading-message">{message}</h3>
          {subMessage && <p className="loading-submessage">{subMessage}</p>}
        </div>
        
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