import { faEye, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Pagination from '../../../Components/User_Components/Pagination/Pagination';
import LoadingBox from '../../../Components/LoadingBox/LoadingBox';

export default function EvaluationReponse() {
  // la declation des par tableau ou bolean ou null
  const [evaluationData, setEvaluationData] = useState([]);
  const [evaluationDataQR, setEvaluationDataQR] = useState([]);
  const [evaluationDataR, setEvaluationDataR] = useState([]);
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedEvalQR, setSelectedEvalQR] = useState(null);
  const [selectedEvalR, setSelectedEvalR] = useState(null);
  

// la funtion pour recuperer la liste des reponse
const fetchEvaluationReponse = async () => {
  const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Participant") {
      const response = await axios.get('http://localhost:8000/api/liste/user/evaluer',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setEvaluationData(response.data.evaluatedUsers);
      setLoading(false)
      console.log(response, 'response liste ev user side')
      console.log(evaluationData, 'evaluation data')
    }
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
};

//  rappelle de la function sur le useEffect
useEffect(()=>{
  fetchEvaluationReponse ();
},[])


// la funtion pour recuperer la liste des question reponse
const fetchEvaluationQR = async (userId) => {
  const token = localStorage.getItem("tokencle");
  try {
    if (token) {
      const response = await axios.get(`http://localhost:8000/api/listes/particpants/evaluateur/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'response qr userid QR')
      if (response.data && response.data.evaluations && Array.isArray(response.data.evaluations)) {
        console.log("Données de l'API récupérées QR :", response.data.evaluatedUsers);
        // return response.data.evaluations;
        setEvaluationDataQR(response.data.evaluations)
        setLoading(false)
      } else {
        console.error("La réponse de l'API n'est pas un tableau ou est vide :", response.data.evaluations);
        return [];
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};
useEffect(()=>{
  if (selectedEvalQR) {
    fetchEvaluationQR(selectedEvalQR);
  }
}, [selectedEvalQR]);

// Funtion appeler pour ouvrir le modal
const handleShow = async (user) => {
  try {
       await fetchEvaluationQR(user.id);
      console.log(evaluationDataQR, 'evaluationDataQR')
      setShow(true);
    } catch (error) {
      console.error(error);
    }
};
// Funtion appeler pour fermer le modal
const handleCloseShow = () => {
  setShow(false);
  setEvaluationDataQR(null);
};

// la funtion pour recuperer la liste des reponse d'evaluation
const fetchEvaluationR = async () => {
  const token = localStorage.getItem("tokencle");
  try {
    if (token) {
      const response = await axios.get('http://localhost:8000/api/liste/evaluation/recu', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'response qr recus')
      if (response.data && response.data.evaluations && Array.isArray(response.data.evaluations)) {
        console.log("Données de l'API récupérées :", response.data.evaluations);
        console.log(response.data.evaluations, 'response.data.evaluations')
        // return response.data.evaluations;
        setEvaluationDataR(response.data.evaluations)
        setLoading(false)
        console.log(evaluationDataR, 'evaluationDataR fetch')
      } else {
        console.error("La réponse de l'API n'est pas un tableau ou est vide :", response.data.evaluatedUsers);
        return [];
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};

useEffect(()=>{
//   if (selectedEvalR) {
    fetchEvaluationR();
//   }
}, []);

// Funtion pour ouvrir un autre modal
const handleShowR = async (user) => {
  try {
      await fetchEvaluationR(user.id);
      // console.log(questionsAndAnswersR, 'questionsAndAnswersR')
      // setEvaluationDataR(questionsAndAnswersR);
      console.log(evaluationDataR, 'evaluationDataR')
      setShowR(true);
    } catch (error) {
      console.error(error);
    }
};
// Funtion appeler pour fermer un autre le modal
const handleCloseShowR = () => {
  setShowR(false);
  setEvaluationDataR(null);
};

// function la recherche dans un champ input
const [searchValueUser, setSearchValueUser] = useState("");
const handleSearchChange = (event) => {
  setSearchValueUser(event.target.value);
};

// faire le filtre des user par nom
const filteredUsers = evaluationData && evaluationData.filter(
  (user) =>
    user &&
    user.nom &&
    user.nom.toLowerCase().includes(searchValueUser.toLowerCase())
);
const displayUsers = searchValueUser === "" ? evaluationData : filteredUsers;


  const [currentPage1, setCurrentPage1] = useState(1);
const usersParPage= 7;

// Pour la pagination
const indexOfLastUser = currentPage1* usersParPage;
const indexOfFirstUser = indexOfLastUser - usersParPage;
const currentUsers = filteredUsers && filteredUsers.slice(
  indexOfFirstUser,
  indexOfLastUser
);

const totalPaginationPagesUser = Math.ceil(evaluationData && evaluationData.length / usersParPage);

// function pour recuperer le niveau et l'afficher insuffisant moyen bien et exelent selon l'intervale du  pourcentage
const comparePourcentages = (pourcentageA, pourcentageB) => {
  const nombreA = parseInt(pourcentageA, 10);
  const nombreB = parseInt(pourcentageB, 10);
  return nombreA - nombreB;
};


const getNiveauLabel = (niveau) => {
  if (niveau.includes('%')) {
    // Comparaison des pourcentages en tant que chaînes
    if (comparePourcentages(niveau, '0%') >= 0 && comparePourcentages(niveau, '49%') <= 0) {
      return 'Insuffisant';
    } else if (comparePourcentages(niveau, '50%') >= 0 && comparePourcentages(niveau, '59%') <= 0) {
      return 'Moyen';
    } else if (comparePourcentages(niveau, '60%') >= 0 && comparePourcentages(niveau, '79%') <= 0) {
      return 'Bien';
    } else if (comparePourcentages(niveau, '80%') >= 0 && comparePourcentages(niveau, '100%') <= 0) {
      return 'Excellent';
    } else {
      return 'Non évalué';
    }
  } else {
    // Si la chaîne ne contient pas le symbole de pourcentage (%), vous pouvez ajouter le traitement supplémentaire ici
    return 'Non évalué';
  }
};


const processEvaluation = (evaluation) => {
  return {
    ...evaluation,
    niveauLabel: getNiveauLabel(evaluation.niveau) 
  };
};

const processEvaluations = (evaluations) => {
  return evaluations.map(evaluation => {
    return {
      ...processEvaluation(evaluation), // Traitement de chaque évaluation
      questions_reponses: evaluation.questions_reponses.map(qr => {
        return {
          ...qr,
          reponses: qr.reponses.map(reponse => {
            return {
              ...reponse,
              niveauLabel: getNiveauLabel(reponse.niveau) // Ajoutez le label du niveau ici pour chaque réponse
            };
          })
        };
      })
    };
  });
};




  



 


// La vue de mon composant
  return (
    <div>
      {/****************************** condition pour le loading *****************************************/}
        {loading ? (
        <LoadingBox />
         ) : (
        <div>
          <div>
              <div className="d-flex justify-content-between mt-5 ms-4">
                <div>
                    <Button
                      style={{
                              backgroundColor: "#004573",color: "#ffff",}}
                              onClick={handleShowR}>
                              Evaluation reçue           
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
                          placeholder="Rechercher un évalué"
                          aria-label="user"
                          aria-describedby="addon-wrapping"
                          value={searchValueUser}
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
              <div className="content-left-admin-dashbord border ms-4 me-4">
                <h3 className="mb-2">Liste des Evalués</h3>
                <table className="table mb-5">
                  <thead className="table-light" id="hearder-color">
                    <tr>
                      
                      <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                        Prenom
                      </th>
                      <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                        Nom
                      </th>
                      <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                        Email
                      </th>
                      <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                        Action
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  { currentUsers &&
                    currentUsers.map((user) => ( 
                    <tr key={user && user.id} >
                      <td>{user &&  user.nom}</td>
                      <td>{user &&  user.prenom}</td>
                      <td>{user &&  user.email}</td>
                      <td>
                      <Button
                          style={{
                            backgroundColor: "#fff",
                            border: "1px solid #004573",
                            color: "#004573",
                          }}
                          onClick={() => handleShow(user)}
                        >
                            <FontAwesomeIcon icon={faEye} />
                          
                          
                        </Button>
                    
                      </td>
                      
                    </tr>
                    ))} 
                    
                  </tbody>
                </table>
                <Pagination
                currentPage={currentPage1}
                totalPaginationPages={totalPaginationPagesUser}
                setCurrentPage={setCurrentPage1}
                />  
              </div>
          </div>


          {/****************************** modl 1*****************************************/}
            <Modal show={show} onHide={handleCloseShow} id="buttonModifier" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Détails des évaluations données</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                {evaluationDataQR?.length > 0 && evaluationDataQR?.map((userData, index) => {
            
                  let questionCounter = 1;

                    return (
                      <div key={index} className=" ">
                        
                          <div className="card mb-3 p-3">
                              
                                  <div  className="mt-1 mb-4">
                                      <h5 className="card-text" style={{color:'#004573'}}>
                                          <strong>Évaluation:</strong> {userData?.evaluation.titre}
                                      </h5>

                                      {userData?.questions_reponses?.map((qr, qrIndex) => (
                                          <div key={qrIndex} className="mt-1 mb-4">
                                              <p className="card-text ">
                                                  <strong>{questionCounter++}-Question:</strong> {qr?.reponse?.questions_evaluation?.nom}
                                              </p>
                                              <p className="card-text">
                                                  <strong>Réponse:</strong> {qr?.reponse?.reponse}
                                              </p>
                                          </div>
                                          
                                      ))}
                                      {/* Additional information per evaluation if needed */}
                                      <p className="card-text mt-3"><strong>Commentaire:</strong> {userData?.commentaire}</p>
                                      {/* <p className="card-text"><strong>Niveau:</strong> {userData?.niveau}</p> */}
                                      <p className="card-text"><strong>Niveau:</strong> {getNiveauLabel(userData?.niveau)}</p>
                                      {/* <p className="card-text"><strong>Niveau:</strong> {userData?.niveau}</p> */}
                                  </div>
                              
                          </div>
                      </div>
                        );
                    })}
            </Modal.Body>
            </Modal>

            {/****************************** modl 2*****************************************/}
            <Modal show={showR} onHide={handleCloseShowR} id="buttonModifier" size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Détails des évaluations reçu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            {evaluationDataR?.length > 0 && evaluationDataR.map((userData, index) => {
        //  const { user, userData } = userData;
                let questionCounter = 1; // Initialize question counter inside the map function
            
                  return (
                    <div key={index} className=" ">
                      
                        <div className="card mb-3 p-3">
                            {/* User information */}
                            
                            {/* Loop through each evaluation */}
                            
                                <div  className="mt-1 mb-4">
                                    {/* Assuming each evaluation has a title, questions and responses */}
                                    <h5 className="card-text" style={{color:'#004573'}}>
                                        <strong>Évaluation:</strong> {userData?.evaluation.titre}
                                    </h5>
            
                                    {userData?.questions_reponses?.map((qr, qrIndex) => (
                                        <div key={qrIndex} className="mt-1 mb-4">
                                            <p className="card-text ">
                                                <strong>{questionCounter++}-Question:</strong> {qr?.reponse?.questions_evaluation?.nom}
                                            </p>
                                            <p className="card-text">
                                                <strong>Réponse:</strong> {qr?.reponse?.reponse}
                                            </p>
                                        </div>
                                    ))}
            
                                    {/* Additional information per evaluation if needed */}
                                    <p className="card-text mt-3"><strong>Commentaire:</strong> {userData?.commentaire}</p>
                                    <p className="card-text"><strong>Niveau:</strong> {getNiveauLabel(userData?.niveau)}</p>
                                    
                                </div>
                            
                        </div>
                    </div>
                      );
                  })}
    
            </Modal.Body>
            </Modal>

        </div>
        )}

    </div>
  )
}
