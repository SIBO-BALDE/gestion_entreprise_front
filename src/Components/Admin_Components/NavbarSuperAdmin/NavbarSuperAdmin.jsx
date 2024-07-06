import React, { useState } from 'react';
import './NavbarSuperAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas } from 'react-bootstrap';
import SideBarSuperAdmin from '../SideBarSuperAdmin/SideBarSuperAdmin';

export default function NavbarSuperAdmin({ onMenuClick, onHideSidebar, handleChangePath }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  const handleHideSidebar = () => {
    onHideSidebar();
    
  };

  return (
    <div className="mainContent">
        <div className='d-flex'>
          <div className="mainContentLeft" onClick={onMenuClick}>
            <FontAwesomeIcon icon={faBars} className='mainContentRight-icon1' />
          </div>
          <div className='mainContentLeft2 bg-white' onClick={handleShow}>
            <FontAwesomeIcon icon={faBars} className='mainContentRight-icon1' />
          </div>
        </div>

      <div style={{}}>
      <Offcanvas show={show} onHide={handleClose} style={{ width: '250px' }}>
        <Offcanvas.Header closeButton>
         
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <SideBar  /> */}
          <SideBarSuperAdmin handleChangePath={handleChangePath} className='w-100' />
        </Offcanvas.Body>
      </Offcanvas>

     </div>

    </div>
  );
}

