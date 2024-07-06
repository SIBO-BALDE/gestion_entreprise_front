
import {
  faComment,
  faEye,
  faFolderOpen,
  faLockOpen,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { Pie } from 'react-chartjs-2';

import 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);
export default function GestionEvenement({ id }) {
  // const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  let displayedUsers = {};

  const [showEditModalEvents, setShowEditModalEvents] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showEventBlok, setShowEventBlok] = useState(false);
  const handleClosAdd = () => setShowAdd(false); 
  const handleshowAdd = () => setShowAdd(true);
  const handleshowLink = () => setShowLink(true);
  const handleClosLink = () => setShowLink(false); 

  const handleCloseEdit = () => setShowEvent(false);
  const handleShowEdit = () => setShowEvent(true);
  const handleShowEditEvent = () => showEditModalEvents(true);
  const handleCloseEditEvents = () => setShowEditModalEvents(false);


  const handleCloseEventBlok = () => setShowEventBlok(false);
  const handleShowEventBlok = () => setShowEventBlok(true);
  const [loading, setLoading] = useState(true);


  
  


  const [events, setEvents] = useState([]);
  const [reponses, setReponses] = useState([]);
  const [reponses2, setReponses2] = useState([]);
  const [reponsesData, setReponsesData] = useState([]);
  const [eventLink, setEventLink] = useState(null);
  const [eventToken, setEventToken] = useState(null);

  // etat pour ajout categorie
  const [eventData, setEventData] = useState({
    titre: "",
    description: "",
    date_debut: "",
    date_fin: "",
    questions: [{ nom: "", reponses: [{ nom: "" }] }],
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = eventData.questions.slice();
    newQuestions[index].nom = event.target.value;
    setEventData({ ...eventData, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    setEventData({
      ...eventData,
      questions: [...eventData.questions, { nom: "", reponses: [{ nom: "" }] }],
    });
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = eventData.questions.slice();
    newQuestions.splice(index, 1);
    setEventData({ ...eventData, questions: newQuestions });
  };

  const handleReponseChange = (questionIndex, reponseIndex, e) => {
    const newQuestions = eventData.questions.slice();
    newQuestions[questionIndex].reponses[reponseIndex].nom = e.target.value;
    setEventData({ ...eventData, questions: newQuestions });
  };

  const handleAddReponse = (questionIndex) => {
    const newQuestions = eventData.questions.slice();
    newQuestions[questionIndex].reponses = [...newQuestions[questionIndex].reponses, { nom: "" }];
    setEventData({ ...eventData, questions: newQuestions });
  };

  const handleRemoveReponse = (questionIndex, reponseIndex) => {
    const newQuestions = eventData.questions.slice();
    newQuestions[questionIndex].reponses.splice(reponseIndex, 1);
    setEventData({ ...eventData, questions: newQuestions });
  };


  //  Funtion pour ajouter un evenement
  const ajouterEvent = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
  
    if (eventData.titre === "" || eventData.description === "" || eventData.date_debut === "" || eventData.date_fin === "") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Les champs sont obligatoires!",
      });
      return;
    }
  
    // Vérification des questions et des réponses
    for (const question of eventData.questions) {
      if (question.nom === "") {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Tous les champs de question sont obligatoires!",
        });
        return;
      }
      for (const reponse of question.reponses) {
        if (reponse.nom === "") {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Tous les champs de réponse sont obligatoires!",
          });
          return;
        }
      }
    }
  
    try {
      if (token && role === "Admin") {
        const response = await axios.post(
          "https://api.myfeedback360.com/api/evenement/create",
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const eventLink = response.data.response_link;
          const tokenMatch = eventLink.match(/\/eventform\/(.+)$/);
          const extractedToken = tokenMatch ? tokenMatch[1] : null;
          setEvents((prevEvents) => [...prevEvents, response.data.Evenement]);
  
          setEventData({
            titre: "",
            description: "",
            date_debut: "",
            date_fin: "",
            questions: [{ nom: "", reponses: [{ nom: "" }] }],
          });
  
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Événement ajouté avec succès!",
          });
          setLoading(false)
          setEventLink(eventLink);
          setEventToken(extractedToken);
          fetchEvents();
          handleCloseEdit();
          handleshowLink();
  
        } else {
          console.error("Erreur dans l'ajout de l'événement");
        }
      }
    } catch (error) {
      console.error("Erreur Axios:", error);
    }
  };

  
