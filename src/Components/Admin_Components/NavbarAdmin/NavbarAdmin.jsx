import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

import './NavbarAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../SideBar/SideBar';
import { Button } from 'react-bootstrap';

// passer en props
export default function NavbarAdmin({ onMenuClick, handleChangePath}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <div>
      <div className="mainContent">
        <div className='d-flex'>
          <div className="mainContentLeft" onClick={onMenuClick}>
            <FontAwesomeIcon icon={faBars} className='mainContentRight-icon1' />
          </div>
          <div className='mainContentLeft2 bg-white' onClick={handleShow}>
            <FontAwesomeIcon icon={faBars} className='mainContentRight-icon1' />
          </div>
        </div>
      </div>
    
  <div style={{}}>
      <Offcanvas show={show} onHide={handleClose} style={{ width: '250px' }}>
        <Offcanvas.Header closeButton>
         
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <SideBar  /> */}
          <SideBar handleChangePath={handleChangePath} className='w-100' />
        </Offcanvas.Body>
      </Offcanvas>

  </div>
    </div>
  )
}

