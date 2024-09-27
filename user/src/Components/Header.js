import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

export default function Header() {
  const [dropdownOpenGroups, setDropdownOpenGroups] = useState(false);
  const [dropdownOpenAccounts, setDropdownOpenAccounts] = useState(false);
  const [value, setValue] = useState("Login");

  const navigate = useNavigate();

  const valuecode = () => {
    const token = localStorage.getItem('authToken');
    setValue(token ? "Logout" : "Login");
  };

  useEffect(() => {
    valuecode();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setValue("Login");
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
        <button className="header-button Home" onClick={toHome}><img src="https://p1.hiclipart.com/preview/233/734/334/free-144-minimal-icons-package-home-png-icon.jpg" alt="Home" /></button>
                
        <div className="dropdown"
             onMouseEnter={() => setDropdownOpenGroups(true)}
             onMouseLeave={() => setDropdownOpenGroups(false)}>
          <button className="dropdown-button">Groups</button>
          <div className={`dropdown-menu ${dropdownOpenGroups ? 'open' : ''}`}>
            <button className="dropdown-item" onClick={toCreateGroup}>Create Group</button>
            <button className="dropdown-item" onClick={toAddGroup}>Join Group</button>
            <button className="dropdown-item" onClick={toDeleteGroup}>Delete Group</button>
          </div>
        </div>

        <div className="dropdown"
             onMouseEnter={() => setDropdownOpenAccounts(true)}
             onMouseLeave={() => setDropdownOpenAccounts(false)}>
          <button className="dropdown-button">Accounts</button>
          <div className={`dropdown-menu ${dropdownOpenAccounts ? 'open' : ''}`}>
            <button className="dropdown-item" onClick={toDeleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
      <button className="header-button" onClick={handleLogout}>
        {value}
      </button>
    </header>
  );
}