// Function pour lister les evenements
  const fetchEvents = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "https://api.myfeedback360.com/api/evenements",
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


   // Function pour supprimer une catégorie
   const supprimerEvent = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
  
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir supprimer l'événement?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004573',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token && role === 'Admin') {
          try {
            // Suppression de l'événement
            const response = await axios.delete(
              `https://api.myfeedback360.com/api/evenements/${id}/soft-delete`,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            if (response.status === 200) {
              // Mettre à jour la liste des événements
              setLoading(false)
              fetchEvents();
              fetchEventsBlok(); 
  
              Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "L'événement a été supprimé avec succès!",
              });
  
              console.log("Événement supprimé avec succès :", response.data);
            } else {
              console.error("Erreur lors de la suppression de l'événement");
              Swal.fire({
                icon: "error",
                title: "Erreur!",
                text: "Une erreur est survenue lors de la suppression de l'événement.",
              });
            }
          } catch (error) {
            console.error("Erreur lors de la suppression de l'événement :", error);
            Swal.fire({
              icon: "error",
              title: "Erreur!",
              text: "Une erreur est survenue lors de la suppression de l'événement.",
            });
          }
        }
      }
    });
  };
  

  //  etat pour modifier evenement
 const [editEventData, setEditEventData] = useState({
  id: null,
  titre: "",
  description: "",
  date_debut: "",
  date_fin: "",
  questions: [{ nom: "", reponses: [{ nom: "" }] }],
  
});

  // Gestionnaire de clic pour le bouton de modification (recuperer les information lors du clique du button modal)
  const handleShowEditEvents = (eventEl) => {
    setEditEventData({
      id: eventEl.id,
      titre: eventEl.titre,
      description: eventEl.description,
      date_debut: eventEl.date_debut,
      date_fin: eventEl.date_fin,
      questions: eventEl.questions.map((question) => ({
        nom: question.nom,
        reponses: question.reponses.map((reponse) => ({ nom: reponse.nom })),
      })),
    });
    setShowEditModalEvents(true);
  };
  

//Les functions pour incrementer les inputs des questions et des  reponses
  const handleQuestionChangeEdit = (index, value) => {
    const newQuestions = [...editEventData.questions];
    newQuestions[index].nom = value;
    setEditEventData({ ...editEventData, questions: newQuestions });
  };
  
  const handleReponseChangeEdit = (questionIndex, reponseIndex, value) => {
    const newQuestions = [...editEventData.questions];
    newQuestions[questionIndex].reponses[reponseIndex].nom = value;
    setEditEventData({ ...editEventData, questions: newQuestions });
  };
  
  const handleAddQuestionEdit = () => {
    setEditEventData({
      ...editEventData,
      questions: [...editEventData.questions, { nom: "", reponses: [{ nom: "" }] }],
    });
  };
  
  const handleRemoveQuestionEdit = (index) => {
    const newQuestions = [...editEventData.questions];
    newQuestions.splice(index, 1);
    setEditEventData({ ...editEventData, questions: newQuestions });
  };
  
  const handleAddReponseEdit = (questionIndex) => {
    const newQuestions = [...editEventData.questions];
    newQuestions[questionIndex].reponses.push({ nom: "" });
    setEditEventData({ ...editEventData, questions: newQuestions });
  };
  
  const handleRemoveReponseEdit = (questionIndex, reponseIndex) => {
    const newQuestions = [...editEventData.questions];
    newQuestions[questionIndex].reponses.splice(reponseIndex, 1);
    setEditEventData({ ...editEventData, questions: newQuestions });
  };
  
// Function pour modifier evenement
  const modifierEvent = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
  
    if (editEventData.titre === "" || editEventData.description === "" || editEventData.date_debut === "" || editEventData.date_fin === "") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Les champs sont obligatoires!",
      });
      return;
    }
  
    try {
      if (token && role === "Admin") {
        const response = await axios.post(
          `https://api.myfeedback360.com/api/evenement/update/${editEventData.id}`,
          editEventData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'response ev modif');
  
        if (response.status === 200) {
          const updatedEvents = events.map((evtUp) =>
            evtUp.id === editEventData.id
              ? response.data.evenements
              : evtUp
          );
          setEvents(updatedEvents);
          setLoading(false);
  
          // Vider les champs après modification
          setEditEventData({
            id: "",
            titre: "",
            description: "",
            date_debut: "",
            date_fin: "",
            questions: [{ nom: "", reponses: [{ nom: "" }] }],
          });
  
          handleCloseEditEvents();
  
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Événement mis à jour avec succès!",
          });
  
          fetchEvents();
        } else {
          console.error("Erreur lors de la modification de l'événement");
        }
      }
    } catch (error) {
      console.error("Erreur Axios:", error);
    }
  };
  

  
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


  const [currentPage1, setCurrentPage1] = useState(1);
