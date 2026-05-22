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
            Collaborative task management for teams
          </div>
          <h1>
            Keep your team organized <br />
            <span className="gradient-text-green">and projects on track</span>
          </h1>
          <p className="hero-subtitle">
            A clean, modern workspace for managing projects, tracking tasks, and collaborating with your team in real time.
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
        <h2 className="section-title">Everything you need to work together</h2>
        <div className="features-grid">
          <div className="card feature-card glow-green">
            <div className="feature-icon-wrapper green-glow">
              <Kanban size={24} className="feature-icon green" />
            </div>
            <h3>Visual Kanban Boards</h3>
            <p>Organize your tasks visually. Move tasks between columns as they progress and see what everyone is working on.</p>
          </div>

          <div className="card feature-card glow-yellow">
            <div className="feature-icon-wrapper yellow-glow">
              <Users size={24} className="feature-icon yellow" />
            </div>
            <h3>Team Roles</h3>
            <p>Control who has access to what. Assign Admin or Member roles to team members to manage permissions easily.</p>
          </div>

          <div className="card feature-card glow-red">
            <div className="feature-icon-wrapper red-glow">
              <ShieldAlert size={24} className="feature-icon red" />
            </div>
            <h3>Clear Priorities</h3>
            <p>Set clear deadlines and priorities (High, Medium, Low) for every task so your team knows what to work on first.</p>
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
