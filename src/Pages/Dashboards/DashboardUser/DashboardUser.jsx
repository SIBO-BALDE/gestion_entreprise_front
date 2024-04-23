
import React, {  useState } from "react";
// import "./DashboardAdmin.css";
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
import GestionEvenement from "../../CRUD/GestionEvenement/GestionEvenement";
import { Image } from "react-bootstrap";



function KPIUser() {
  // const [userLists, setUserLists] = useState([]);
 

  

  



  return (
    <div className="contenueprincipal container ">
      <div className="dashbord-content-main-one container" id="vv">
        <div className="content-left-admin-dashbord">
          <h3 className="mb-2">Liste des des feedbacks données</h3>
          <table className="table mb-5">
            <thead className="table-light" id="hearder-color">
              <tr>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Message
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Prenom
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Nom
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Image src="" /></td>
                <td>Fabiola</td>
                <td>Williams</td>
                <td>fabiwili@gmail.com</td>
                <td>775892011</td>
                <td>Simplon</td>
              </tr>
              <tr>
                <td><Image src="" /></td>
                <td>Leonard</td>
                <td>Jackson</td>
                <td>jacksonglen@gmail.com</td>
                <td>787700022</td>
                <td>Atos</td>
              </tr>
            </tbody>
          </table>
          <div>
         
          </div>
          <div className="conten-admin-2">
            
            
          </div>
        </div>
        <div className="content-diagramme-circulaire-right-conten-2">
          <div className="">
            {/* <Chart /> */}
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
      return <KPIUser />;
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
      return <KPIUser />;
  }
}

export default function DashboardUser() {
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

