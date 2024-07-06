// MultiStepForm.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const MultiStepForm = ({ handleClose }) => {
    const [users, setUsers] = useState([]);

const [evaluationData, setEvaluationData] = useState(null);

//  Lister les users
const fetchUsers = async () => {
 const role = localStorage.getItem("rolecle");
 const token = localStorage.getItem("tokencle");
 try {
   if (token && role === "Participant") {
     const response = await axios.get(
      
      `https://api.myfeedback360.com/api/participant/same-enterprise`,
      
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
    
     console.log(response ,'response user select');
     setUsers(response.data.users);
    //  setLoading(false)
     

     
   }
 } catch (error) {
   console.error("Erreur lors de la récupération des catégories:", error);
 }
};


useEffect(() => {
  // if (selectedCategoryId) {
    fetchUsers();
  
}, []);

const handleEvaluationClick = (id) => {
    setEvaluationSelectionneeId(id);
    // setShowAdd(true)
  };
const handleUserSelectChange = (e) => {
    const selectedUserId = e.target.value;
    setEvaluationData({ ...evaluationData, evaluer_id: selectedUserId });
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [evaluationSelectionneeId, setEvaluationSelectionneeId] = useState(null);
  const [selectedReponse, setSelectedReponse] = useState({});
  const [reponsesQuestion, setReponsesQuestion] = useState([]);
  let questionCounter = 1;
  const handleRadioChange = (questionId, reponseId) => {
    setSelectedReponse(prevSelectedReponse => ({ ...prevSelectedReponse, [questionId]: reponseId }));
  };
 
  //  Lister les categories
  const fetchCategories = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
   
    try {
      if (token || role === "Participant") {
        const response = await axios.get(
          'https://api.myfeedback360.com/api/categories/admin',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        console.log(response, 'response cat')
        setCategories(response.data.Categorie);
        // setLoading(false)

        console.log(categories);
        
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
 
  useEffect(() => {
    fetchCategories();
    
    }, []);


const fetchEvaluationDetail = async (evaluationId) => {
  try {
      const response = await axios.get(`https://api.myfeedback360.com/api/evaluation/${evaluationId}`);
      setEvaluationData(response.data);
      console.log(response, 'response du')
     
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
};
    const handleEvaluationClickDetail = async (evaluationId, event) => {
        setEvaluationSelectionneeId(evaluationId);
        //   setShowAdd(true);
          await fetchEvaluationDetail(evaluationId);
          console.log(evaluationId, "evaluationId clicked btn detail etap");
        
      };

    const fetchReponsesQuestion = async (CategorieId, evaluationId) => {
        console.log(CategorieId, 'categorieId');
        console.log(evaluationId, 'evaluationId');
        try {
          const token = localStorage.getItem("tokencle");
          const response = await axios.get(
            `https://api.myfeedback360.com/api/categories/questions-and-reponses/${CategorieId}/${evaluationId}`,
            {
             
            }
          );
          setReponsesQuestion(response.data);
        //   setLoading(false)
          console.log(response, 'reponse urgent')
        } catch (error) {
          console.error("Erreur lors de la récupération des questions et reponses de  l'évaluation:", error);
        }
      };


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

  const handleButtonClick = async (CategorieId, event) => {
    // alert('salut')
    event.preventDefault();
    console.log(evaluationSelectionneeId,'console.log(evaluationSelectionneeId)')
    setSelectedCategoryId(CategorieId);
    if (evaluationSelectionneeId !== null) {
        nextStep();
      await fetchReponsesQuestion(CategorieId, evaluationSelectionneeId);
      console.log(evaluationSelectionneeId)
     
    //   setShow(true);
    //   setShowAdd(false);
    } else {
      console.log("L'évaluation sélectionnée n'est pas définie.");
      setReponsesQuestion([]);
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <Form>
            
            <Form.Group controlId="selectUser" className='mb-3'>
            <Form.Select
          onChange={handleUserSelectChange}
        >
          <option value="">Sélectionner un utilisateur</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nom} {user.prenom}
            </option>
          ))}
            </Form.Select>
            </Form.Group>

            

            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          </Form>
        );

      case 2:
        return (
          <Form>
            <Form.Group controlId="email">
            
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

            

            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          </Form>
        );

      case 3:
        return (
          <Form>
            <Form.Group>
            {reponsesQuestion && reponsesQuestion.map((question) => (
              (evaluationSelectionneeId !== null && evaluationSelectionneeId === question.evaluation_id) && (
              <div key={question.id} style={{ marginBottom: '20px' }}>
                <Form.Group controlId={`question-${question.id}`}>
                  <Form.Label>{questionCounter++}-{question.nom} ?</Form.Label>
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

            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
};

export default MultiStepForm;
