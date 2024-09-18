import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState("Login"); // Initialize with default value

  const navigate = useNavigate();

  // Function to update button text based on auth token presence
  const valuecode = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setValue("Logout");
    } else {
      setValue("Login");
    }
  };

  // Call valuecode when component mounts
  useEffect(() => {
    valuecode();
  }, []); // Empty dependency array means this runs once on mount

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setValue("Login"); // Update button text after logout
    navigate('/login');
  };

  const toCreateGroup = () => navigate('/CreateGroup');
  const toAddGroup = () => navigate('/AddGroup');
  const toHome = () => navigate('/Home');
  const toDeleteGroup = () => navigate('/DeleteGroup');
  const toDeleteAccount = () => navigate('/DeleteAccount');

  return (
    <header className="header">
      <div className="nav-items">
        <button className="header-button" onClick={toHome}>Home</button>
        <button className="header-button" onClick={toCreateGroup}>Create Group</button>
        <button className="header-button" onClick={toAddGroup}>Join Group</button>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Other Options
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
            <button className="dropdown-item" onClick={toDeleteGroup}>Delete Group</button>
            <button className="dropdown-item" onClick={toDeleteAccount}>Delete Account</button>
            <button className="dropdown-item">Option 3</button>
            <button className="dropdown-item">Option 4</button>
          </div>
        </div>
      </div>
      <button className="header-button" onClick={handleLogout}>
        {value}
      </button>
    </header>
  );
}
