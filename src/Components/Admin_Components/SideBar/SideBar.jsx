import { faEnvelope,faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGauge, faGear, faHouse, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './SideBar.css';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../Images/logo.png'


const links = [
    {
      path: "dashbordAdmin",
      text: "Dashboard",
      icon: faGauge,
    },
    {
      path: "gestionuser",
      text: "Gestion Participants",
      icon: faUser,
    },
    {
      path: "gestionevenement",
      text: "Gestion Evenements",
      icon: faHouse,
    },
    
    {
      path: "gestionentreprise",
      text: "Gestion Entreprises",
      icon: faGear,
    },
    
    {
      path: "gestioncategorie",
      text: "Gestion Catégories",
      icon: faLayerGroup,
    },
   
    {
      path: "gestionnewletter",
      text: "Gestion Newsletters",
      icon: faEnvelope,
    },
    {
      path: "gestionmessage",
      text: "Gestion Messages",
      icon: faMessage,
    },
  ];
export default function SideBar({ isOpen, name, handleChangePath }) {
  return (
    <div>
       <div style={{ display: !isOpen ? "block" : "none", border:'none' }}>
      <div className="contentOneSidebar">
        <div className="contentimage">
          <div className="d-flex justify-content-center ">
            {" "}
            <Image src={logo} alt="" id="image-contenu" />
          </div>
          <p className="text-center"><Link to={'/'} style={{textDecoration:'none', color:'white'}}>BARAKA GATE</Link></p>
          <hr />
        </div>
        <div id="content-try-content" className=''>
          {links.map((link, index) => (
            <div key={index}
              className={`contentlink mt-3 ${
                name === link.path && "activeclassbar"
              }`}
            >
              <FontAwesomeIcon icon={link.icon} className="ms-2  icon_content_sidebar" />
              <Button
                className="linkcontent_sidebar"
                onClick={() => handleChangePath(link.path)}
              >
                <span
                  className={`linktext ${name === link.path && "activeclassbar"}`}
                  id="lktinext"
                >
                  {link.text}
                </span>
              </Button>
            </div>
          ))}
        </div>
        <div className="mainContentBottom">
          <div className="d-flex  justify-content-center">
            <Button className="logout d-flex justify-content-center align-items-center " 
            id="logout" >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="logouticon  "
              />
            </Button>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  )
}
