// import React from 'react'
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import SideBar from '../../Admin_Components/SideBar/SideBar';
// import NavbarAdmin from '../../Admin_Components/NavbarAdmin/NavbarAdmin';
// import DashbordAdmin from '../../../Pages/Dashboards/DashboardAdmin/DashboardAdmin';

// export default function ResponsiveSideBarAdmin() {

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [content, setcontent] = useState(false);
  

  


//   return (
//     <>
//       <Offcanvas show={show} onHide={handleClose}>
//         <Offcanvas.Header closeButton>
//           {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <SideBar />
          
//           {/* Pass handleShow to NavbarAdmin */}
//           <NavbarAdmin handleShow={handleShow} />
//           <DashbordAdmin handleShow={handleShow} />
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
  
// }
