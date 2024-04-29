import { faEnvelope,faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBuilding, faGauge, faGear, faHouse, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import './SideBar.css';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../Images/logo.png';
import { useAuth } from "../../../Pages/Auth/AuthContex";
import { createContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';






const links = [
    {
      path: "dashbordAdmin",
      text: "Dashboard Admin",
      icon: faGauge,
    },
    {
      path: "gestionuser",
      text: "Gestion Participants",
      icon: faUser,
    },
    {
      path: "gestionevaluation",
      text: "Gestion Evaluations",
      icon: faUser,
    },
    {
      path: "gestionfeedback",
      text: "Gestion Feedbacks",
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
      icon: faBuilding,
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

  // const { token, role, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    
    try {
      const token = localStorage.getItem("tokencle");
        const role = localStorage.getItem("rolecle");
      if (token || role === "Admin") {
        // Utilisez votre instance Axios configurée
        const response = await axios.post(
          "http://localhost:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          // Appel de la fonction logout depuis authContext
         
          localStorage.removeItem("tokencle");
          localStorage.removeItem("rolecle");
  
          Swal.fire({
            title: "Déconnexion réussie!",
            text: "Vous êtes déconnecté avec succès.",
            icon: "success",
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Échec de déconnexion!",
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  return (
    <div>
       <div style={{ display: !isOpen ? "block" : "none", border:'none' }}>
      <div className="contentOneSidebar">
        <div className="contentimage">
          <div className="d-flex justify-content-center ">
            {" "}
            <Image src={logo} alt="" id="image-contenu" className='border' />
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
            id="logout" 
            onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="logouticon"
               
              />
            </Button>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  )
}
