
import {
  faComment,
  faEye,
  faFolderOpen,
  faLockOpen,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";



export default function GestionEvenement({ id }) {
  // const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  let displayedUsers = {};

  const [showEditModalEvents, setShowEditModalEvents] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showEventBlok, setShowEventBlok] = useState(false);
  const handleClosAdd = () => setShowAdd(false); 
  const handleshowAdd = () => setShowAdd(true);

  const handleCloseEdit = () => setShowEvent(false);
  const handleShowEdit = () => setShowEvent(true);
  const handleShowEditEvent = () => showEditModalEvents(true);
  const handleCloseEditEvents = () => setShowEditModalEvents(false);


  const handleCloseEventBlok = () => setShowEventBlok(false);
  const handleShowEventBlok = () => setShowEventBlok(true);
  const [loading, setLoading] = useState(true);


  
  


  const [events, setEvents] = useState([]);
  const [reponses, setReponses] = useState([]);
  const [reponsesData, setReponsesData] = useState([]);

  // etat pour ajout categorie
  const [eventData, setEventData] = useState({
    titre: "",
    description: "",
    date_debut: "",
    date_fin: "",
  
  });

   // function pour ajouter une categorie
   const ajouterEvent = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
    // alert('okay')
  
    if(eventData.titre === "" ||  eventData.description === ""  || eventData.date_debut === "" || eventData.date_fin === "" ){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      // console.log(eventData, 'categoriedata')
      return
    }
    try {
      if (token && role === "Admin") {
        const response = await axios.post(
          "http://localhost:8000/api/evenement/create",

          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'responses event ajout')
        const essay =response.data.Evenement
        console.log(essay , 'essay')

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle maison à la liste existante
          console.log(response, 'response categorie')
          setEvents([...events, response.data.Evenement
          ]);
          setLoading(false)
          
          console.log(events, 'events event')
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setEventData({
            titre: "",
            description: "",
            date_debut: "",
            date_fin: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "evenement ajouter avec succée!",
          });
          // Fermez le modal
          handleCloseEdit();
          fetchEvents()
        } else {
          console.error("Erreur dans lajout de maison");
        }
      }
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  };

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
              `http://localhost:8000/api/evenements/${id}/soft-delete`,
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
  

  //  etat pour modifier categorie
 const [editEventData, setEditEventData] = useState({
  id: null,
  titre: "",
  description: "",
  date_debut: "",
  date_fin: "",
  
});

  // Gestionnaire de clic pour le bouton de modification

  const handleShowEditEvents = (eventEl) => {
    setEditEventData({
      id: eventEl.id,
      titre: eventEl.titre,
      description: eventEl.description,
      date_debut: eventEl.date_debut,
      date_fin: eventEl.date_fin,
     
    });
    setShowEditModalEvents(true);
  };

  // Fonction pour mettre à jour une catégorie
  const modifierEvent = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
          const response = await axios.post(
          `http://localhost:8000/api/evenement/update/${editEventData.id}`,
          editEventData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'response ev modif')

        if (response.status === 200) {
          const updatedEvents = events.map((evtUp) =>
            evtUp.id === editEventData.id
              ? response.data.evenements
              : evtUp
          );
          setEvents(updatedEvents);
          setLoading(false)
          handleCloseEditEvents();
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "evenement mise à jour avec succès!",
          });
          fetchEvents();
        } else {
          console.error("erreur lors de la modification de la evenement");
        }
      }
    } catch (error) {
      console.error("une erreur  Axios:", error);
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


const fetchFeedbackResponses = async (evenement_id) => {
  console.log("Evenement ID:", evenement_id);
  // console.log("User ID:", user_id);

  try {
    const token = localStorage.getItem("tokencle");
    const response = await axios.get(
      `http://localhost:8000/api/evenement/questions-reponses/${evenement_id}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response endpoint :", response);
    console.log("response.data :", response.data);
    console.log("response.data.questions :", response.data.questions);
    console.log("response.data.questions.nom :", response.data.questions.nom);
    // console.log("Réponses user :", response.data.reponsefeedbacks.user);
    setReponses(response.data.questions);
    setReponsesData(response.data.questions)
    // Traitez les données de réponse ici, vous pouvez les stocker dans un état pour les afficher dans votre composant
  } catch (error) {
    console.error("Erreur lors de la récupération des réponses aux questions de l'événement :", error);
  }
};

const handleButtonClick = async (evenement_id) => {
  // Récupérer l'ID de l'utilisateur
  console.log("Evenement ID:", evenement_id);
  // const user_id = localStorage.getItem("user_id"); 

  // Appeler la fonction pour récupérer les réponses aux questions de l'événement pour cet utilisateur
  await fetchFeedbackResponses(evenement_id);

  // Afficher le modal pour donner un feedback à l'événement
  setShowAdd(true);
};



const fetchEventsBlok = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Admin") {
      const response = await axios.get(
        "http://localhost:8000/api/listes/evenements/archives",
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

// archiver 

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
            `http://localhost:8000/api/archiver/evenement/${id}`,
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



// fecht blok events







  return (
    <div className="mt-4">
      {loading ? (
        <LoadingBox />
         ) : (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
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
            currentPage={currentPage1} // Assurez-vous que c'est currentPage1 pour la première pagination
            totalPaginationPages={totalPaginationPagesEvent}
            setCurrentPage={setCurrentPage1}
/>
 
      </div>

      {/* modal debut  ajouter event*/}
      <>
        <Modal show={showEvent} onHide={handleCloseEdit} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un évenement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex justify-content-around"  style={{gap:'10px'}}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    value={eventData.titre}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        titre: e.target.value,
                      });
                    
                    }}
                    type="text"
                    placeholder=""
                  />
                 
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={eventData.description}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        description: e.target.value,
                      });
                      
                    }}
                    type="text"
                    placeholder=""
                  />
                 
                </Form.Group>
                
              </div>
              <div className="d-flex justify-content-around "  style={{gap:'10px'}}>
              <Form.Group
                  className="mb-3 w-100"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date de début</Form.Label>
                  <Form.Control
                    value={eventData.date_debut}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        date_debut: e.target.value,
                      });
                      
                    }}
                    type="date"
                    placeholder=""
                  />
                  
                </Form.Group>
                <Form.Group
                  className="mb-3 w-100"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date de fin</Form.Label>
                  <Form.Control
                    value={eventData.date_fin}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        date_fin: e.target.value,
                      });
                     
                    }}
                    type="date"
                    placeholder=""
                  />
                 
                </Form.Group>

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
      </>
      {/* modal fin ajouter event */}

      {/* modal debut modifier event */}
      
      <Modal
        show={showEditModalEvents}
        onHide={handleCloseEditEvents}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier Evenement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex justify-content-around"  style={{gap:'10px'}}>
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
                    titre:e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="nom"
                value={editEventData.description}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    description:e.target.value,
                  })
                }
              />
            </Form.Group>
            </div>
            <div className="d-flex justify-content-around"  style={{gap:'10px'}}>
            <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Date de debut</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="nom"
                value={editEventData.date_debut}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    date_debut:e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="nom"
                value={editEventData.date_fin}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    date_fin:e.target.value,
                  })
                }
              />
            </Form.Group>
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
      {/* modal fin modifier maison */}
     
      {/* modal fin modifier event */}



      <Modal show={showAdd} onHide={handleClosAdd} id="buttonModifier">
        <Modal.Header closeButton>
          <Modal.Title>Liste des réponses par rapport à l'événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {reponses.map((reponse, index) => (
  <div key={index} className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">Question: {reponse.nom}</h5>
      {/* Afficher les réponses pour cette question */}
      {reponse.reponsefeedbacks.map((feedback, feedbackIndex) => (
        <div key={feedbackIndex} className="card-text">
          <p>Réponse: {feedback.nom}</p>
          {/* Afficher l'utilisateur associé à cette réponse */}
          <p>Utilisateur: {feedback.user.prenom} {feedback.user.nom}</p>
        </div>
      ))}
    </div>
  </div>
))}

        </Modal.Body>
      </Modal>



      {/* blok */}

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
      {/* blok */}


    </div>
)}
    </div>
  );
}


