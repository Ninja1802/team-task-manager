import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <button className="hamburger" onClick={onMenuClick} aria-label="Toggle menu">
        <Menu size={18} />
      </button>

      <div className="navbar-spacer" />

      <div className="navbar-right">
        <span className="navbar-greeting">
          Welcome, <strong>{user?.name?.split(' ')[0]}</strong>
        </span>
        <div className="navbar-badge">
          <div className="navbar-badge-dot" />
          {user?.role}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
