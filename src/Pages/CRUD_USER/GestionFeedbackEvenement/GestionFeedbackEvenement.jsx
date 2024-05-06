import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';

export default function GestionFeedbackEvenement() {

  const [showAdd, setShowAdd] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
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

  const [reponsesData, SetReponsesData] = useState({
    nom:'',
    questionsfeedbacks_id:''
  });

  const ajouterReponseEvenement = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
  
    try {
      if (token && role === "Participant") {
        // Créer un tableau pour stocker les réponses sous forme d'objets
        // const reponsesData = Object.entries(responses).map(([questionId, reponse, userId]) => ({
        //   nom: reponse,
        //   user_id	:userId,
        //   questionsfeedbacks_id: parseInt(questionId) 
          
        // }));
  
        // Vérifiez si toutes les réponses ont été saisies
        // if (reponsesData.length !== questions.length) {
        //   console.error("Toutes les réponses n'ont pas été saisies.");
        //   return;
        // }
  
        // Envoyez le tableau des réponses au backend
        const response = await axios.post(
          "http://localhost:8000/api/reponsefeedback/create",
          reponsesData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle réponse à la liste 
          console.log(response, 'response qu reponse au questions')
          // setResponses([...responses, ...response.data]);

          // Réinitialisez les valeurs du formulaire après avoir ajouté la réponse
          // setResponses({}); // Réinitialisez l'état des réponses après avoir ajouté avec succès
          // Swal.fire({
          //   icon: "success",
          //   title: "Succès!",
          //   text: "Réponses ajoutées avec succès!",
          // });
          // Fermez le modal
          // handleClosAdd();
        } else {
          console.error("Erreur dans l'ajout de la réponse");
        }
      }
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
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


  const [eventQuestions, setEventQuestions] = useState([]);

  const handleButtonClick = async (evenement_id) => {
    await fetchEventQuestions(evenement_id);
    setShowAdd(true);
  };
  
  const fetchEventQuestions = async (evenement_id) => {
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
      const varelement = response.data.questions
      console.log(varelement, 'tableau reponse data')
      console.log(eventQuestions, 'eventQuestions')
    } catch (error) {
      console.error("Erreur lors de la récupération des questions de l'événement:", error);
      setQuestions([]); // Réinitialiser les questions en cas d'erreur
    }
  };
  
  
  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <div>
          {/* <Button
            variant="primary"
            onClick={handleshowAdd}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
           Donner un feedback à un évenement
          </Button> */}
        </div>
        <div className="flex-grow-1 d-flex justify-content-end ">
          <div className="champsRecherche mt-2 mb-3 w-50">
            <Form>
              <div
                className="input-group flex-nowrap "
                style={{ borderColor: "#004573" }}
              >
                

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
            {events &&
              events.map((eventEl) => ( 
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
                  <h6 className='mt-3'>{question.nom} ?</h6>
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
  );
}
