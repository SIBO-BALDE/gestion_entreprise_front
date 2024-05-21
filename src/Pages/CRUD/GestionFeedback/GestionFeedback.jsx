import { faEye, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import Pagination from '../../../Components/User_Components/Pagination/Pagination';

export default function GestionFeedback() {
 // ajout function modal
    const [showEvent, setShowEvent] = useState(false);
   
    const [showEvent2, setShowEvent2] = useState(false);

    const handleCloseFeeds = () => setShowEvent(false);
    const handleShowFeeds = () => setShowEvent(true);

    const handleCloseFeeds2 = () => setShowEvent2(false);
    const handleShowFeeds2 = () => setShowEvent2(true);


    // modification function modal
    const [showEventEdit, setShowEventEdit] = useState(false);
    const handleCloseFeedsEdit = () => setShowEventEdit(false);
    const handleShowFeedsEdit = () => setShowEventEdit(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   


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


  

//   ajouter question
const [questions, setQuestions] = useState([]);
const [questionData, setQuestionData] = useState({
  id: null,
  nom: "",
  evenement_id: "",
});


const ajouterQuestion = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem('tokencle')
    if(questionData.nom === "" || questionData.feddback_id ){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      return
    }
    
      try {
        if (token || role==="Admin"){
          const response = await axios.post(
            "http://localhost:8000/api/questionsfeedback/create",
            questionData,
            {
              headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.status === 200) {
            console.log(response ,'res question admin')
            setQuestions([...questions, response.data]);
            console.log(response.data, 'response question')
            setQuestionData({
              nom: "",
              evenement_id: "", 
            });
  
            Swal.fire({
              icon: "success",
              title: "Succès!",
              text: "question ajoutée avec succès!",
            });
  
            handleCloseFeeds2();
            fetchQuestions()
            // fetchFeedbacks()
  
           
          } else {
            console.error("Erreur dans l'ajout de la question");
          }
        }
        
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    
  
  };


  


  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


        //  Lister les qestion
        const fetchQuestions = async () => {
            const role = localStorage.getItem("rolecle");
            const token = localStorage.getItem("tokencle");
            try {
              if (token || role === "Admin") {
                const response = await axios.get(
                  "http://localhost:8000/api/Questionsfeedback/listes",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                setQuestions(response.data.Questionsfeedback);
                const kest = response.data.Questionsfeedback
                console.log(kest , 'kest');
        
                console.log(questions, 'liste question');
              }
            } catch (error) {
              console.error("Erreur lors de la récupération des question:", error);
            }
          };
        
          useEffect(() => {
            fetchQuestions();
          }, []);




    // Modifier question
    const [editQuestionData, setEditQuestionData] = useState({
      id: null,
      nom: "",
      evenement_id: "",
    });

    const modifierQuestion = async (id) => {
      const token = localStorage.getItem('tokencle');
      const role = localStorage.getItem('rolecle');
    
      if (editQuestionData.nom === "" || editQuestionData.evenement_id === "") {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "les champs sont  obligatoires!",
        });
        return;
      }
    
      try {
        if (token || role === "Admin") {
          const response = await axios.post(
            `http://localhost:8000/api/questionsfeedback/update/${editQuestionData.id}`,
            editQuestionData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 200) {
            const updatedQuestion = questions.map((quesk) =>
              quesk.id === editQuestionData.id ? response.data.questionsfeedback : quesk
            );
    
            setQuestions(updatedQuestion); 
    
            Swal.fire({
              icon: "success",
              title: "Succès!",
              text: "question mise à jour avec succès!",
            });
    
            handleCloseFeedsEdit();
          } else {
            console.error("Erreur lors de la modification de la user");
          }
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    };

      




  const handleShowEditQuestion = (quesk) => {
    if (quesk && quesk.evenement_id) {
      setEditQuestionData({
        id: quesk.id,
        nom: quesk.nom,
        evenement_id: quesk.evenement_id,
      });
      setShowEventEdit(true);
      console.log(quesk.id, "quesk id")
      console.log(editQuestionData.id, "editquestiondata id")
    } else {
      console.error("question non définie pour la question à modifier.");
      // Autres actions nécessaires en cas d'erreur...
    }
  };
  
 


         
          
    
          const [searchValue, setSearchValue] = useState("");

    // function la recherche
    const handleSearchChangeF = (nom) => {
      setSearchValue(nom.target.value);
    };

    // faire le filtre des maison par addrsse
    const filtered = questions && questions.filter(
      (quesstion) =>
        quesstion &&
        quesstion.created_at &&
        quesstion.created_at.toLowerCase().includes(searchValue.toLowerCase())
    );

    const display = searchValue === "" ? questions :  filtered; 

  const [currentPage, setCurrentPage] = useState(1);
  const questionParPage= 5;

  const indexOfLast = currentPage* questionParPage;
  const indexOfFirst = indexOfLast - questionParPage;
  const currentQuestion =filtered && filtered.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPaginationPages = Math.ceil( questions && questions.length / questionParPage);
   // Function pour supprimer une catégorie
   const supprimerQuestion = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir supprimer la question?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004573',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
      if (token || role === "Admin"){
        const response = await axios.delete(
          `http://localhost:8000/api/questionsfeedbacks/${id}/soft-delete`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        if (response.status === 200) {
          // Filtrez la liste des questions pour exclure celle qui vient d'être supprimée
          const updatedQuestion = questions.filter(
            (quest) => quest.id !== id
          );
  
          setQuestions(updatedQuestion);
                Swal.fire({
                    icon: "success",
                    title: "Succès!",
                    text: "question supprimer avec succès!",
                });
            
        } else {
          console.error("Erreur lors de la suppression de la question");
        }
      }
    } catch (error) {
      console.error(error, "Erreur lors de la suppression de la question axios");

    }
     }
    });
  };

  


  return (
    <div>
      
      <div className="mt-4 ms-3  me-3">
       
        <div className="d-flex justify-content-between ">
        
        <div>
          <Button
            variant="primary"
            onClick={handleShowFeeds2}
            className="ms-2"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
          Ajouter question feedback
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
                  placeholder="Rechercher une question"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  value={searchValue}
                  onChange={handleSearchChangeF}
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
         <h3>Liste des questions</h3>
        
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Question
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Evenement
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Date création
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Action
              </th>
              
              
            </tr>
          </thead>
          <tbody>
          {currentQuestion &&
              currentQuestion.map((quesk) => ( 
              <tr key={quesk && quesk.id} >
                <td>{quesk &&  quesk.nom}</td>
                <td>{quesk && quesk.evenement && quesk.evenement.titre}</td>
                <td>{formatDate(quesk &&  quesk.created_at)}</td>
              <td className=" d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        // onClick={handleShowEdit}
                        onClick={() => handleShowEditQuestion(quesk)}
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
                        onClick={() => supprimerQuestion(quesk.id)}
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
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



       
      {/* modal fin ajouter feedback */}
       {/* modal debut  ajouter question*/}
       <>
        <Modal show={showEvent2} onHide={handleCloseFeeds2} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter une question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    value={questionData.nom}
                    onChange={(e) => {
                      setQuestionData({
                        ...questionData,
                        nom: e.target.value,
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
                  <Form.Label>Evenements</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name='feddback_id'
                    value={questionData.evenement_id}
                    onChange={(e) => {
                      setQuestionData({
                        ...questionData,
                        evenement_id: e.target.value,
                      });
                    
                    }}
                  >
                    {/* recuperer la categorie selectionner par défaut pour la modifier */}
                    <option value="">Sélectionner un événement</option>
                  {events &&
                      events.map((resp, index) => {
                        return (
                          
                          <option key={index} value={resp.id}>
                            {resp.titre}
                          </option>
                         
                          
                        );
                      })}
                  </Form.Select>
                  
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterQuestion}
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
              onClick={handleCloseFeeds2}
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
      {/* modal fin ajouter question */}





      {/* modal debut modifier question */}
      <Modal
        show={showEventEdit}
        onHide={handleCloseFeedsEdit}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier la question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editQuestionData && editQuestionData.nom && (
            <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={editQuestionData.nom}
                    onChange={(e) => {
                      setEditQuestionData({
                        ...editQuestionData,
                        nom: e.target.value,
                      });
                     
                    }}
                  />
                  </Form.Group>
                  
                  <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Evenements</Form.Label>
                  <Form.Select
                      aria-label="Default select example"
                      value={editQuestionData.evenement_id}
                      onChange={(e) => {
                        setEditQuestionData({
                          ...editQuestionData,
                          evenement_id: e.target.value,
                        });
                      }}
                    >
                    <option>Choisir une feeback</option>
                    {events &&
                      events.map((feed, index) => {
                        return (
                          <option key={index} value={feed.id}>
                            {feed.titre}
                          </option>
                        );
                      })}
                  </Form.Select>
                  </Form.Group>
              
              
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={modifierQuestion}
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
            onClick={handleCloseFeedsEdit}
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
     
      {/* modal fin modifier question */}









    </div>
  )
}
