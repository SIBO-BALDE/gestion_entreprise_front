
import React, {  useEffect, useState } from "react";
import "./DashboardUser.css";
import NavbarAdmin from "../../../Components/Admin_Components/NavbarAdmin/NavbarAdmin";
import SideBarUser from "../../../Components/User_Components/SideBarUser/SideBarUser";
import GestionUser from "../../CRUD/GestionUsers/GestionUser";
import GestionMessage from "../../CRUD/GestionMessage/GestionMessage";
import GestionCategorie from "../../CRUD/GestionCategorie/GestionCategorie";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Authentification/AuthContext";

// import Pagination from "../../Components/Pagination/Pagination";
import GestionNewsletter from "../../CRUD/GestionNewsLetter/GestionNewsletter";
import GestionEntreprise from "../../CRUD/GestionEntreprise/GestionEntreprise";
import GestionFeedbackEvenement from "../../CRUD_USER/GestionFeedbackEvenement/GestionFeedbackEvenement";
import GestionFeedbackEvaluation from "../../CRUD_USER/GestionFeedbackEvaluation/GestionFeedbackEvaluation";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge, faFeed, faHome, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function KPIUser() {
  // const [userLists, setUserLists] = useState([]);
 

  

  



  return (
    <div className="contenueprincipal container ">
      <div className="dashbord-content-main-one container" id="vv">
        <div>
        <div className="content-left-admin-dashbord border">
          <h3 className="mb-2">Liste des des feedbacks evenements  données</h3>
          <table className="table mb-5">
            <thead className="table-light" id="hearder-color">
              <tr>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Prenom
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Nom
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Email
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Entreprise
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
               
                <td>Fabiola</td>
                <td>Williams</td>
                <td>fabiwili@gmail.com</td>
                
                <td>Simplon</td>
              </tr>
              <tr>
                
                <td>Leonard</td>
                <td>Jackson</td>
                <td>jacksonglen@gmail.com</td>
               
                <td>Atos</td>
              </tr>
            </tbody>
          </table>
          <div>
         
          </div>
          
        </div>
        <div className="content-left-admin-dashbord border">
          <h3 className="mb-2">Liste des des feedbacks évaluation  données</h3>
          <table className="table mb-5">
            <thead className="table-light" id="hearder-color">
              <tr>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Prenom
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Nom
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Email
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Entreprise
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
               
                <td>Fabiola</td>
                <td>Williams</td>
                <td>fabiwili@gmail.com</td>
                
                <td>Simplon</td>
              </tr>
              <tr>
                
                <td>Leonard</td>
                <td>Jackson</td>
                <td>jacksonglen@gmail.com</td>
               
                <td>Atos</td>
              </tr>
            </tbody>
          </table>
          <div>
         
          </div>
          
        </div>
       
        </div>

        <div className="content-diagramme-circulaire-right-conten-2  pt-4 border">
        <div className="card1-admin  pt-2 ps-1">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faFeed} id="icon-content-admin" />
          </div>
          <div>
            <h4>feedback evenements donné</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{}</h1>
      </div>
      <div className="card1-admin  pt-2 ps-1 ">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faQuestion} id="icon-content-admin" />
          </div>
          <div>
            <h4> feedbacks évaluation donné</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{}</h1>
      </div>
      <div className="card1-admin  pt-2 ps-1">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faBellConcierge} id="icon-content-admin" />
          </div>
          <div>
            <h4>feedbacks évaluation reçu</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{}</h1>
      </div>
        </div>
      </div>
    </div>
  );
}

function RenderContent(name) {
  switch (name) {
    case "dashbordUser":
      return <KPIUser />;
    case "feedbackeve":
      return <GestionFeedbackEvenement />;
    case "feedbackevalu":
      return <GestionFeedbackEvaluation />;
    default:
      return <KPIUser />;
  }
}

export default function DashboardUser() {
  // l'etat pour verifier si le sidebar est ouvert ou pas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("dashbordUser");

  // function pour changer l'eta
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");

  useEffect(() => {
   
    if ( role !== "Participant") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Acces interdit, connecter vous en tant qu'user pour avoir accée au dashboard!",
      });
      navigate("/"); 
    }
  }, [ role , navigate]);
 



  

  function handleChangePath(path) {
    setName(path);
  }

  return (
    <div className="">
      <div
        className={`maincontent-dashbord-static ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <div className="contentsidebar">
          <SideBarUser
            isOpen={isSidebarOpen}
            name={name}
            handleChangePath={handleChangePath}
            id="sidebar-content"
          />
        </div>
        <div className="secondecontent">
          <div className="">
            <NavbarAdmin onMenuClick={toggleSidebar} />
          </div>
          {/* <Tableaux /> */}
          {/* contenue selon le lien clicker */}
          {RenderContent(name)}
        </div>
      </div>
    </div>
  );
}

