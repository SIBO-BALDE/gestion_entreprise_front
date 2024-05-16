
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
import { useAuth } from '../../Auth/AuthContex';
import axios from "axios";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import FeedbackReponse from "../../CRUD_USER/FeedbackReponse/FeedbackReponse";
import EvaluationReponse from "../../CRUD_USER/EvaluationReponse/EvaluationReponse";



function KPIUser() {
  // const [userLists, setUserLists] = useState([]);
  const { submissionCount } = useAuth();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/evenements",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response , 'liste')
        setEvents(response.data.evenements);

        console.log(events);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  //  pour le champ recherche
const [searchValue, setSearchValue] = useState("");

// function la recherche
const handleSearchChange = (event) => {
  setSearchValue(event.target.value);
};

// faire le filtre des maison par addrsse
const filteredEvents = events.filter(
  (eventEl) =>
    eventEl &&
    eventEl.titre &&
    eventEl.titre.toLowerCase().includes(searchValue.toLowerCase())
);
const displayEvents = searchValue === "" ? events : filteredEvents;


  const [currentPage, setCurrentPage] = useState(1);
const  eventsParPage= 3;

// pagination
const indexOfLastEvent = currentPage* eventsParPage;
const indexOfFirstEvent = indexOfLastEvent -  eventsParPage;
const currentEvents = filteredEvents.slice(
  indexOfFirstEvent,
  indexOfLastEvent
);

const totalPaginationPages = Math.ceil(events.length /  eventsParPage);



const [evaluations, setEvaluations] = useState([]);

  const fetchEvaluations = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      // if (token) {
        const response = await axios.get(
          "http://localhost:8000/api/evaluations",
          {
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );
        console.log(response , 'liste evaluations')
        setEvaluations(response.data.evaluations);
  
        console.log(evaluations);
     
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };


  
useEffect(() => {
  fetchEvaluations();
}, []);


const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
 
const [searchValueEl, setSearchValueEl] = useState("");
const handleSearchChangeEl = (nom) => {
  setSearchValueEl(nom.target.value);
};


// faire le filtre des maison par addrsse
const filteredEvaluation = evaluations.filter(
  (evaluation) =>
    evaluation &&
    evaluation.titre &&
    evaluation.titre.toLowerCase().includes(searchValueEl.toLowerCase())
);
const displayEvaluation= searchValue === "" ? evaluations : filteredEvaluation;

const [currentPage2, setCurrentPage2] = useState(1);
 const evaluationParPage= 2;

 // pagination
 const indexOfLastEvaluation = currentPage*  evaluationParPage;
 const indexOfFirstEvaluation = indexOfLastEvaluation -   evaluationParPage;
 const currentEvaluations = filteredEvaluation.slice(
   indexOfFirstEvaluation,
   indexOfLastEvaluation
 );
 
 const totalPaginationPages2 = Math.ceil(evaluations.length /   evaluationParPage);


  

  



  return (
    <div className="contenueprincipal container ">
      <div className="dashbord-content-main-one container" id="vv">
        <div>
        <div className="mt-4 ms-3  me-3">
        <h3>Liste des évenements</h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Titre
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
               Dsecription
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
               Date de début
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Date de fin
              </th>
              
            </tr>
          </thead>
          <tbody>
            {/* {currentMaisons &&
              currentMaisons.map((maison) => {  key={maison.id} {maison.image && (*/}
                {/* return ( */}

                {currentEvents && currentEvents.map((eventEl) => (
                  <tr key={ eventEl && eventEl.id}>
                    
                    <td>{ eventEl && eventEl.titre}</td>
                    <td>{ eventEl && eventEl.description}</td>
                    <td>{ eventEl && eventEl.date_debut}</td>
                    <td>{ eventEl && eventEl.date_fin}</td>
                    <td className="d-flex justify-content-evenly">
                      {/* Vos boutons d'action ici */}
                    </td>
                    {/* <td className="d-flex justify-content-evenly">
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditEvents(eventEl)}
                    // onClick={handleShowEditEvent}
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    id="buttonModifier"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    onClick={() => supprimerEvent(eventEl.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                    </td> */}
                  </tr>
                ))}

          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
          />  
      </div>
        <div className="content-left-admin-dashbord border">
        <h3>Liste des évaluations </h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Nom
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Date de création
              </th>
              
             
            </tr>
          </thead>
          <tbody>
            
                {currentEvaluations &&  currentEvaluations.map((evaluation) => (
                   <tr key={evaluation.id} >
                   <td>{evaluation.titre} </td>
                   <td>{formatDate(evaluation.created_at)}</td>
                 </tr>
                )

                )
                 
                }
               
          </tbody>
        </table>
        <Pagination
          currentPage2={currentPage2}
          totalPaginationPages2={totalPaginationPages2}
          setCurrentPage={setCurrentPage}
        />
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
        <h1 className="text-center mt-1 ">{submissionCount}</h1>
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
    case "feedbackreponse":
      return <FeedbackReponse />;
    case "valuationreponse":
      return <EvaluationReponse/>;
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