const  eventsParPage= 5;

// pagination
const indexOfLastEvent = currentPage1 * eventsParPage;
const indexOfFirstEvent = indexOfLastEvent - eventsParPage;
const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);


const totalPaginationPagesEvent = Math.ceil(events.length /  eventsParPage);
//  pour le champ recherche
const [searchValueBlok, setSearchValueBlok] = useState("");
const [eventsBlok, setEventsBlok] = useState([]);


// function la recherche
const handleSearchChangeBlok = (event) => {
  setSearchValueBlok(event.target.value);
};

// faire le filtre des maison par addrsse
const filteredEventsBlok = eventsBlok.filter(
  (eventEl) =>
    eventEl &&
    eventEl.titre &&
    eventEl.titre.toLowerCase().includes(searchValueBlok.toLowerCase())
);
const displayEventsBlok = searchValueBlok === "" ? eventsBlok : filteredEventsBlok;


  const [currentPage, setCurrentPage] = useState(1);
const  eventsBlokParPage= 5;

// pagination
const indexOfLastEventBlok = currentPage * eventsBlokParPage; // Utiliser currentPage au lieu de currentPage1
const indexOfFirstEventBlok = indexOfLastEventBlok - eventsBlokParPage;
const currentEventsBlok = filteredEventsBlok.slice(
  indexOfFirstEventBlok,
  indexOfLastEventBlok
);

const totalPaginationPages = Math.ceil(
  eventsBlok.length / eventsBlokParPage
);

// Function pour lister les reponses
const fetchFeedbackResponses = async (evenement_id) => {
  console.log("Evenement ID:", evenement_id);
 

  try {
    const token = localStorage.getItem("tokencle");
    const response = await axios.get(
      `https://api.myfeedback360.com/api/listes/reponses/question/evenement/${evenement_id}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    setReponses(response.data.questions);
    console.log(response, 'response1')
  } catch (error) {
    console.error("Erreur lors de la récupération des réponses aux questions de l'événement :", error);
  }
};

const fetchFeedbackResponses2 = async (evenement_id) => {
  
  try {
    const token = localStorage.getItem("tokencle");
    const response = await axios.get(
      `https://api.myfeedback360.com/api/listes/reponses/question/evenement/repnodre/${evenement_id}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    setReponses2(response.data.questions);
    console.log(response,'response 2')
  } catch (error) {
    console.error("Erreur lors de la récupération des réponses aux questions de l'événement :", error);
  }
};


// Function pour recuperer les reponse lors du click d'un button sur un modal
const handleButtonClick = async (evenement_id) => {
  
  console.log("Evenement ID:", evenement_id);
  await fetchFeedbackResponses(evenement_id);
  await fetchFeedbackResponses2(evenement_id);
  setShowAdd(true);
};

// ***** Function pour afficher le nombre personne donnant la reponses dans un diagrammeChart*******//
const prepareChartData = (reponse) => {
  const responseCounts = reponse.reponses.map(r => r.count);
  const labels = reponse.reponses.map(r => r.nom);

  return {
    labels: labels,
    datasets: [
      {
        data: responseCounts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};
const options = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,
        padding: 20,
      },
    },
    datalabels: {
      color: 'red',
      font: {
        size: 12,
      },
      formatter: (value, context) => `${context.dataIndex}: ${Math.round(value)}%`,
    },
  },
  layout: {
    padding: {
      top: 30,
    },
  },
};

const chartContainerStyle = {
  width: '250px',
  height: '250px',
};


// Function pour lister les evenement bloques
const fetchEventsBlok = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Admin") {
      const response = await axios.get(
        "https://api.myfeedback360.com/api/listes/evenements/archives",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response , 'liste archive events')
      setEventsBlok(response.data.evenements);

      console.log(eventsBlok, 'blok event');
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
};
useEffect(() => {
  fetchEventsBlok();
}, []);


