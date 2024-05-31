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
import Chart from "../../../Components/Admin_Components/Chart/Chart";
import Chart1 from "../../../Components/Admin_Components/Chart/Chart1";
import Chart2 from "../../../Components/Admin_Components/Chart/Chart2";
import AbonnementUser from "../../CRUD/AbonnementUser/AbonnementUser";
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";
import ClassificationChart from "../../../Components/Admin_Components/Chart/ClassificationChart";




function KPI() {

    // tableau ou stocker la liste des users
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
    const [evaluationDataQR, setEvaluationDataQR] = useState([]);
    const [evaluationData, setEvaluationData] = useState([]);
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
      setLoading(false)

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
        setLoading(false)

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
        setLoading(false)
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
         setLoading(false)
 
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

  const [reponsesQuestion, setReponsesQuestion] = useState([]);
  const fetchReponsesQuestion = async (CategorieId, evaluationId) => {
    
    try {
      const token = localStorage.getItem("tokencle");
      const response = await axios.get(
        `http://localhost:8000/api/categories/questions-and-reponses/${CategorieId}/${evaluationId}`,
        {
         
        }
      );
      setReponsesQuestion(response.data);
      setLoading(false)
      console.log(response, 'rq dasboar admin')
      
      
    } catch (error) {
      console.error("Erreur lors de la récupération des questions et reponses de  l'évaluation:", error);
    }
  };


  const [classificationData, setClassificationData] = useState(null);

  // useEffect(() => {
  //   // Remplacez l'URL par l'URL de votre backend
  //   axios.get('http://localhost:8000/api//liste/user/evaluer/admin')
  //     .then((response) => {
  //       setClassificationData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la récupération des données de classification', error);
  //     });
  // }, []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassificationData = async () => {
      const token = localStorage.getItem('tokencle'); // Récupérer le token du localStorage
      const role = localStorage.getItem('rolecle'); // Récupérer le rôle du localStorage

      if (!token || role !== 'Admin') {
        setError("Vous devez être connecté en tant qu'administrateur pour voir ces données");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/liste/user/evaluer/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClassificationData(response.data);
        console.log(response,'reponse chart')
      } catch (error) {
        setError("Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };

    fetchClassificationData();
  }, []);







  // 

  return (
    <div className="contenueprincipal container" style={{marginTop:'70px'}}>
      {loading ? (
        <LoadingBox />
         ) : (
      <div className="dashbord-content-main-one-admin container w-100" id="">
          
      <div className="content-diagramme-circulaire-right-conten-2-admin   w-100" >
            <p className="text-center mt-2  ">
              <Tableaux />
            </p>
          
        </div>
        <div className="">
          <div className="d-flex justify-center">
         <div> <Chart /></div>
          <div><Chart1 /></div>
          <div><Chart2 /></div>
          {/* <ClassificationChart classificationData={classificationData} /> */}
          </div>
        </div>
        
      </div>
      )}
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
          
          {/* contenue selon le lien clicker */}
          {RenderContent(name)}
        </div>
      </div>
    </div>
  );
}
