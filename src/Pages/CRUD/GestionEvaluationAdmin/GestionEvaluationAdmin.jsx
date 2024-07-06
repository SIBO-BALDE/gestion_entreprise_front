import { faBoxesPacking, faEdit, faEye, faFolderOpen, faMagnifyingGlass, faPenToSquare, faPlus, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from '../../../Components/User_Components/Pagination/Pagination';
import LoadingBox from '../../../Components/LoadingBox/LoadingBox';

export default function GestionEvaluationAdmin() {
  const [loading, setLoading] = useState(true);
  const [showEvaluation, setShowEvaluation]=useState(false)
  
  const handleCloseEvaluation = () => setShowEvaluation(false);
  const handleShowEvaluation = () => setShowEvaluation(true);
  const [evaluations, setEvaluations] = useState([])
  const [searchValueBlok, setSearchValueBlok] = useState("");
  const [eventsBlok, setEventsBlok] = useState([]);
  //  pour le champ recherche
 const [searchValue, setSearchValue] = useState("");
  


  const [questions, setQuestions] = useState([{ index: 0, responseCountEdit: 1, nom: '', categorie_ids: [], reponses: [''], niveau: [0] }]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState({});
  // const [evaluationData, setEvaluationData] = useState({ titre: '', questions: [{ nom: '', categorie_id: '', reponses: [] }] });
  const [evaluationData, setEvaluationData] = useState({
        titre: '',
        questions: [{ nom: '', categorie_ids: [], reponses: [{ reponse: '', niveau: 0 }] }]
    });

  

  const addQuestion = () => {
    setQuestions(prevQuestions => {
      const newQuestionIndex = prevQuestions.length;
      return [
        ...prevQuestions,
        { index: newQuestionIndex, responseCountEdit: 1, nom: '', categorie_ids: [], reponses: [''], niveau: [0] }
      ];
    });
    setSelectedCategories(prevSelectedCategories => ({
      ...prevSelectedCategories,
      [questionIndex]: []
    }));
    setQuestionIndex(prevIndex => prevIndex + 1);
  };

  const removeQuestion = indexToRemove => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.index !== indexToRemove));
  };

  const addResponse = questionIndex => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => {
        if (question.index === questionIndex) {
          return {
            ...question,
            responseCountEdit: question.responseCountEdit + 1,
            reponses: [...question.reponses, ''],
            niveau: [...question.niveau, 0]
          };
        }
        return question;
      })
    );
  };


  const removeResponse = (questionIndex, responseIndex) => {
    setEvaluationData(prevData => {
      const updatedQuestions = prevData.questions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            reponses: question.reponses.filter((_, idx) => idx !== responseIndex)
          };
        }
        return question;
      });
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleResponseChange = (questionIndex, responseIndex, value) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => {
        if (question.index === questionIndex) {
          const updatedReponses = question.reponses.map((response, idx) =>
            idx === responseIndex ? value : response
          );
          return { ...question, reponses: updatedReponses };
        }
        return question;
      })
    );
  };

  const handleNumberChange = (questionIndex, numberIndex, value) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => {
        if (question.index === questionIndex) {
          const updatedNumbers = question.niveau.map((number, idx) =>
            idx === numberIndex ? value : number
          );
          return { ...question, niveau: updatedNumbers };
        }
        return question;
      })
    );
  };

  const handleCategorySelect = (questionIndex, categoryId) => {
    setSelectedCategories(prevSelectedCategories => {
      const selected = prevSelectedCategories[questionIndex] || [];
      if (selected.includes(categoryId)) {
        return {
          ...prevSelectedCategories,
          [questionIndex]: selected.filter(id => id !== categoryId)
        };
      } else {
        return {
          ...prevSelectedCategories,
          [questionIndex]: [...selected, categoryId]
        };
      }
    });
  };



  const ajouterEvaluation = async () => {
    const token = localStorage.getItem('tokencle');
    const role = localStorage.getItem('rolecle');
    
    if (token && role === 'Admin') {
      try {
        const isDataValid = evaluationData.titre && questions.every(question => question.nom && question.reponses.length > 0);
        
        if (!isDataValid) {
          throw new Error("Veuillez remplir tous les champs obligatoires.");
        }

        const requestData = {
          titre: evaluationData.titre,
          questions: questions.map((question, index) => ({
            nom: question.nom.trim(),
            categorie_ids: selectedCategories[index] || [],
            reponses: question.reponses.map((reponse, reponseIndex) => ({
              reponse: reponse.trim(),
              niveau: question.niveau[reponseIndex]
            }))
          }))
        };

        console.log('Données d\'évaluation à envoyer :', requestData);

        const response = await axios.post(
          'https://api.myfeedback360.com/api/Questionsevaluation/create',
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Réponse de la requête :', response);

        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Question évaluation ajoutée avec succès!',
        });

        setEvaluationData({ 
          titre: '',
          questions: [{ nom: '', categorie_ids: [], reponses: [{ reponse: '', niveau: 0 }] }]
        });
        setQuestions([{ index: 0, responseCountEdit: 1, nom: '', categorie_ids: [], reponses: [''], niveau: [0] }]);
        setSelectedCategories({});
        fetchEvaluations();
        handleCloseEvaluation();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'évaluation :', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.message || 'Une erreur est survenue lors de l\'ajout de l\'évaluation.',
        });
      }
    }
  };

  const fetchEventsBlok = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "https://api.myfeedback360.com/api/listes/evaluation/archives",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response , 'listes evaluation archives')
        setEventsBlok(response.data.evaluations);
        setLoading(false)
  
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

