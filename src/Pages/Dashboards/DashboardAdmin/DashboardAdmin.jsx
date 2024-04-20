import React, { useEffect, useState } from "react";
import "./DashbordAdmin.css";
import NavbarAdmin from "../../Components/Navbars/NavbarAdmin/NavbarAdmin";
import SideBars from "../../Components/SideBars/SideBars";
import { Image } from "react-bootstrap";
import Tableaux from "../Tableaux/Tableaux";
import profile from "../../fichiers/profile.png";
import Chart from "../../Components/Charts/Charts";
import GestionUser from "../../CRUD/GestionUsers/GestionUser";
import GestionEvenement from "../../CRUD/GsetionEvenement/GestionEvenement";
import GestionEntreprise from "../../CRUD/GestionEntreprise/GestionEntreprise";
import GestionMessage from "../../CRUD/GestionMessage/GestionMessage";
import GestionCategorie from "../../CRUD/GestionCategorie/GestionCategorie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentification/AuthContext";
import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination/Pagination";
import GestionNewsletter from "../../CRUD/GestionNewsLetter/GestionNewsletter";



function KPI() {
  const [userLists, setUserLists] = useState([]);
 

  

  



  return (
    <div className="contenueprincipal container ">
      <div className="dashbord-content-main-one container" id="vv">
        <div className="content-left-admin-dashbord">
          <h3 className="mb-2">Liste des utilisateurs</h3>
          <table className="table mb-5">
            <thead className="table-light" id="hearder-color">
              <tr>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Profile
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Prenom
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Nom
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Email
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Téléphone
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
          <div>
         
          </div>
          <div className="conten-admin-2">
            <div className="title-progressbar-admin px-4 ">
              <p>
                Liste des utilisateurs total par rapport au utilisateurs bloqués
              </p>
            </div>
            <span>Pourcentage des utilisateurs total</span>
            <div
              className="progress mt-4"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="98"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                id="progress-bar"
                style={{ width: "100%", color: "white" }}
              >
                100%
              </div>
            </div>
            <span>Pourcentage des utilisateurs total bloqué</span>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                id="progress-bar"
                style={{ width: "5%", color: "white" }}
              >
                5%
              </div>
            </div>
          </div>
        </div>
        <div className="content-diagramme-circulaire-right-conten-2">
          <div className="">
            <Chart />
            <p className="text-center mt-2 ">
              Nombre de projet de construction <br></br> terminé par rapport au
              projet total <br></br> 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderContent(name) {
  switch (name) {
    case "dashbordAdmin":
      return <KPI />;
    case "gestionuser":
      return <GestionUser />;
    case "gestionevenement":
      return <GestionEvenement />;
    case "gestionentreprise":
      return <GestionEntreprise />;
    case "gestioncategorie":
      return <GestionCategorie />;
    case "gestionnewletter":
      return <GestionNewsletter />;
    case "gestionmessage":
      return <GestionMessage />;
    default:
      return <KPI />;
  }
}

export default function DashbordAdmin() {
  // l'etat pour verifier si le sidebar est ouvert ou pas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("dashbordAdmin");

  // function pour changer l'eta
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 



  

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
          <SideBars
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
