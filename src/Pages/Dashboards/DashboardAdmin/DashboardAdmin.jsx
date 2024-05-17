import React, {  useEffect, useState } from "react";
import "./DashboardAdmin.css";
import NavbarAdmin from "../../../Components/Admin_Components/NavbarAdmin/NavbarAdmin";
import SideBars from "../../../Components/Admin_Components/SideBar/SideBar";
import GestionUser from "../../CRUD/GestionUsers/GestionUser";
import GestionMessage from "../../CRUD/GestionMessage/GestionMessage";
import GestionCategorie from "../../CRUD/GestionCategorie/GestionCategorie";
import Tableaux from "../../../Components/Admin_Components/Tableaux/Tableaux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Authentification/AuthContext";

// import Pagination from "../../Components/Pagination/Pagination";
import GestionNewsletter from "../../CRUD/GestionNewsLetter/GestionNewsletter";
import GestionEntreprise from "../../CRUD/GestionEntreprise/GestionEntreprise";
import GestionEvenement from "../../CRUD/GestionEvenement/GestionEvenement";
import { Image } from "react-bootstrap";
import axios from "axios";
import GestionEvaluationAdmin from "../../CRUD/GestionEvaluationAdmin/GestionEvaluationAdmin";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import GestionFeedback from "../../CRUD/GestionFeedback/GestionFeedback";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GestionDevis from "../../CRUD/GestionDevis/GestionDevis";




function KPI() {

    // tableau ou stocker la liste des users
    const [users, setUsers] = useState([]);

    const [categories, setCategories] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
 //  Lister les categories
 const fetchCategories = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Admin") {
      const response = await axios.get(
        "http://localhost:8000/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.categories);

      console.log(categories);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
};
useEffect(() => {
  fetchCategories();
}, []);

  //  Lister les entreprises
  const fetchEntreprises = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/entreprises",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEntreprises(response.data.entreprises);

        console.log(entreprises);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchEntreprises();
  }, []);
  //  Lister les users
  const fetchUsers = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/participants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.participants);
        console.log(response, 'response. user admin')

        console.log(users ,'ici users du users');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);


   // Liste evenements
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
  const [searchValueUser, setSearchValueUser] = useState("");

  // function la recherche
  const handleSearchChange = (event) => {
    setSearchValueUser(event.target.value);
  };

  // faire le filtre des maison par addrsse
  const filteredUsers = users.filter(
    (user) =>
      user &&
      user.nom &&
      user.nom.toLowerCase().includes(searchValueUser.toLowerCase())
  );
  const displayUsers = searchValueUser === "" ? users : filteredUsers;


    const [currentPage1, setCurrentPage1] = useState(1);
  const usersParPage= 2;

  // pagination
  const indexOfLastUser = currentPage1* usersParPage;
  const indexOfFirstUser = indexOfLastUser - usersParPage;
  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPaginationPagesUser = Math.ceil(users.length / usersParPage);


  //  pour le champ recherche des evenements
  const [searchValueEvent, setSearchValueEvent] = useState("");

   // function la recherche
   const handleSearchChangeEvent = (eventElement) => {
    setSearchValueUser(eventElement.target.value);
  };

   // faire le filtre des maison par addrsse
   const filteredEvents = events.filter(
    (eventEl) =>
      eventEl &&
      eventEl.titre &&
      eventEl.titre.toLowerCase().includes(searchValueEvent.toLowerCase())
  );

  const displayEvents = searchValueEvent === "" ? events : filteredEvents;


    const [currentPage, setCurrentPage] = useState(1);
  const eventsParPage= 2;


  const indexOfLastEvent = currentPage* eventsParPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsParPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const totalPaginationPagesEvent = Math.ceil(events.length / eventsParPage);




 
   


 

  
 

  



  return (
    <div className="contenueprincipal container ">
      <div className="dashbord-content-main-one container" id="vv">
        <div>
        <div className="content-left-admin-dashbord border">
          <h3 className="mb-2">Liste des Participants</h3>
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
                  Catégorie
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Entreprise
                </th>
              </tr>
            </thead>
            <tbody>
            { currentUsers &&
              currentUsers.map((user) => ( 
              <tr key={user && user.id} >
                <td>{user &&  user.nom}</td>
                <td>{user &&  user.prenom}</td>
                <td>{user &&  user.email}</td>
                <td>{user &&  user.categorie.nom}</td>
                <td>{user &&  user.entreprise.nom}</td>
              </tr>
              ))} 
              
            </tbody>
          </table>
          <Pagination
          currentPage={currentPage1}
          totalPaginationPages={totalPaginationPagesUser}
          setCurrentPage={setCurrentPage1}
          />  
        </div>
        <div className="content-left-admin-dashbord border">
          <h3 className="mb-2">Liste des Evenements</h3>
          <table className="table mb-5">
            <thead className="table-light" id="hearder-color">
              <tr>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Nom
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Description
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Date debut
                </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                  Date fin
                </th>
                
              </tr>
            </thead>
            <tbody>
            {currentEvents &&
               currentEvents.map((eventEl) => ( 
              <tr key={eventEl && eventEl.id} >
                <td>{eventEl &&  eventEl.titre}</td>
                <td>{eventEl &&  eventEl.description}</td>
                <td>{eventEl &&  eventEl.date_debut}</td>
                <td>{eventEl &&  eventEl.date_fin}</td>
               
              </tr>
              ))} 
            </tbody>
          </table>
          <Pagination
           currentPage={currentPage}
           totalPaginationPages={totalPaginationPagesEvent}
           setCurrentPage={setCurrentPage}
          
          />  
          
          
        </div>
          
        </div>
        <div className="content-diagramme-circulaire-right-conten-2 border pt-4">
          <div className=" ">
            <p className="text-center mt-2  ">
              <Tableaux />
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
    
    case "gestionevaluation":
      return <GestionEvaluationAdmin />;
    
    case "gestionfeedback":
      return <GestionFeedback />;
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

  const navigate = useNavigate();
  
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");

  useEffect(() => {
   
    if ( role !== "Admin") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Acces interdit, connecter vous en tant qu'admin pour avoir accée au dashboard!",
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
