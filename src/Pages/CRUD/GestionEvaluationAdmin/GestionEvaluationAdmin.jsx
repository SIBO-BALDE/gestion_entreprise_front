import { faEye, faFolderOpen, faMagnifyingGlass, faPenToSquare, faPlus, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from '../../../Components/User_Components/Pagination/Pagination';

export default function GestionEvaluationAdmin() {
  const [showEvaluation, setShowEvaluation]=useState(false)
  
  const handleCloseEvaluation = () => setShowEvaluation(false);
  const handleShowEvaluation = () => setShowEvaluation(true);
  // const handleCloseEditMaisons = () => setShowEditModalMaisons(false);
  


  const [questions, setQuestions] = useState([{ index: 0, responseCount: 1 }]);
    const [questionIndex, setQuestionIndex] = useState(1);

 
// first
// const addQuestion = () => {
//   setQuestions(prevQuestions => {
//       const newQuestionIndex = prevQuestions.length;
//       return [
//           ...prevQuestions,
//           { 
//               index: newQuestionIndex, 
//               responseCount: 1,
//               nom: '',
//               categorie_id: '',
//               reponses: [] // Initialisation d'un tableau vide
//           }
//       ];
//   });
//   setSelectedCategories(prevSelectedCategories => ({
//       ...prevSelectedCategories,
//       [questionIndex]: [] // Initialisation d'un tableau vide
//   }));
// };

  // seconde avec ereur

  const addQuestion = () => {
    setQuestions(prevQuestions => {
        const newQuestionIndex = prevQuestions.length;
        return [
            ...prevQuestions,
            { 
                index: newQuestionIndex, 
                responseCount: 1,
                nom: '',
                categorie_id: '',
                reponses: [] // Initialisation d'un tableau vide
            }
        ];
    });
  
    // Initialisez selectedCategories pour cette nouvelle question
    setSelectedCategories(prevSelectedCategories => ({
        ...prevSelectedCategories,
        [questionIndex]: [] // Initialisez avec un tableau vide
    }));
  
    // Incrémentez également questionIndex pour la prochaine question
    setQuestionIndex(prevIndex => prevIndex + 1);
  }; 
  // trois
  // const addQuestion = () => {
  //   setQuestions(prevQuestions => {
  //       const newQuestionIndex = prevQuestions.length;
  //       return [
  //           ...prevQuestions,
  //           { 
  //               index: newQuestionIndex, 
  //               responseCount: 1,
  //               nom: '',
  //               categorie_id: '',
  //               reponses: [] // Initialisation d'un tableau vide
  //           }
  //       ];
  //   });
  
  //   // Initialisez selectedCategories pour cette nouvelle question
  //   setSelectedCategories(prevSelectedCategories => ({
  //       ...prevSelectedCategories,
  //       [questionIndex]: [] // Initialisez avec un tableau vide
  //   }));
  
  //   // Incrémentez également questionIndex pour la prochaine question
  //   setQuestionIndex(prevIndex => prevIndex + 1);
  // };
  
  
  
  
  

    const removeQuestion = indexToRemove => {
        setQuestions(prevQuestions => prevQuestions.filter(question => question.index !== indexToRemove));
    };

    const addResponse = questionIndex => {
        const updatedQuestions = questions.map(question => {
            if (question.index === questionIndex) {
                return { ...question, responseCount: question.responseCount + 1 };
            }
            return question;
        });
        setQuestions(updatedQuestions);
        console.log("Questions après l'ajout d'une réponse :", updatedQuestions);
    };

    
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
        `http://localhost:8000/api/archiver/evaluation/${evenement_id}`,
        {}, // Données vides car il semble que vous n'envoyez pas de données supplémentaires
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "l'évaluation a été archiver avec succès!",
            });
        
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

  
    
  const [evaluationData, setEvaluationData] = useState({
    titre: '',
    questions: [{ nom: '', categorie_id: '', reponses: [] }]
}); 



const ajouterEvaluation = async () => {
  const token = localStorage.getItem("tokencle");
  const role = localStorage.getItem("rolecle");
  if (token && role === 'Admin') {
      try {
          const requestData = {
              titre: evaluationData.titre,
              questions: questions.map(question => ({
                  nom: question.nom.trim(),
                  // Récupérez le premier élément du tableau pour obtenir l'ID de catégorie
                  categorie_id: selectedCategories[question.index][0], 
                  reponses: question.reponses ? question.reponses.map(reponse => reponse.trim()) : []
              }))
         
          };

          console.log("Données d'évaluation à envoyer :", requestData);
          

          // Envoyez les données au serveur
          const response = await axios.post(
              "http://localhost:8000/api/Questionsevaluation/create",
              requestData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          console.log("Réponse de la requête :", response);
          console.log("Réponse de la requête data :", response.data);
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Question évaluation ajouté avec succée!",
          });
          fetchEvaluations();
         
          handleCloseEvaluation();
      } catch (error) {
          console.error("Erreur lors de l'ajout de l'évaluation :", error);
      }
  }
};

  
     

     const [selectedCategories, setSelectedCategories] = useState([]);
  


const handleCategorySelect = (questionIndex, categoryId) => {
  console.log("selectedCategories avant la mise à jour :", selectedCategories);
  setSelectedCategories(prevSelectedCategories => {
      const updatedCategories = { ...prevSelectedCategories };
      if (!updatedCategories[questionIndex]) {
          updatedCategories[questionIndex] = [];
      }
      const isSelected = updatedCategories[questionIndex].includes(categoryId);
      if (isSelected) {
          updatedCategories[questionIndex] = updatedCategories[questionIndex].filter(id => id !== categoryId);
      } else {
          updatedCategories[questionIndex] = [...updatedCategories[questionIndex], categoryId];
      }
      console.log("Selected categories:", updatedCategories); // Affichez l'état mis à jour
      return updatedCategories;
  });
};