const archiverEvaluation = async (evenement_id) => {
  const token = localStorage.getItem("tokencle");
  const role = localStorage.getItem("rolecle");
  console.log("0 evenementId :", evenement_id);
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "De vouloir archiver l'évaluation?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#004573',
    cancelButtonColor: '#f00020',
    confirmButtonText: "Oui, j'accepte!",
  }).then(async (result) => {
    if (result.isConfirmed) {
  
  if (token && role === 'Admin') {
    console.log("one evenementId :", evenement_id);
    try {
      console.log("evenementId seconde :", evenement_id);
      // Envoie une requête PUT à l'endpoint pour archiver l'évaluation avec l'evenementId spécifié
      const response = await axios.put(
        `https://api.myfeedback360.com/api/archiver/evaluation/${evenement_id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "l'évaluation a été archiver avec succès!",
            });
            fetchEventsBlok()
            fetchEvaluations()

      console.log("Évaluation archivée avec succès :", response.data);
      console.log("Évaluation evenementId :", evenement_id);
      
      // Gérer la mise à jour de l'état de l'application ou de l'interface utilisateur si nécessaire
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'évaluation :", error);
    }
  }
}
});
};



    
  const [categories, setCategories] = useState([]);


    //  Lister les categories
  const fetchCategories = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "https://api.myfeedback360.com/api/categories",
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



const fetchEvaluations = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    // if (token) {
      const response = await axios.get(
        "https://api.myfeedback360.com/api/evaluations/question/reponse",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setEvaluations(response.data.evaluations);
      setLoading(false)
      console.log(response, 'resp evalution')
      

      console.log(response, 'response ev');
      console.log(evaluations, 'liste evaluation fetch');
   
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


 // function la recherche
 const handleSearchChange = (titre) => {
   setSearchValue(titre.target.value);
 };
 

   const filteredEvaluation = evaluations?.filter(
    (item) =>
      item.evaluation &&
      item.evaluation.titre &&
      item.evaluation.titre.toLowerCase().includes(searchValue.toLowerCase())
  );

  console.log(filteredEvaluation, 'filteredEvaluation');

  const displayEvaluation = searchValue === "" ? evaluations : filteredEvaluation;
  const [currentPage, setCurrentPage] = useState(1);

  const evaluationParPage = 5;
  const indexOfLastEvaluation = currentPage * evaluationParPage;
  const indexOfFirstEvaluation = indexOfLastEvaluation - evaluationParPage;
  const currentEvaluations = displayEvaluation.slice(
    indexOfFirstEvaluation,
    indexOfLastEvaluation
  );

  console.log(displayEvaluation, 'displayEvaluation');
  console.log(currentEvaluations, 'currentEvaluations');

  const totalPaginationPages = Math.ceil(evaluations?.length / evaluationParPage);
 
//  modification evaluation
 const [showEditEvaluation, setShowEditEvaluation] = useState(false);
const [currentEvaluation, setCurrentEvaluation] = useState(null);

const handleShowEditEvaluation = (evaluation) => {
  setCurrentEvaluation(evaluation);
  setShowEditEvaluation(true);
};
const handleCloseEditEvaluation = () => setShowEditEvaluation(false);
const handleCloseshowEditEvaluation = () => setShowEditEvaluation(false);


const handleSearchChangeBlok = (event) => {
  setSearchValueBlok(event.target.value);
};

// faire le filtre des maison par addrsse
const filteredEventsBlok = eventsBlok.filter(
  (evaluation) =>
    evaluation &&
    evaluation.titre &&
    evaluation.titre.toLowerCase().includes(searchValueBlok.toLowerCase())
);
const displayEventsBlok = searchValueBlok === "" ? eventsBlok : filteredEventsBlok;



  const [currentPage1, setCurrentPage1] = useState(1);
const  eventsBlokParPage= 5;

// pagination
const indexOfLastEventBlok = currentPage * eventsBlokParPage; 
const indexOfFirstEventBlok = indexOfLastEventBlok - eventsBlokParPage;
const currentEventsBlok = filteredEventsBlok.slice(
  indexOfFirstEventBlok,
  indexOfLastEventBlok
);

const totalPaginationPages1 = Math.ceil(
  eventsBlok.length / eventsBlokParPage
);

// evaluation block
const [showEventBlok, setShowEventBlok] = useState(false);
const handleCloseEventBlok = () => setShowEventBlok(false);
const handleShowEventBlok = () => setShowEventBlok(true);



// modification 

const [showEditModalEval, setShowEditModalEval] = useState(false);
 const [editEvaluationData, setEditEvaluationData] = useState({
  titre: '',
  questions: [{ nom: '', categorie_ids: [], reponses: [{ reponse: '', niveau: 0 }] }]
});

const closeEditModal = () => {
  setShowEditModalEval(false);
 
  setEvaluationData({ titre: '', questions: [{ nom: '', categorie_id: '', reponses: [] }] });
};

const handleShowEditEval = (evaluationData) => {
  const evaluation = evaluationData.evaluation;
  const questions = evaluationData.questions;

  const editEvaluationData = {
    id: evaluation.id,
    titre: evaluation.titre,
    questions: questions.map(question => ({
      nom: question.nom,
      categorie_ids: question.categorie.map(cat => cat.id),
      reponses: question.reponses.map(reponse => ({ reponse: reponse.reponse, niveau: reponse.niveau }))
    }))
  };

  setEditEvaluationData(editEvaluationData);
  setShowEditModalEval(true);
};

const addQuestionEdit = () => {
  setEditEvaluationData(prevData => ({
    ...prevData,
    questions: [...prevData.questions, { nom: '', categorie_ids: [], reponses: [{ reponse: '', niveau: 0 }] }]
  }));
};

const removeQuestionEdit = (questionIndex) => {
  setEditEvaluationData(prevData => ({
    ...prevData,
    questions: prevData.questions.filter((_, index) => index !== questionIndex)
  }));
};

const addResponseEdit = (questionIndex) => {
  setEditEvaluationData(prevData => {
    const updatedQuestions = prevData.questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          reponses: [...question.reponses, { reponse: '', niveau: 0 }]
        };
      }
      return question;
    });
    return { ...prevData, questions: updatedQuestions };
  });
};

const removeResponseEdit = (questionIndex, responseIndex) => {
  setEditEvaluationData(prevData => {
    const updatedQuestions = prevData.questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          reponses: question.reponses.filter((_, idx) => idx !== responseIndex)
        };
      }
      return question;
    });
    return { ...prevData, questions: updatedQuestions };
  });
};

const handleCategorySelectEdit = (questionIndex, categoryId) => {
  setEditEvaluationData(prevData => {
    const updatedQuestions = prevData.questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedCategorieIds = question.categorie_ids.includes(categoryId)
          ? question.categorie_ids.filter(id => id !== categoryId)
          : [...question.categorie_ids, categoryId];
        return {
          ...question,
          categorie_ids: updatedCategorieIds
        };
      }
      return question;
    });
    return { ...prevData, questions: updatedQuestions };
  });
};

const handleResponseChangeEdit = (questionIndex, responseIndex, value) => {
  setEditEvaluationData(prevData => {
    const updatedQuestions = prevData.questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedReponses = question.reponses.map((reponse, idx) => {
          if (idx === responseIndex) {
            return { ...reponse, reponse: value };
          }
          return reponse;
        });
        return {
          ...question,
          reponses: updatedReponses
        };
      }
      return question;
    });
    return { ...prevData, questions: updatedQuestions };
  });
};

const handleNumberChangeEdit = (questionIndex, responseIndex, value) => {
  setEditEvaluationData(prevData => {
    const updatedQuestions = prevData.questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedReponses = question.reponses.map((reponse, idx) => {
          if (idx === responseIndex) {
            return { ...reponse, niveau: value };
          }
          return reponse;
        });
        return {
          ...question,
          reponses: updatedReponses
        };
      }
      return question;
    });
    return { ...prevData, questions: updatedQuestions };
  });
};

const submitEditEvaluation = async () => {
  const token = localStorage.getItem('tokencle');
  const role = localStorage.getItem('rolecle');

  try {
    if (token && role === 'Admin') {
      // Filtrer les questions, réponses et catégories pour ne pas inclure les nouvelles (sans ID)
      const filteredData = {
        ...editEvaluationData,
        questions: editEvaluationData.questions.map(question => ({
          ...question,
          reponses: question.reponses.filter(reponse => reponse.reponse && reponse.niveau !== null)
        })).filter(question => question.nom && question.categorie_ids.length > 0)
      };

      const response = await axios.put(
        `https://api.myfeedback360.com/api/Questions/reponse/evaluation/update/${editEvaluationData.id}`,
        filteredData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response, 'response modif')
      if (response.data.status === 407) {
       
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Vous pouvez pas modifier cette evaluation car les partcipant ont demarer l'évaluation!",
        }).then(() => {
         
        });
        closeEditModal();
        return;
       
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'L\'évaluation a été modifiée avec succès!',
      });

      fetchEvaluations(); // Rafraîchir les évaluations après modification
      closeEditModal();
    } else {
      throw new Error('Accès refusé : rôle non autorisé ou token manquant');
    }
  } catch (error) {
    console.error('Erreur lors de la soumission des modifications:', error);
   
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la modification de l\'évaluation.',
    });
  }
};











  






  return (
    <div className='mt-4'>
      {loading ? (
        <LoadingBox />
         ) : (
     <div className="container">
      <div className="d-flex justify-content-between mt-5 content-input-global-projet">
        <div>
          <Button
            variant="primary"
            onClick={handleShowEvaluation}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter une évaluation
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
            Liste des évaluations archivés
          </Button>
        </div>
        <div className="flex-grow-1 d-flex justify-content-end  content-input-global-projet2 " id='content-input-global-projet2'>
          <div className="champsRecherche mt-2 mb-3 w-50">
            <Form>
              <div
                className="input-group flex-nowrap "
                style={{ borderColor: "#004573" }}
              >
                <Form.Control
                  type="search"
                  className="form-control w-50   "
                  placeholder="Rechercher une évaluation "
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
        <h3>Liste des evaluations</h3>
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
            {Object.keys(currentEvaluations).map((key) => (
              <tr key={key}>
                <td>{currentEvaluations[key].evaluation.titre}</td>
                <td>{formatDate(currentEvaluations[key].evaluation.created_at)}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditEval(currentEvaluations[key])}
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    id="buttonArchiver"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant=""
                    onClick={() => archiverEvaluation(currentEvaluations[key].evaluation.id)}
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    id="buttonArchiver"
                    className='ms-3'
                  >
                    <FontAwesomeIcon icon={faBoxesPacking} />
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

    
        {/************************ ajouter une évaluation debut ***************************/}
          <Modal show={showEvaluation} onHide={handleCloseEvaluation}>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter une évaluation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <FormLabel>Titre de l'évaluation:</FormLabel>
                  <FormControl
                    type="text"
                    value={evaluationData.titre}
                    onChange={(e) => setEvaluationData({ ...evaluationData, titre: e.target.value })}
                    required
                  />
                </FormGroup>

                <div id="questions-container">
                  {questions.map((question, questionIndex) => (
                    <div className="question mt-2" key={questionIndex}>
                      <FormLabel>Question:</FormLabel>
                      <FormControl
                        type="text"
                        value={question.nom}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[questionIndex].nom = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                      <h6 className='m-3'>Choisissez la catégorie</h6>
                      <div className='mb-3 mt-3'>
                        {categories.map(categorie => (
                          <div key={categorie.id} style={{ display: "flex", alignItems: "center" }}>
                            <Form.Check
                              type="checkbox"
                              value={categorie.id}
                              label={categorie.nom}
                              onChange={() => handleCategorySelect(questionIndex, categorie.id)}
                              checked={selectedCategories[questionIndex]?.includes(categorie.id)}
                            />
                          </div>
                        ))}
                      </div>
                      <Button type="button" className=" bg-white" onClick={() => removeQuestion(question.index)} style={{border:'1px solid red'}}>
                        <FontAwesomeIcon icon={faTrash}  color='red'/>
                      </Button>
                      
                      <div className='mt-3'>
                        <FormLabel>Réponses:</FormLabel>
                        {question.reponses.map((response, responseIndex) => (
                          <div key={responseIndex} style={{ display: "flex", alignItems: "center" }}>
                            <FormControl
                              type="text"
                              value={response}
                              onChange={(e) => handleResponseChange(question.index, responseIndex, e.target.value)}
                            />
                            <FormLabel className='ms-2'>Niveau:</FormLabel>
                            <FormControl
                              type="number"
                              value={question.niveau[responseIndex]}
                              onChange={(e) => handleNumberChange(question.index, responseIndex, parseInt(e.target.value))}
                            />
                          </div>
                        ))}
                        <Button type="button" className=" mt-2 bg-white" onClick={() => addResponse(question.index)}>
                          <FontAwesomeIcon icon={faPlus}  style={{color:'#004573'}} />
                        </Button><span className='ms-2' >Ajouter une réponse</span>
                        
                      </div>
                    </div>
                  ))}
                </div>
                <Button type="button" className=" mt-3 bg-white" onClick={addQuestion}>
                  <FontAwesomeIcon icon={faPlus} style={{color:'#004573'}}/> 
                </Button><span className='ms-2' >Ajouter une question</span>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="" onClick={ajouterEvaluation} style={{backgroundColor:'#004573',color:'white'}}>
                Ajouter
              </Button>
              <Button variant="" onClick={handleCloseEvaluation} style={{color:'#004573', border:'1px solid #004573',backgroundColor:'#fff' }}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        {/************************ ajouter une évaluation fin ***************************/}

        {/**************************** modifier evalution debut ****************************/}
        {/* <Modal show={showEditModalEval} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier l'évaluation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <FormLabel>Titre de l'évaluation:</FormLabel>
                <FormControl
                  type="text"
                  value={editEvaluationData?.titre}
                  onChange={(e) => setEditEvaluationData({ ...editEvaluationData, titre: e.target.value })}
                  required
                />
              </FormGroup>

              <div id="questions-container">
                {editEvaluationData.questions.map((question, questionIndex) => (
                  <div className="question mt-2" key={questionIndex}>
                    <FormLabel>Question:</FormLabel>
                    <FormControl
                      type="text"
                      value={question.nom}
                      onChange={(e) => {
                        const updatedQuestions = [...editEvaluationData.questions];
                        updatedQuestions[questionIndex].nom = e.target.value;
                        setEditEvaluationData({ ...editEvaluationData, questions: updatedQuestions });
                      }}
                    />
                    <h6 className='m-3'>Choisissez la catégorie</h6>
                    <div className='mb-3 mt-3'>
                      {categories.map(categorie => (
                        <div key={categorie.id} style={{ display: "flex", alignItems: "center" }}>
                          <Form.Check
                            type="checkbox"
                            value={categorie.id}
                            label={categorie.nom}
                            onChange={() => handleCategorySelectEdit(questionIndex, categorie.id)}
                            checked={question.categorie_ids.includes(categorie.id)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className=" mt-3 mb-3">
                    <FormLabel>Réponses:</FormLabel>
                      {question.reponses.map((reponse, responseIndex) => (
                        <div key={responseIndex} className="" >
                          <div style={{display: "flex", alignItems: "center"}}>
                          <FormControl
                            type="text"
                            placeholder={`Réponse ${responseIndex + 1}`}
                            value={reponse.reponse}
                            onChange={(e) => handleResponseChangeEdit(questionIndex, responseIndex, e.target.value)}
                            className='mb-3 me-2'
                          />
                          <Form.Label>Niveau: </Form.Label>
                          <FormControl
                            type="number"
                            value={reponse.niveau}
                            className='mb-3 '
                            onChange={(e) => handleNumberChangeEdit(questionIndex, responseIndex, e.target.value)}
                          />

                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", justifyContent:'space-between' }}>
                            <div>
                            <Button type="button" className="add-response me-2 mb-2" onClick={() => addResponseEdit(questionIndex)} style={{border:'1px solid #004573', backgroundColor:'white',color:'#004573'}}>
                            <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <span>Ajouter une réponse</span>
                            </div>
                            <div>
                              <Button variant="" className="remove-response ms-2" onClick={() => removeResponseEdit(questionIndex, responseIndex)} style={{border:'1px solid red',color:'red'}}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            </div>
                          </div>
                          </div>
                        
                      ))}
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent:'space-between' }}>
                      <div>
                      <Button type="button" id="add-question" onClick={addQuestionEdit} className='me-2' style={{border:'1px solid #004573',backgroundColor:'white',color:'#004573'}}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                      <span>Ajouter une question</span>
                      </div>
                      <div>
                        <Button variant='' className="remove-question mb-3" onClick={() => removeQuestionEdit(questionIndex)} style={{border:'1px solid red',color:'red'}}>
                        <FontAwesomeIcon icon={faTrash}  />
                        </Button>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => submitEditEvaluation(editEvaluationData)} style={{backgroundColor:'#004573',color:'white'}}>Modifier</Button>
            <Button variant="primary" onClick={closeEditModal} style={{color:'#004573', border:'1px solid #004573',backgroundColor:'#fff' }}>Annuler</Button>
          </Modal.Footer>
        </Modal> */}
        <Modal show={showEditModalEval} onHide={closeEditModal}>
  <Modal.Header closeButton>
    <Modal.Title>Modifier l'évaluation</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <FormGroup>
        <FormLabel>Titre de l'évaluation:</FormLabel>
        <FormControl
          type="text"
          value={editEvaluationData?.titre}
          onChange={(e) => setEditEvaluationData({ ...editEvaluationData, titre: e.target.value })}
          required
        />
      </FormGroup>

      <div id="questions-container">
        {editEvaluationData.questions.map((question, questionIndex) => (
          <div className="question mt-2" key={questionIndex}>
            <FormLabel>Question:</FormLabel>
            <FormControl
              type="text"
              value={question.nom}
              onChange={(e) => {
                const updatedQuestions = [...editEvaluationData.questions];
                updatedQuestions[questionIndex].nom = e.target.value;
                setEditEvaluationData({ ...editEvaluationData, questions: updatedQuestions });
              }}
            />
            <h6 className='m-3'>Choisissez la catégorie</h6>
            <div className='mb-3 mt-3'>
              {categories.map(categorie => (
                <div key={categorie.id} style={{ display: "flex", alignItems: "center" }}>
                  <Form.Check
                    type="checkbox"
                    value={categorie.id}
                    label={categorie.nom}
                    onChange={() => handleCategorySelectEdit(questionIndex, categorie.id)}
                    checked={question.categorie_ids.includes(categorie.id)}
                  />
                </div>
              ))}
            </div>
            
            <div className=" mt-3 mb-3">
              <FormLabel>Réponses:</FormLabel>
              {question.reponses.map((reponse, responseIndex) => (
                <div key={responseIndex} className="">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FormControl
                      type="text"
                      placeholder={`Réponse ${responseIndex + 1}`}
                      value={reponse.reponse}
                      onChange={(e) => handleResponseChangeEdit(questionIndex, responseIndex, e.target.value)}
                      className='mb-3 me-2'
                    />
                    <Form.Label>Niveau: </Form.Label>
                    <FormControl
                      type="number"
                      value={reponse.niveau}
                      className='mb-3'
                      onChange={(e) => handleNumberChangeEdit(questionIndex, responseIndex, e.target.value)}
                    />
                    <Button variant="" className="remove-response ms-2 mb-3" onClick={() => removeResponseEdit(questionIndex, responseIndex)} style={{ border: '1px solid red', color: 'red' }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" className="add-response me-2 mb-2" onClick={() => addResponseEdit(questionIndex)} style={{ border: '1px solid #004573', backgroundColor: 'white', color: '#004573' }}>
                <FontAwesomeIcon icon={faPlus} />
                
              </Button>
            </div>

            <Button variant='' className="remove-question mb-3" onClick={() => removeQuestionEdit(questionIndex)} style={{ border: '1px solid red', color: 'red' }}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" id="add-question" onClick={addQuestionEdit} className='me-2' style={{ border: '1px solid #004573', backgroundColor: 'white', color: '#004573' }}>
        <FontAwesomeIcon icon={faPlus} />
      </Button><span> Ajouter une question</span>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => submitEditEvaluation(editEvaluationData)} style={{ backgroundColor: '#004573', color: 'white' }}>Modifier</Button>
    <Button variant="primary" onClick={closeEditModal} style={{ color: '#004573', border: '1px solid #004573', backgroundColor: '#fff' }}>Annuler</Button>
  </Modal.Footer>
</Modal>


        {/**************************** modifier evalution fin*******************************/}

        {/************************ liste des  evalution archivé debut *********************/}
        <Modal show={showEventBlok} onHide={handleCloseEventBlok} id="buttonAjouter" size="lg">
            <Modal.Header closeButton>
            
              <Modal.Title>Liste des evaluations archives</Modal.Title>
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
                    placeholder="Rechercher un évaluation archivé"
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
            <div className="mt-4 ms-3  me-3">
          
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
              
                  {currentEventsBlok &&  currentEventsBlok.map((evaluation) => (
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
            currentPage={currentPage1}
            totalPaginationPages={totalPaginationPages1}
            setCurrentPage={setCurrentPage1}
          />
        </div>
          
        
          
            </Modal.Body>
            
        </Modal>
        {/************************ liste des  evalution archivé debut *********************/}

        
    </div>

    )}
    </div>
  )
}




 


  
 




