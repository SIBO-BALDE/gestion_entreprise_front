
import { faComments, faEnvelope,faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGauge, faGear, faHouse, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
// import './SideBar.css';
import { Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../Images/Logo blanc.jpg'
import "./SideBarUse.css";
import Swal from 'sweetalert2';
import axios from 'axios';


const links = [
    {
      path: "dashbordUser",
      text: "Dashboard",
      icon: faGauge,
    },
    {
      path: "feedbackeve",
      text: "Feedback Evenement",
      icon: faUser,
    },
    {
      path: "feedbackevalu",
      text: "Feedback Evaluation",
      icon: faHouse,
    },
    {
      path: "feedbackreponse",
      text: "Reponses Feedback",
      icon: faComments,
    },
    {
      path: "valuationreponse",
      text: "Reponses Evaluation",
      icon: faComments,
    },
    
    
  ];
export default function SideBarUser({ isOpen, name, handleChangePath }) {


  const [utilisateur, setUtilisateur] = useState([]);
  const userInformations = () =>{
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
    
    if (token || role==='Participant') {
      

      axios
        .post(
          "http://localhost:8000/api/me",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then((response) => {
          const userData = response.data;
          setUtilisateur(userData);
          console.log(userData, "userdATA Dashboarduser");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur :",
            error
          );
        });
    }
  }


  useEffect(() => {
    // Récupérez le token et le role  du localStorage
    userInformations();
    
    
  }, []);







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
       <div className={`sidebar ${isOpen ? 'sidebar-closed' : ''}`}>
      <div className="contentOneSidebar">
        <div className="contentimage">
          <div className="d-flex justify-content-center" >
            {" "}
            <Image src={logo} alt="" id="image-contenu" className='border image-contenu-user' />
          </div>
          <h6 className="text-center mt-3"><Link to={'/'} style={{textDecoration:'none', color:'white'}}>{utilisateur.prenom} {utilisateur.nom}</Link></h6>
          <p className=" text-white text-center">{utilisateur.email}</p>
          <hr className=" text-white"/>
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
                className="logouticon"
                onClick={handleLogout}
              />
            </Button>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  )
}
