import { faArrowCircleLeft, faArrowCircleRight, faEye, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Pagination from '../../../Components/User_Components/Pagination/Pagination';
import './GestionFeedbackEvaluation.css';
import Swal from 'sweetalert2';
import LoadingBox from '../../../Components/LoadingBox/LoadingBox';
import MultiStepForm from './MultiForm';
import CheckoutSteps from '../CheckoutSteps';

export default function GestionFeedbackEvaluation() {
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [show, setShow] = useState(false);

  const handleClosAdd = () => setShowAdd(false); 
  const [commentaire, setCommentaire] = useState(''); 
  const [evaluationSelectionneeId, setEvaluationSelectionneeId] = useState(null);


  const handleEvaluationClick = (id) => {
    setEvaluationSelectionneeId(id);
    setShowAdd(true)
  };

  const handleClose = () => setShow(false); 
  const [selectedReponse, setSelectedReponse] = useState({});

 
  const handleRadioChange = (questionId, reponseId) => {
    setSelectedReponse(prevSelectedReponse => ({ ...prevSelectedReponse, [questionId]: reponseId }));
  };
  

 


  // Funtion pour evaluer un participant
  const ajouterEvaluation = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
    
    if (token && role === 'Participant') {
      const idsDesReponses = Object.values(selectedReponse).map(reponse => parseInt(reponse, 10));
  
      // Création du tableau d'objets pour les réponses
      const evaluation = idsDesReponses.map(reponse_id => ({ reponse_id }));
      // Création de l'objet evaluationData
      const evaluationData = {
        evaluation: evaluation,
        categorie_id: selectedCategoryId,
        evaluer_id: selectedUserId,
        commentaire: commentaire, 
       
       
      };
      console.log(evaluation, '(evaluation)')
      console.log(selectedCategoryId, 'selectedCategoryId')
      console.log(commentaire, 'commentaire')
      console.log(selectedUserId, 'selectedUserId')
      
    
      try {
        if ( evaluationData.commentaire==='') {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Vueillez remplir tout les champs!",
          });
          return
        }
        const response = await axios.post(
          'http://localhost:8000/api/evaluation/create',
          evaluationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
            
          }
        );
        
        Swal.fire({
          icon: "success",
          title: "Succès!",
          text: "evaluation  envoye avec sucee avec succée!",
        });
        console.log("Réponse du serveur :", response.data);
        // Réinitialiser les réponses sélectionnées après l'ajout
        setSelectedReponse({});
        
        setCommentaire('');
        // Fermer le modal après l'ajout
        setShowAdd(false);
      } catch (error) {
        if (error.response.status === 409) {
       
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Vous avez déjà évalué ce participant!",
        }).then(() => {
          handleClosAdd(); 
        });
        return;
      }
      handleClosAdd();
        
        console.error('Erreur lors de l\'ajout de l\'évaluation:', error);
        console.log('Erreur :', error);
        
      }
    } else {
      console.error('Token ou rôle non disponibles');
    }
  };


  const [evaluations, setEvaluations] = useState([]);

  const fetchEvaluations = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token && role === "Participant") {
        const response = await axios.get(
          "http://localhost:8000/api/evaluations/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        setEvaluations(response.data.valuation);
        setLoading(false)
  
        console.log(evaluations, 'liste evaluations fetch');
      }
     
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
 
 // faire le filtre des evaluation par titre
 const filteredEvaluation = evaluations.filter(
   (evaluation) =>
     evaluation &&
     evaluation.titre &&
     evaluation.titre.toLowerCase().includes(searchValue.toLowerCase())
 );
 const displayEvaluation= searchValue === "" ? evaluations : filteredEvaluation;
 
 
   const [currentPage, setCurrentPage] = useState(1);
 const evaluationParPage= 5;
 
 // pagination
 const indexOfLastEvaluation = currentPage*  evaluationParPage;
 const indexOfFirstEvaluation = indexOfLastEvaluation -   evaluationParPage;
 const currentEvaluations = filteredEvaluation.slice(
   indexOfFirstEvaluation,
   indexOfLastEvaluation
 );
 
 const totalPaginationPages = Math.ceil(evaluations.length /   evaluationParPage);



 const [categories, setCategories] = useState([]);
 
  //  Lister les categories
  const fetchCategories = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
   
    try {
      if (token || role === "Participant") {
        const response = await axios.get(
          'http://localhost:8000/api/categories/admin',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        console.log(response, 'response cat')
        setCategories(response.data.Categorie);
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
 

  
  // tableau ou stocker la liste des users
const [users, setUsers] = useState([]);
const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//  Lister les users
const fetchUsers = async () => {
 const role = localStorage.getItem("rolecle");
 const token = localStorage.getItem("tokencle");
 try {
   if (token && role === "Participant") {
     const response = await axios.get(
      
      `http://localhost:8000/api/participant/same-enterprise`,
      
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
    
     console.log(response ,'response user select');
     setUsers(response.data.users);
     setLoading(false)
     

     
   }
 } catch (error) {
   console.error("Erreur lors de la récupération des catégories:", error);
 }
};


useEffect(() => {
  // if (selectedCategoryId) {
    fetchUsers();
  
}, []);



  
  const [selectedUserId, setSelectedUserId] = useState("")
  const handleUserSelectChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    setEvaluationData((prevData) => ({ ...prevData, evaluer_id: userId }));
  };


const [evaluationData, setEvaluationData] = useState(null);

const fetchEvaluationDetail = async (evaluationId) => {
  try {
      const response = await axios.get(`http://localhost:8000/api/evaluation/${evaluationId}`);
      setEvaluationData(response.data);
      console.log(response, 'response du')
     
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
};

const handleEvaluationClickDetail = async (evaluationId, event) => {
  setEvaluationSelectionneeId(evaluationId);
    setShowAdd(true);
    await fetchEvaluationDetail(evaluationId);
    console.log(evaluationId, "evaluationId clicked btn detail");
  
};


  const [reponsesQuestion, setReponsesQuestion] = useState([]);

  const fetchReponsesQuestion = async (CategorieId, evaluationId) => {
  console.log(CategorieId, 'categorieId');
  console.log(evaluationId, 'evaluationId');
  try {
    const token = localStorage.getItem("tokencle");
    const response = await axios.get(
      `http://localhost:8000/api/categories/questions-and-reponses/${CategorieId}/${evaluationId}`,
      {
       
      }
    );
    setReponsesQuestion(response.data);
    setLoading(false)
    console.log(response, 'reponse urgent')
  } catch (error) {
    console.error("Erreur lors de la récupération des questions et reponses de  l'évaluation:", error);
  }
};



let questionCounter = 1;


const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
        evaluation: '',
        categorie_id:'',
        evaluer_id: '',
        commentaire: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    handleClose(); // Close modal after form submission
    // Reset form data after submission if needed
    // setFormData({
        // evaluation: '',
        // categorie_id:'',
        // evaluer_id: '',
        // commentaire: '', 
    // });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

 

  const renderForm = () => {

    switch (step) {
      case 1:
        return (
          <Form style={{padding:'30px 0px'}}>
            <CheckoutSteps currentStep={step} />
            <Form.Group controlId="selectUser" className=''>
              {/* <h3>Qui voulez vous évalué ?</h3> */}
              {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
              
              <Form.Select value={selectedUserId} onChange={handleUserSelectChange} 
                style={{marginTop:'20px',marginBottom:'20px', borderBottom:'1px solid black',backgroundColor:'white'}}>
                <option value="">Sélectionner un utilisateur</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.nom} {user.prenom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <Button variant="primary" onClick={nextStep} style={{borderRadius:'50%',width:'40px', height:'40px', backgroundColor:'#ffb703', border:'none'}}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
            </Button>
            </div>

            
 
          </Form>
        );

      case 2:
        return (
          <Form>
            <Form.Group controlId="email">
            <h5>Votre lien hiérachique?</h5>
            {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
            <CheckoutSteps currentStep={step} />
               <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                  {categories.map((category) => (
                    <div key={category.id} className="ms-4 mt-4">
                      <button
                        className="btn btn btn-content-ev"
                        style={{ marginRight: "10px", border:'1px solid #004573', color:'#004573' }}
                        onClick={(event) => handleButtonClick(category.id, event)}

                      >
                        {category.nom}
                      </button>
                    </div>
                  ))}
                </div>
            </Form.Group>
            <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <Button variant="" onClick={prevStep} style={{borderRadius:'50%',width:'40px', height:'40px', backgroundColor:'#ffb703', border:'none'}}>
            <FontAwesomeIcon icon={faArrowCircleLeft} style={{color:'white'}} />
            </Button>
            <Button variant="" onClick={nextStep} style={{borderRadius:'50%',width:'40px', height:'40px', backgroundColor:'#ffb703', border:'none', marginLeft:'15px'}}>
             <FontAwesomeIcon icon={faArrowCircleRight} style={{color:'white'}} />
            </Button>

            </div>

            

          </Form>
        );

      case 3:
        return (
          <Form>
            {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
            <CheckoutSteps currentStep={step} />
            <Form.Group>
            {reponsesQuestion && reponsesQuestion.map((question) => (
              (evaluationSelectionneeId !== null && evaluationSelectionneeId === question.evaluation_id) && (
              <div key={question.id} style={{ marginBottom: '20px' }}>
                <Form.Group controlId={`question-${question.id}`}>
                  <Form.Label><strong>{questionCounter++}-</strong>{question.nom} ?</Form.Label>
                  {question?.reponses_evaluation?.map((reponse) => (
                    <Form.Check
                      key={reponse.id}
                      type="radio"
                      id={`radio-${question.id}-${reponse.id}`}
                      label={reponse.reponse}
                      value={reponse.id}
                      checked={selectedReponse[question.id] === reponse.id}
                      onChange={() => handleRadioChange(question.id, reponse.id)}
                    />
                  ))}
                </Form.Group>
                
              </div>
              )
            ))}
            </Form.Group>
            <Form.Group controlId="commentaire">
                <Form.Label className='mt-3'>Commentaire :</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={commentaire} 
                  onChange={(e) => setCommentaire(e.target.value)} 
                />
              </Form.Group>
              <div style={{display:'flex',justifyContent:'center',gap:'20px',marginTop:'20px'}}>
                <Button variant="" onClick={prevStep} style={{borderRadius:'50%',width:'40px', height:'40px', backgroundColor:'#ffb703', border:'none'}}>
              <FontAwesomeIcon icon={faArrowCircleLeft} style={{color:'white'}} />
                </Button>
                <Button variant="" type="submit" onClick={ajouterEvaluation} style={{border:'1px solid #FFB703'}}>
                  Evaluer
                </Button>
              </div>
            
          </Form>
        );

      // case 4:
      //     return (
      //       <Form>
      //          <h5>Les informations que vous avez saisi </h5>
      //         {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
      //         <CheckoutSteps currentStep={step} />
      //         <Form>
      //           {/* <h6>{selectedUserId}</h6>
      //           <h6>{}</h6>
      //           <h6>{selectedUserId}</h6> */}
      //         </Form>
      //         <div style={{display:'flex',justifyContent:'center',gap:'20px',marginTop:'20px'}}>
      //         <Button variant="" onClick={prevStep} style={{border:'1px solid #FFB703'}} >
      //         Annuler
      //         </Button>
      //         <Button variant="" type="submit" onClick={ajouterEvaluation} style={{border:'1px solid #FFB703'}}>
      //           Confirmer
      //         </Button>
      //         </div>
      //       </Form>
      //     );
  
      default:
        return null;
    }
  };

  const handleButtonClick = async (CategorieId, event) => {
    event.preventDefault();
    setSelectedCategoryId(CategorieId);
    if (evaluationSelectionneeId !== null) {
      nextStep();
      await fetchReponsesQuestion(CategorieId, evaluationSelectionneeId);
      // setShow(true);
      // setShowAdd(false);
    } else {
      console.log("L'évaluation sélectionnée n'est pas définie.");
      setReponsesQuestion([]);
    }
  };





 


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
                    placeholder="Rechercher un évaluation "
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
          <h3>Liste des évaluations </h3>
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
              
                  {currentEvaluations &&  currentEvaluations.map((evaluation) => (
                    <tr key={evaluation.id} >
                    <td>{evaluation.titre} </td>
                    <td>{formatDate(evaluation.created_at)}</td>
                    
                    <td className=" d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        
                        onClick={(event) => handleEvaluationClickDetail(evaluation.id , event)}
                        
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                        id="buttonModifier"
                      >
                        Evaluer un participant
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
          
            <div>
            
            </div>

        </div>


        <>
          <Modal
            show={showAdd}
            onHide={handleClosAdd}
            id="buttonAjouter"
            size='lg'
          >
            <Modal.Body>
            <Form >
              {renderForm()}
            </Form>

            </Modal.Body>
            
          </Modal>
        </>


        {/* modal debut  ajouter event*/}
        
       
      </div>
      )}
    </div>
    
  )
}
