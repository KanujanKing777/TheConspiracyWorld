import React, { useState } from 'react';
import './BottomNavBar.css';
function BottomNavBar() {
  // State to keep track of the currently selected tab
  const [selectedTab, setSelectedTab] = useState('home');

  // Function to handle tab selection
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="bottom-nav">
      <button
        className={selectedTab === 'home' ? 'active' : ''}
        onClick={() => handleTabSelect('home')}
      >
        Home
      </button>
      <button
        className={selectedTab === 'about' ? 'active' : ''}
        onClick={() => handleTabSelect('about')}
      >
        About
      </button>
      <button
        className={selectedTab === 'contact' ? 'active' : ''}
        onClick={() => handleTabSelect('contact')}
      >
        Contact
      </button>
    </div>
  );
}

export default BottomNavBar;
