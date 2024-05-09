import { faEye, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

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


 


   
  


 
  const [evaluations, setEvaluations]=useState([])
    
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
         
          handleCloseEvaluation();
      } catch (error) {
          console.error("Erreur lors de l'ajout de l'évaluation :", error);
      }
  }
};

  
  

  


     

     const [selectedCategories, setSelectedCategories] = useState([]);
  // Gérer la sélection de catégories
//   const handleCategorySelect = (questionIndex, categorieId) => {
//     setSelectedCategories(prevSelectedCategories => {
//         const updatedCategories = { ...prevSelectedCategories };
//         if (!updatedCategories[questionIndex]) {
//             updatedCategories[questionIndex] = [];
//         }
//         const isSelected = updatedCategories[questionIndex].includes(categorieId);
//         if (isSelected) {
//             updatedCategories[questionIndex] = updatedCategories[questionIndex].filter(id => id !== categorieId);
//         } else {
//             updatedCategories[questionIndex] = [...updatedCategories[questionIndex], categorieId];
//         }
//         return updatedCategories;
//     });
// };


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
                  // value={searchValue}
                  // onChange={handleSearchChange}
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
            {/* {currentMaisons &&
              currentMaisons.map((maison) => {  key={maison.id} {maison.image && (*/}
                {/* return ( */}
                  <tr >
                    

                    {/* {maison && <td>{maison.addresse || "N/A"}</td>} {maison.superficie}m2 {maison.prix} */}
                    
                    <td>360 degres</td>
                    <td>24/5/2022</td>
                   
                    {/* <td className=" d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        // onClick={handleShowEdit}
                        // onClick={() => handleShowEditMaisons(maison)}
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
                        // onClick={() => supprimerMaison(maison.id)}
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                      >
                        <Link
                          // to={`/detailmaisonadmin/${maison.id} || '' `}
                          style={{ color: "#004573" }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </Button>
                    </td> */}
                  </tr>
                {/* ); */}
              {/* })} */}
          </tbody>
        </table>
        {/* <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>

      {/* modal debut  ajouter participant*/}
      <>
        <Modal show={showEvaluation} onHide={handleCloseEvaluation} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter une évaluation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <FormLabel>Titre de l'évaluation:</FormLabel>
                <FormControl type="text"

                    value={evaluationData.titre} // Assurez-vous que la valeur est liée à l'état
                    onChange={(e) => setEvaluationData({ ...evaluationData, titre: e.target.value })} 
                  required />
                  </FormGroup>
                  
              {/* 
              {questions.map(question => (  
  <div key={question.id}>  */}
    <FormControl 
      type="hidden" 
      name="evaluation_id" 
      id="evaluation_id"
      // value={question.nom} // Accédez à la propriété nom de la question
      // onChange={(e) => setEvaluationData({ ...evaluationData, nom: e.target.value })} 
    />
  {/* </div>
))} */}

              <div id="questions-container">
                 {questions.map(question => (
                    <div className="question" key={question.index}>
                        <FormLabel>Question:</FormLabel>
                        <FormControl type="text" 
                        value={questions[question.index].nom} // Utilisez la valeur depuis l'état local
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[question.index].nom = e.target.value; // Mettez à jour le nom de la question dans l'état local
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
            onChange={() => handleCategorySelect(question.index, categorie.id)}
            checked={selectedCategories[question.index]?.includes(categorie.id)}
            disabled={selectedCategories[question.index]?.length > 0 && !selectedCategories[question.index]?.includes(categorie.id)}
        />
    </div>
))}

                          </div>
                        <Button type="button" className="add-response" onClick={() => addResponse(question.index)}>Ajouter une réponse</Button>
                        {/* <div className="responses">
                                          {[...Array(question.responseCount)].map((_, index) => (
                                              <FormControl key={index} type="text" name={`reponse[${question.index}][]`} placeholder={`Réponse ${index + 1}`} />
                                          ))}
                        </div> */}
                        <div className="responses">
    {[...Array(question.responseCount)].map((_, index) => (
        <FormControl 
            key={index} 
            type="text" 
            name={`reponse[${question.index}][]`} 
            placeholder={`Réponse ${index + 1}`} 
            // value={question.reponses[index] || ''} // Utilisez la valeur de la réponse depuis l'état local
            value={question.reponses && question.reponses[index] ? question.reponses[index] : ''}

            onChange={(e) => {
            // legui
                // const updatedQuestions = [...questions];
                // updatedQuestions[question.index].reponses[index] = e.target.value; // Mettez à jour la réponse dans l'état local
              //   if (updatedQuestions[question.index]) {
              //     updatedQuestions[question.index].reponses[index] = e.target.value;
              // }

              const updatedQuestions = [...questions]; // Copiez les questions existantes pour éviter la mutation directe de l'état

// Vérifiez si updatedQuestions[question.index] est défini avant de le modifier
updatedQuestions[question.index] = updatedQuestions[question.index] ? {...updatedQuestions[question.index]} : {}; 

// Mettez à jour la réponse si la question est définie, sinon créez un nouvel objet pour la question
updatedQuestions[question.index].reponses = updatedQuestions[question.index]?.reponses ? [...updatedQuestions[question.index].reponses] : [];
updatedQuestions[question.index].reponses[index] = e.target.value;

setQuestions(updatedQuestions);

            }}
        />
    ))}
                        </div>

                      

                        <Button  variant='danger' className="remove-question" onClick={() => removeQuestion(question.index)}><FontAwesomeIcon icon={faTrash} /> </Button>
                    </div>
                 ))}
              </div>
              <Button type="button" id="add-question" onClick={addQuestion}>Ajouter une question</Button>
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
      {/* modal fin ajouter maison */}

      {/* modal debut modifier maison */}
     
      {/* modal fin modifier maison */}
    </div>
    </div>
  )
}



  // const [show, setShow] = useState(false);
 


  
 




