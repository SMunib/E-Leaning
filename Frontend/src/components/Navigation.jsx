import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
        <h1>Hello</h1>
      <ul>
        <li><Link to="/home">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/log out">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;