//  Function pour archiver les evenement  
const archiverEvaluation = async (id) => {
  const token = localStorage.getItem("tokencle");
  const role = localStorage.getItem("rolecle");
  console.log("0 evenementId :", id);
  
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "De vouloir archiver l'évenement?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#004573',
    cancelButtonColor: '#f00020',
    confirmButtonText: "Oui, j'accepte!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "L'événement a été archivé avec succès!",
      });

      if (token && role === 'Admin') {
        try {
          const response = await axios.post(
            `https://api.myfeedback360.com/api/archiver/evenement/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          fetchEvents(); // Mettre à jour la liste des événements actifs
          fetchEventsBlok(); // Mettre à jour la liste des événements archivés

          console.log("Évaluation archivée avec succès :", response.data);
        } catch (error) {
          console.error("Erreur lors de l'archivage de l'évaluation :", error);
        }
      }
    }
  });
};



// Fonction pour copier le lien generer  en creant un evenement
const copyToClipboard = () => {
  navigator.clipboard.writeText(eventLink).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Lien copié!',
      text: 'Le lien de l\'événement a été copié dans le presse-papiers.',
    });
  }).catch((err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Impossible de copier le lien. Veuillez réessayer.',
    });
  });
};

let questionCounter = 1;









  return (
    <div className="mt-4">
      {loading ? (
        <LoadingBox />
         ) : (
    <div className="container">
      <div className="d-flex justify-content-between mt-5 content-input-global-projet">
        <div>
          <Button
            variant="primary"
            onClick={handleShowEdit}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter un évenement
          </Button>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={handleShowEventBlok}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Liste des évenements archivés
          </Button>
        </div>
        <div className="flex-grow-1 d-flex justify-content-end content-input-global-projet2 " id="content-input-global-projet2">
          <div className="champsRecherche mt-2 mb-3 w-50">
            <Form>
              <div
                className="input-group flex-nowrap "
                style={{ borderColor: "#004573" }}
              >
                <Form.Control
                  type="search"
                  className="form-control w-50   "
                  placeholder="Rechercher un évenement"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <span
                  className="input-group-text text-white me-4"
                  id="addon-wrapping"
                  style={{ backgroundColor: "#004573" }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-4 ms-3  me-3">
        <h3>Liste des évenements</h3>
        <div className="table-responsive">
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Reponses
              </th>
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
              <th
                className="d-flex  justify-content-center "
                style={{
                  backgroundColor: "#004573",
                  color: "#fff",
                  marginLeft: "3rem",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>

                {currentEvents && currentEvents.map((eventEl) => (
                  <tr key={ eventEl && eventEl.id}>
                    <td className="">
                 
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    onClick={() => handleButtonClick(eventEl.id)}
                    // onClick={() => supprimerEvent(eventEl.id)}
                  >
                    <FontAwesomeIcon icon={faComment} />
                  </Button>
                    </td>
                    <td>{ eventEl && eventEl.titre}</td>
                    <td>{ eventEl && eventEl.description}</td>
                    <td>{ eventEl && eventEl.date_debut}</td>
                    <td>{ eventEl && eventEl.date_fin}</td>
                    <td className="d-flex justify-content-evenly">
                      {/* Vos boutons d'action ici */}
                    </td>
                    <td className="d-flex justify-content-evenly">
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
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    onClick={() => archiverEvaluation(eventEl.id)}
                  >
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </Button>
                    </td>
                  </tr>
                ))}

          </tbody>
        </table>
        <Pagination
            currentPage={currentPage1}
            totalPaginationPages={totalPaginationPagesEvent}
            setCurrentPage={setCurrentPage1}
/>

        </div>
 
      </div>

      {/** ********************* modal debut  ajouter event***************************/}
        <Modal show={showEvent} onHide={handleCloseEdit} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un évenement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex justify-content-around" style={{ gap: '10px' }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    value={eventData.titre}
                    onChange={handleInputChange}
                    type="text"
                    name="titre"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={eventData.description}
                    onChange={handleInputChange}
                    type="text"
                    name="description"
                    placeholder=""
                  />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-around" style={{ gap: '10px' }}>
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                  <Form.Label>Date de début</Form.Label>
                  <Form.Control
                    value={eventData.date_debut}
                    onChange={handleInputChange}
                    type="date"
                    name="date_debut"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                  <Form.Label>Date de fin</Form.Label>
                  <Form.Control
                    value={eventData.date_fin}
                    onChange={handleInputChange}
                    type="date"
                    name="date_fin"
                    placeholder=""
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Label>Questions</Form.Label>
                {eventData.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-3">
                    <div className="d-flex align-items-center" style={{ gap: '10px', marginBottom: '10px' }}>
                      <Form.Control
                        type="text"
                        value={question.nom}
                        onChange={(e) => handleQuestionChange(questionIndex, e)}
                        placeholder="Question"
                      />
                      <Button variant="" className="bg-white" onClick={() => handleRemoveQuestion(questionIndex)} style={{border:'1px solid red'}}>
                        <FontAwesomeIcon icon={faTrash}  style={{color:'red'}} />
                      </Button>
                    </div>
                    <div>
                    <Form.Label>Reponses</Form.Label>
                      {question.reponses.map((reponse, reponseIndex) => (
                        <div key={reponseIndex} className="d-flex align-items-center" style={{ gap: '10px', marginBottom: '5px' }}>
                          <Form.Control
                            type="text"
                            l
                            value={reponse.nom}
                            onChange={(e) => handleReponseChange(questionIndex, reponseIndex, e)}
                            placeholder="Réponse"
                          />
                          <Button variant="" className="bg-white" onClick={() => handleRemoveReponse(questionIndex, reponseIndex)} style={{border:'1px solid red'}}>
                            <FontAwesomeIcon icon={faTrash}  style={{color:'red'}} />
                          </Button>
                        </div>
                      ))}
                      <Button variant="" className="bg-white" onClick={() => handleAddReponse(questionIndex)} style={{ marginRight: '10px', border:'1px solid #004573'}}>
                        <FontAwesomeIcon icon={faPlus}  style={{color:'#004573'}} />
                      </Button><span>Ajouter une réponse</span>
                    </div>
                  </div>
                ))}
                <Button variant="" onClick={handleAddQuestion} style={{ marginRight: '10px', border:'1px solid #004573' }}>
                  <FontAwesomeIcon icon={faPlus} style={{color:'#004573'}} />
                </Button><span>Ajouter une question</span>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterEvent}
              style={{
                backgroundColor: "#004573",
                border: "none",
                width: "130px",
              }}
            >
              Ajouter
            </Button>
            <Button
              variant="primary"
              onClick={handleCloseEdit}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #004573",
                width: "130px",
                color: "#004573",
              }}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      {/*************************** modal fin ajouter event ***************************/}


      {/************************** modal debut modifier event ***************************/}
      <Modal show={showEditModalEvents} onHide={handleCloseEditEvents} id="buttonModifier">
        <Modal.Header closeButton>
          <Modal.Title>Modifier Evenement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex justify-content-around" style={{ gap: '10px' }}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="titre"
                  value={editEventData.titre}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      titre: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="description"
                  value={editEventData.description}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-around" style={{ gap: '10px' }}>
              <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                <Form.Label>Date de debut</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  name="date_debut"
                  value={editEventData.date_debut}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      date_debut: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                <Form.Label>Date de fin</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  name="date_fin"
                  value={editEventData.date_fin}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      date_fin: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
            <div>
              <Form.Label>Questions</Form.Label>
              {editEventData.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-3">
                  <div className="d-flex align-items-center" style={{ gap: '10px', marginBottom: '10px' }}>
                    <Form.Control
                      type="text"
                      placeholder="Question"
                      name="nom"
                      value={question.nom}
                      onChange={(e) => handleQuestionChangeEdit(questionIndex, e.target.value)}
                    />
                    <Button variant="white" onClick={() => handleRemoveQuestionEdit(questionIndex)} style={{border:'1px solid red'}}>
                      <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} />
                    </Button>
                  </div>
                  <Form.Label>Reponses</Form.Label>
                  <div>
                    {question.reponses.map((reponse, reponseIndex) => (
                      <div key={reponseIndex} className="d-flex align-items-center" style={{ gap: '10px', marginBottom: '5px' }}>
                        <Form.Control
                          type="text"
                          placeholder="Réponse"
                          value={reponse.nom}
                          onChange={(e) => handleReponseChangeEdit(questionIndex, reponseIndex, e.target.value)}
                        />
                        <Button variant="" className="bg-white" onClick={() => handleRemoveReponseEdit(questionIndex, reponseIndex)} style={{border:'1px solid red'}}>
                          <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} />
                        </Button>
                      </div>
                    ))}
                    <Button variant="" className="bg-white" onClick={() => handleAddReponseEdit(questionIndex)} style={{border:'1px solid #004573', marginRight: '10px'}}>
                      <FontAwesomeIcon icon={faPlus} style={{color: '#004573'}} />
                    </Button><span>Ajouter une réponse</span>
                  </div>
                </div>
              ))}
              <Button variant="" className="bg-white" onClick={handleAddQuestionEdit} style={{border:'1px solid #004573', marginRight: '10px'}}>
                <FontAwesomeIcon icon={faPlus} style={{color: '#004573'}} />
              </Button><span>Ajouter une question</span>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={modifierEvent}
            style={{
              backgroundColor: "#004573",
              border: "none",
              width: "130px",
            }}
          >
            Modifier
          </Button>
          <Button
            variant="primary"
            onClick={handleCloseEditEvents}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #004573",
              width: "130px",
              color: "#004573",
            }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/*************************** modal fin modifier evenement *************************/}
     

      {/********************** liste des reponse et question par rappor à un evenement  debut****************/}
        <Modal show={showAdd} onHide={handleClosAdd} id="buttonModifier" size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Liste des réponses par rapport à l'événement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className="" style={{display:'flex',justifyContent:'center',gap:'15px'}}> */}
              <div>
              {reponses?.map((reponse, index) => (
    <div key={index} className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <strong>{questionCounter + index}-</strong>{reponse.nom}
        </h5>
        <div style={chartContainerStyle}>
          <Pie data={prepareChartData(reponse)} options={options} />
        </div>
      </div>
    </div>
  ))}
              </div>
              <div>
              {reponses2?.map((reponse2, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title"><strong>{questionCounter++}-</strong>{reponse2.nom}</h5>
                        {reponse2.reponses.map((feedback, feedbackIndex) => (
                          <div key={feedbackIndex} className="card-text">
                            {/* <p>Réponse: {feedback.nom}</p> */}
                            <div >
                             <h6>{feedback.repondre}</h6>
                            </div>
                          
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

              </div>
            {/* </div> */}

          </Modal.Body>
        </Modal>
      {/********************** liste des reponse et question par rappor à un evenement  fin****************/}


      {/*********************** evenement archivé debut *********************************************/}
        <Modal show={showEventBlok} onHide={handleCloseEventBlok} id="buttonAjouter" size="lg">
            <Modal.Header closeButton>
            
              <Modal.Title>Liste des evenements archives</Modal.Title>
            </Modal.Header>
            <div className="flex-grow-1 d-flex justify-content-end ">
            <div className="champsRecherche mt-2 mb-3 w-50">
              <Form>
                <div
                  className="input-group flex-nowrap "
                  style={{ borderColor: "#004573" }}
                >
                  <Form.Control
                    type="search"
                    className="form-control w-50   "
                    placeholder="Rechercher un évenement bloquer"
                    aria-label="user"
                    aria-describedby="addon-wrapping"
                    value={searchValueBlok}
                    onChange={handleSearchChangeBlok}
                  />
                  <span
                    className="input-group-text text-white me-4"
                    id="addon-wrapping"
                    style={{ backgroundColor: "#004573" }}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                </div>
              </Form>
            </div>
            </div>
            <Modal.Body>
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
            
                  {currentEventsBlok && currentEventsBlok.map((eventEl) => (
                    <tr key={ eventEl && eventEl.id}>
                      
                      <td>{ eventEl && eventEl.titre}</td>
                      <td>{ eventEl && eventEl.description}</td>
                      <td>{ eventEl && eventEl.date_debut}</td>
                      <td>{ eventEl && eventEl.date_fin}</td>
                      <td className="d-flex justify-content-evenly">
                        {/* Vos boutons d'action ici */}
                      </td>
                      
                    </tr>
                  ))}

            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPaginationPages={totalPaginationPages}
            setCurrentPage={setCurrentPage}
            />  
        
          
            </Modal.Body>
            
        </Modal>
      {/*********************** evenement archivé fin *********************************************/}

      {/*********************** lien evenement creer debut ****************************************/}
      {/* <Button onClick={() => setShowLink(true)}>Show Link Modal</Button> */}
      <Modal show={showLink} onHide={handleClosLink} id="buttonAjouter">
        <Modal.Header closeButton>
          <Modal.Title>Lien de l'événement que vous avez créé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lien</Form.Label>
              <InputGroup>
                <Form.Control
                  value={eventLink}
                  readOnly
                  type="text"
                  placeholder=""
                  style={{ borderBottom: '1px solid black' }}
                />
                <Button variant="outline-secondary" onClick={copyToClipboard}>
                  <FontAwesomeIcon icon={faClipboard} />
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/*********************** lien evenement creer fin  *****************************************/}


    </div>
)}
    </div>
  );
}


