import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { useAuth } from '../../Auth/AuthContex';
import Pagination from '../../../Components/User_Components/Pagination/Pagination';
import LoadingBox from '../../../Components/LoadingBox/LoadingBox';


export default function GestionFeedbackEvenement() {
  const [loading, setLoading] = useState(true);
  const { handleSubmission } = useAuth();

  const [showAdd, setShowAdd] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // const fetchQuestions = async (eventId) => {
  //   const token = localStorage.getItem("tokencle");
  //   const role = localStorage.getItem("rolecle");
  //   try {
  //     if (token && role === "Participant") {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/Questionsfeedback/listes",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setQuestions(response.data.Questionsfeedback);
  //     } else {
  //       console.error("Vous n'avez pas les autorisations nécessaires pour récupérer les questions.");
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des questions:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuestions();
  // }, []);

  const handleClosAdd = () => setShowAdd(false); 
  const handleshowAdd = () => setShowAdd(true);

 

 
  
  
  const ajouterReponseEvenement = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
  
    try {
      if (token && role === "Participant") {
        // Créer un tableau pour stocker les promesses de requêtes axios
        const requests = [];
  
        // Ajouter chaque réponse à une promesse de requête axios
        for (const [questionId, reponse] of Object.entries(responses)) {
          const request = axios.post(
            "http://localhost:8000/api/reponsefeedback/create",
            {
              reponses: [{
                nom: reponse,
                questionsfeedbacks_id: questionId
              }],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          requests.push(request);
        }
  
        // Attendre que toutes les promesses soient résolues
        const responsesArray = await Promise.all(requests);
  
        // Vérifier si toutes les réponses ont été ajoutées avec succès
        const isSuccess = responsesArray.every(response => response.status === 200);
        setLoading(false)
       
  
        if (isSuccess) {
          console.log("Toutes les réponses ont été ajoutées avec succès");
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Réponses envoyées avec succès!",
          });
          handleClosAdd();
        } else {
          console.error("Erreur lors de l'ajout de certaines réponses");
        }
         // Afficher les données retournées par chaque requête axios dans la console
      responsesArray.forEach(response => {
        console.log("Données retournées par la requête :", response.data);
      });
  
        // Réinitialiser les réponses après l'ajout
        setResponses([]);
        handleSubmission();
      }
    } catch (error) {
      console.error("Erreur Axios :", error);
      if (error.response.status === 410) {
        console.log("v");
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Vous avez déjà donné un feedback à cet événement!",
        }).then(() => {
          handleClosAdd(); 
        });
        return;
      }
      handleClosAdd();
    }
  };
  
  

  
  

  const handleResponseChange = (questionId, response) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: response
    }));
  };

  
  const fetchEvents = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/evenements/admin",
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


  const [eventQuestions, setEventQuestions] = useState([]);

  const handleButtonClick = async (evenement_id) => {
    await fetchEventQuestions(evenement_id);
    setShowAdd(true);
  };
  
  const fetchEventQuestions = async (evenement_id) => {
    console.log(evenement_id , 'evenenement_id')
    try {
      const token = localStorage.getItem("tokencle");
      const response = await axios.get(
        `http://localhost:8000/api/questions-feedbacks/${evenement_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventQuestions(response.data.questions); 
      setLoading(false)
      const varelement = response.data.questions
      console.log(varelement, 'tableau reponse data')
      console.log(eventQuestions, 'eventQuestions')
    } catch (error) {
      console.error("Erreur lors de la récupération des questions de l'événement:", error);
      setQuestions([]); // Réinitialiser les questions en cas d'erreur
    }
  };

  //  pour le champ recherche
const [searchValue, setSearchValue] = useState("");

// function la recherche
const handleSearchChange = (event) => {
  setSearchValue(event.target.value);
};
  const filteredEvents = events.filter(
    (eventEl) =>
      eventEl &&
      eventEl.titre &&
      eventEl.titre.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayEvents = searchValue === "" ? events : filteredEvents;
  
  
    const [currentPage, setCurrentPage] = useState(1);
  const  eventsParPage= 5;
  
  // pagination
  const indexOfLastEvent = currentPage* eventsParPage;
  const indexOfFirstEvent = indexOfLastEvent -  eventsParPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  
  const totalPaginationPages = Math.ceil(events.length /  eventsParPage);
  let questionCounter = 1;
  
  
  
  
  return (
    <div className='mt-4'>
      {loading ? (
        <LoadingBox />
         ) : (
    <div>
       <div className="d-flex justify-content-between mt-5">
        
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
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>Titre</th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>Date debut</th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>Date fin</th>
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
            {
              currentEvents && currentEvents.map((eventEl) => ( 
              <tr key={eventEl.id} >
                <td>{ eventEl && eventEl.titre}</td>
                    <td>{ eventEl && eventEl.date_debut}</td>
                    <td>{ eventEl && eventEl.date_fin}</td>
                <td className="d-flex justify-content-evenly">
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    // onClick={handleAction}
                    onClick={() => handleButtonClick(eventEl.id)}
                  >
                     Donner un feedback à un évenement
                    {/* <FontAwesomeIcon icon={faEye} /> */}
                  </Button>
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
      </div>

      <>
        <Modal
          show={showAdd}
          onHide={handleClosAdd}
          id="buttonAjouter"
        >
          <Modal.Header closeButton>
          <Modal.Title>Donner un feedback à un événement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  {eventQuestions.map((question) => ( // Utiliser eventQuestions au lieu de questions
                    <div key={question.id}>
                      <h6 className='mt-3'> {questionCounter++}-{question.nom} ?</h6>
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={responses[question.id] || ''}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                      />
                    </div>
                  ))}
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterReponseEvenement}
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
              onClick={handleClosAdd}
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
    </div>
    )}

    </div>
  );
}
