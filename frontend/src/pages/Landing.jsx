import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Kanban, ShieldAlert, Users, ArrowRight, Github } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-container">
      {/* Top Header */}
      <header className="landing-header">
        <div className="landing-logo">
          <Zap size={24} className="landing-logo-icon" />
          <span>TaskFlow</span>
        </div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
        </nav>
        <div className="landing-auth-buttons">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary glow-green">
              Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-login">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-signup glow-green">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="pulse-dot green"></span>
            Version 2.0 Cyber Edition
          </div>
          <h1>
            The Next-Gen <br />
            <span className="gradient-text-green">Team Task Orchestrator</span>
          </h1>
          <p className="hero-subtitle">
            A high-performance workspace featuring matrix-dark aesthetics, glassmorphic Kanban boards, role-based controls, and glowing urgency alerts.
          </p>
          <div className="hero-ctas">
            <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary btn-lg hero-btn-primary glow-green">
              Get Started <ArrowRight size={18} />
            </Link>
            <a 
              href="https://github.com/Ninja1802/team-task-manager" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline btn-lg hero-btn-secondary"
            >
              <Github size={18} /> Source Code
            </a>
          </div>
        </div>
        
        {/* Decorative Floating UI Mockup */}
        <div className="hero-mockup-wrapper">
          <div className="hero-mockup card glow-green">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="mockup-title">TaskFlow.sys</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-kanban">
                <div className="mockup-column column-todo">
                  <div className="column-title">Backlog</div>
                  <div className="mockup-card card glow-red">
                    <span className="badge badge-high">High</span>
                    <p>Setup production server routing</p>
                  </div>
                </div>
                <div className="mockup-column column-progress">
                  <div className="column-title">In Progress</div>
                  <div className="mockup-card card glow-yellow">
                    <span className="badge badge-progress">Active</span>
                    <p>Futuristic theme redesign</p>
                  </div>
                </div>
                <div className="mockup-column column-done">
                  <div className="column-title">Completed</div>
                  <div className="mockup-card card glow-green">
                    <span className="badge badge-done">Done</span>
                    <p>Integrate MongoDB cluster</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="landing-features">
        <h2 className="section-title">Engineered for Flow State</h2>
        <div className="features-grid">
          <div className="card feature-card glow-green">
            <div className="feature-icon-wrapper green-glow">
              <Kanban size={24} className="feature-icon green" />
            </div>
            <h3>Kanban Boards</h3>
            <p>Drag, drop, and monitor tasks in structured status lanes. Instantly view task distributions in real-time.</p>
          </div>

          <div className="card feature-card glow-yellow">
            <div className="feature-icon-wrapper yellow-glow">
              <Users size={24} className="feature-icon yellow" />
            </div>
            <h3>Role-Based Access</h3>
            <p>Distinguish Admins and Members dynamically. Grant scoped project privileges and manage team accounts securely.</p>
          </div>

          <div className="card feature-card glow-red">
            <div className="feature-icon-wrapper red-glow">
              <ShieldAlert size={24} className="feature-icon red" />
            </div>
            <h3>Urgency Glows</h3>
            <p>Tasks adapt color indicators: Red for High/Overdue, Yellow for Medium, Green for Completed. Never lose tracking focus.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 TaskFlow. All rights reserved.</p>
        <p>Built with React, Express, MongoDB Atlas, and CSS Glassmorphism.</p>
      </footer>
    </div>
  );
};

export default Landing;