const [evaluations, setEvaluations] = useState([]);

const fetchEvaluations = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    // if (token) {
      const response = await axios.get(
        "http://localhost:8000/api/evaluations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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




 //  pour le champ recherche
 const [searchValue, setSearchValue] = useState("");

 // function la recherche
 const handleSearchChange = (nom) => {
   setSearchValue(nom.target.value);
 };
 
 // faire le filtre des maison par addrsse
 const filteredEvaluation = evaluations.filter(
   (evaluation) =>
     evaluation &&
     evaluation.titre &&
     evaluation.titre.toLowerCase().includes(searchValue.toLowerCase())
 );
 const displayEvaluation= searchValue === "" ? evaluations : filteredEvaluation;
 
 
   const [currentPage, setCurrentPage] = useState(1);
 const evaluationParPage= 6;
 
 // pagination
 const indexOfLastEvaluation = currentPage*  evaluationParPage;
 const indexOfFirstEvaluation = indexOfLastEvaluation -   evaluationParPage;
 const currentEvaluations = filteredEvaluation.slice(
   indexOfFirstEvaluation,
   indexOfLastEvaluation
 );
 
 const totalPaginationPages = Math.ceil(evaluations.length /   evaluationParPage);
  






  return (
    <div>
     <div className="container">
      <div className="d-flex justify-content-between mt-5">
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
                  placeholder="Rechercher une évaluation"
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
                Archiver
              </th>
            </tr>
          </thead>
          <tbody>
            
                {currentEvaluations &&  currentEvaluations.map((evaluation) => (
                   <tr key={evaluation.id} >
                   <td>{evaluation.titre} </td>
                   <td>{formatDate(evaluation.created_at)}</td>
                  
                   <td className=" d-flex justify-content-evenly">
                     <Button
                       variant="primary"
                       
                      //  onClick={() => archiverEvaluation(evaluation.id)}
                       
                       style={{
                         backgroundColor: "#fff",
                         border: "1px solid #004573",
                         color: "#004573",
                       }}
                       id="buttonModifier"
                     >
                       {/* <FontAwesomeIcon icon={faUserEdit} /> */}
                       <FontAwesomeIcon icon={faPenToSquare} />
                     </Button>
                     <Button
                       variant="primary"
                       
                       onClick={() => archiverEvaluation(evaluation.id)}
                       
                       style={{
                         backgroundColor: "#fff",
                         border: "1px solid #004573",
                         color: "#004573",
                       }}
                       id="buttonModifier"
                     >
                       <FontAwesomeIcon icon={faFolderOpen} />
                     </Button>
                     
                   </td>
                 </tr>
                )

                )
                 
                }
               
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* modal debut  ajouter evaluation*/}
      <>
      <Modal show={showEvaluation} onHide={handleCloseEvaluation} id="buttonAjouter">
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
                {questions.map((question, index) => (
                    <div className="question mt-2" key={index}>
                        <FormLabel>Question:</FormLabel>
                        <FormControl 
                            type="text" 
                            value={questions[index].nom} 
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].nom = e.target.value;
                                setQuestions(updatedQuestions);
                            }} 
                        />
                        <h6 className='m-3'>Choisissez la catégorie</h6>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center', gap: '20px' }} className='mb-3 mt-3'>
                            {categories.map(categorie => (
                                <div key={categorie.id} style={{ display: "flex", alignItems: "center" }}>
                                    <Form.Check
                                        type="checkbox"
                                        value={categorie.id}
                                        label={categorie.nom}
                                        onChange={() => handleCategorySelect(index, categorie.id)}
                                        checked={selectedCategories[index]?.includes(categorie.id)}
                                        disabled={selectedCategories[index]?.length > 0 && !selectedCategories[index]?.includes(categorie.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        <Button type="button" className="add-response me-2" onClick={() => addResponse(index)} style={{backgroundColor:'#004573', border:'none'}}><FontAwesomeIcon icon={faPlus} /> </Button><span>Ajouter une reponse</span>
                        <div className="responses mb-3">
                            {[...Array(question.responseCount)].map((_, responseIndex) => (
                                <FormControl 
                                    key={responseIndex} 
                                    type="text" 
                                    name={`reponse[${index}][]`} 
                                    placeholder={`Réponse ${responseIndex + 1}`} 
                                    value={question.reponses && question.reponses[responseIndex] ? question.reponses[responseIndex] : ''}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[index] = updatedQuestions[index] ? {...updatedQuestions[index]} : {};
                                        updatedQuestions[index].reponses = updatedQuestions[index]?.reponses ? [...updatedQuestions[index].reponses] : [];
                                        updatedQuestions[index].reponses[responseIndex] = e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
                                    className='mt-3'
                                />
                            ))}
                        </div>
                        <Button variant='danger' className="remove-question mb-3" onClick={() => removeQuestion(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
                ))}
            </div>
            <Button type="button" id="add-question" onClick={addQuestion} className='me-2' style={{backgroundColor:'#004573', border:'none'}}><FontAwesomeIcon icon={faPlus} /></Button><span>Ajouter une question</span>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button
            variant="secondary"
            onClick={ajouterEvaluation}
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
            onClick={handleCloseEvaluation}
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
    </div>
  )
}



  // const [show, setShow] = useState(false);
 


  
 




