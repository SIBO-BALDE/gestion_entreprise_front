import React, { useState } from 'react';
import './NavbarSuperAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';

export default function NavbarSuperAdmin({ onMenuClick, onHideSidebar }) {
 

  const handleHideSidebar = () => {
    onHideSidebar();
    
  };

  return (
    <div className={`mainContent`}>
      <div className="mainContentLeft" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faBars} className='ms-3 mainContentRight-icon1' />
      </div>
      <div className="mainContentRight">
        <FontAwesomeIcon icon={faBell} className='mainContentRight-icon' />
      </div>
    </div>
  );
}

