import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container fade-in">
      <nav className="landing-nav">
        <h1 className="logo">JobTracker</h1>
        <div>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/login')}
          >
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Register
          </button>
        </div>
      </nav>

      <header className="landing-hero">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
          alt="Job Tracking Illustration"
          className="hero-image"
        />
        <h2 className="hero-title">Track Your Job Applications Effortlessly</h2>
        <p className="hero-subtitle">
          Manage, update, and keep your job hunt organized all in one place.
        </p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Get Started
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/login')}
          >
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </button>
        </div>
      </header>

      <footer className="landing-footer">
        <p>© 2025 JobTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
