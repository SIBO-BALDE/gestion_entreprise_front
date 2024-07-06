import React, { useState } from 'react'

import './NavbarUserAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas } from 'react-bootstrap';
import SideBarUser  from '../SideBarUser/SideBarUser';

// passer en props
export default function NavbarUserAdmin({ onMenuClick, handleChangePath }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
  <div  >
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
          <SideBarUser handleChangePath={handleChangePath} className='w-100' />
        </Offcanvas.Body>
      </Offcanvas>

  </div>
</div>
  )
}

