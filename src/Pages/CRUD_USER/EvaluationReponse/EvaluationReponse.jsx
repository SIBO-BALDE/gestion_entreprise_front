import { faEye, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Pagination from '../../../Components/User_Components/Pagination/Pagination';
import LoadingBox from '../../../Components/LoadingBox/LoadingBox';
// import './EvaluationReponse.css'
import './EvaluationReponse.css'

import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

import 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Swal from 'sweetalert2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EvaluationReponse() {
  // la declation des par tableau ou bolean ou null
  const [categories, setCategories] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);
  const [evaluationDataQR, setEvaluationDataQR] = useState([]);
  const [evaluationDataR, setEvaluationDataR] = useState([]);
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedEvalQR, setSelectedEvalQR] = useState(null);
  const [selectedEvalR, setSelectedEvalR] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  
  

// la funtion pour recuperer la liste des reponse
const fetchEvaluationReponse = async () => {
  const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Participant") {
      const response = await axios.get('https://api.myfeedback360.com/api/liste/user/evaluer',
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
      const response = await axios.get(`https://api.myfeedback360.com/api/listes/particpants/evaluateur/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'response  QR')
      if (response.data && response.data.evaluations && Array.isArray(response.data.evaluations)) {
        // console.log("Données de l'API récupérées QR :", response);
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



const fetchEvaluationR = async (categorie) => {
  const token = localStorage.getItem("tokencle");
  try {
    if (token) {
      const response = await axios.get(`https://api.myfeedback360.com/api/liste/question/reponses/evaluation/${categorie}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setEvaluationDataR(response.data.questions)
      console.log(response,'cc');
      console.log(categorie,'cat resp');
     
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    console.error('Détails de la réponse d\'erreur:', error.response); // Affichez les détails de l'erreur de réponse
    if (error.response && error.response.status === 406) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text:  "Vous na'vez pas reçu d'évaluation pour cette catégorie",
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la récupération des données.',
      });
    }

    throw error;
  }
  }



//Lister les  Categorie
const fetchCategory = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    const response = await axios.get(
      "https://api.myfeedback360.com/api/liste/categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Réponse complète ', response);
    setCategories(response.data.categories || []);
    setLoading(false);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
};

useEffect(() => {
  fetchCategory();
}, []);

const handleShowCat = async () => {
  
  setShowCat(true)
};
const handleCloseShowCat = () => {
  setShowCat(false);
  
};


const handleCategoryClick = async (categorie) => {
  try {
    await fetchEvaluationR(categorie.id); 
    setSelectedCategory(categorie.id); 
    console.log(categorie.id, 'okay')
    setShowR(true); 
    setShowCat(false); 
  } catch (error) {
    console.error('Erreur lors du traitement de la catégorie:', error);
    
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
      questions_reponses: evaluation?.questions_reponses.map(qr => {
        return {
          ...qr,
          reponses: qr.reponses.map(reponse => {
            return {
              ...reponse,
              niveauLabel: getNiveauLabel(reponse.niveau) 
            };
          })
        };
      })
    };
  });
};



// **********************************Chart diagramme******************************************//

const prepareChartData = (userData) => {
  const responseCounts = userData.reponses.map(r => r.count);
  const labels = userData.reponses.map(r => r.reponse);

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
let questionCounter2 = 1;







  



 


// La vue de mon composant
  return (
    <div className='mt-4'>
      {/****************************** condition pour le loading *****************************************/}
        {loading ? (
        <LoadingBox />
         ) : (
        <div>
          <div id='content-flex-reponse-evaluation'>
              <div className="d-flex justify-content-between mt-5 ms-4 content-input-global-projet">
                <div>
                    <Button
                    
                      style={{
                              backgroundColor: "#004573",color: "#ffff",}}
                              onClick={handleShowCat}>
                              Evaluation reçue           
                    </Button>
                </div>
                <div className="flex-grow-1 d-flex justify-content-end content-input-global-projet2 ">
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
              <div className="content-left-admin-dashbord border ms-4 me-4" id='content-left-admin-dashbord'>
                <h3 className="mb-2">Liste des Evalués</h3>
                <table className="table mb-5" id='content-left-admin-dashbord-table-responsive'>
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


          {/****************************** Evaluation donnée *****************************************/}
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
                                                  <strong>{questionCounter++}-</strong> {qr?.reponse?.questions_evaluation?.nom}
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

            {/***************************** lister les categories **************************/}
            <Modal show={showCat} onHide={handleCloseShowCat} id="buttonModifier" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Les participants qui t'ont évalué en tant que:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap:'15px' }}>
                {categories && categories.map((categorie) => ( 
                  <div key={categorie.id}>
                    <Button style={{backgroundColor:'#004573',border:'none'}}
                    onClick={() => handleCategoryClick(categorie)}
                    >
                      {categorie && categorie.nom}
                    </Button>
                  </div>
                ))}
              </div>
            </Modal.Body>
            </Modal>

            {/****************************** Evaluation reçu*****************************************/}
            <Modal show={showR} onHide={handleCloseShowR} id="buttonModifier" size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Détails des évaluations reçus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            
             {evaluationDataR?.length > 0 && evaluationDataR?.map((userData, index) => (
              
                <div key={index} className="mb-4">
              <h5 className="card-text" style={{ color: '#004573' }}>
               
              </h5>
                
                <div key={index} className="card mb-3 p-3">
                  <h5 className="card-text" style={{ color: '#004573' }}>
                    <strong>{questionCounter2++}-</strong> {userData.nom}
                    {/* userData?.questions_reponses[index].nom */}
                  </h5>
                  <div style={chartContainerStyle}>
                  <Pie data={prepareChartData(userData)} options={options} />
                  </div>
                  
                </div>
                <p>{userData.commentaire} </p>
                </div>
                  ))}
                  
    
            
            </Modal.Body>

            </Modal>

        </div>
        )}

    </div>
  )
}
