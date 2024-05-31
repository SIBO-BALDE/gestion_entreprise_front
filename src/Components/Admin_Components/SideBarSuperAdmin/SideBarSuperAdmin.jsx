import { faEnvelope, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBuilding, faFileLines, faGauge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SideBarSuperAdmin.css';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../Images/LOGO FOND BLANC.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const links = [
  { path: "dashbordSuperAdmin", text: "Dashboard Superadmin", icon: faGauge },
  { path: "gestionaAbonnement", text: "Gestion Abonnement", icon: faBuilding },
  { path: "gestioaentrepriseAdmin", text: "Gestion Entreprise", icon: faBuilding },
  { path: "gestioadmin", text: "Gestion Client", icon: faUser },
  { path: "gestiondevis", text: "Demande d'utilisaton", icon: faFileLines },
  { path: "gestionnewletter", text: "Gestion Newsletters", icon: faEnvelope },
  { path: "gestionmessage", text: "Gestion Messages", icon: faMessage },
];

export default function SideBarSuperAdmin({ isOpen, name, handleChangePath }) {
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("tokencle");
      const role = localStorage.getItem("rolecle");
      if (token || role === "SuperAdmin") {
        const response = await axios.post(
          "http://localhost:8000/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("tokencle");
          localStorage.removeItem("rolecle");
          Swal.fire({ title: "Déconnexion réussie!", text: "Vous êtes déconnecté avec succès.", icon: "success" });
          navigate("/login");
        } else {
          Swal.fire({ icon: "error", title: "Oops!", text: "Échec de déconnexion!" });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'sidebar-closed' : ''}`}>
     
        <div className="contentOneSidebar">
          <div className="contentimage">
            <div className="d-flex justify-content-center">
              <Image src={logo} alt="" id="image-contenu" className='border' />
            </div>
            <p className="text-center">
              <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>BARAKA GATE</Link>
            </p>
            <hr className="text-white"/>
          </div>
          <div id="content-try-content">
            {links.map((link, index) => (
              <div key={index} className={`contentlink mt-3 ${name === link.path && "activeclassbar"}`}>
                <FontAwesomeIcon icon={link.icon} className="ms-2 icon_content_sidebar" />
                <Button className="linkcontent_sidebar" onClick={() => handleChangePath(link.path)}>
                  <span className={`linktext ${name === link.path && "activeclassbar"}`} id="lktinext">
                    {link.text}
                  </span>
                </Button>
              </div>
            ))}
          </div>
          <div className="mainContentBottom">
            <div className="d-flex justify-content-center">
              <Button className="logout d-flex justify-content-center align-items-center" id="logout" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="logouticon" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        {/* Main content goes here */}
      </div>
    </div>
  );
}
