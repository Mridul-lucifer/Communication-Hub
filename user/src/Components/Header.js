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
        <button className="header-button Home" onClick={toHome}>Home</button>
        <button className="header-button Home" onClick={toHome}><img src="data:image/png;base64,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" alt="Home"></button>
                
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
