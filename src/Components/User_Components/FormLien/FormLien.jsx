import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './FormLien.css'; // Assurez-vous d'importer le fichier CSS

export default function FormLien() {
  const { token } = useParams();
  const [questions, setQuestions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedResponses, setSelectedResponses] = useState({});
  const [email, setEmail] = useState('');
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/repondre/${token}`);
        setQuestions(response.data.questions);
        setEvents(response.data.evenement);
        console.log(response, 'resp');
      } catch (error) {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    };

    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const handleResponseChange = (questionId, reponseId) => {
    setSelectedResponses((prevSelectedResponses) => ({
      ...prevSelectedResponses,
      [questionId]: reponseId,
    }));
  };

  const handleUserResponseChange = (questionId, value) => {
    setUserResponses((prevUserResponses) => ({
      ...prevUserResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Veuillez entrer une adresse email valide.",
            });
            return;
        }

        const allQuestionsAnswered = questions.every(
            (question) => selectedResponses[question.id] !== undefined || userResponses[question.id] !== undefined
        );
        if (!allQuestionsAnswered) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Veuillez répondre à toutes les questions.",
            });
            return;
        }

        const reponsefeedbacks = questions.map((question) => {
            if (selectedResponses[question.id] !== undefined) {
                return {
                    reponsefeedback_id: selectedResponses[question.id],
                    questionsfeedbacks_id: question.id,
                };
            } else if (userResponses[question.id] !== undefined) {
                return {
                    questionsfeedbacks_id: question.id,
                    repondre: userResponses[question.id],
                };
            }
            return null;
        }).filter(response => response !== null);

        const response = await axios.post(
            'http://localhost:8000/api/repondre/evenement',
            { email, reponsefeedbacks }
        );

        console.log(response, 'responses submitted');
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "Les réponses ont été envoyées avec succès!",
            });
            setSelectedResponses({});
            setEmail('');
            setUserResponses({});
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Une erreur s'est produite lors de l'envoi des réponses.",
            });
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi des réponses:", error);
        if (error.response?.data?.status === 431) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Vous avez déjà répondu à ce formulaire",
            });
            setSelectedResponses({});
            setEmail('');
            setUserResponses({});
            return;
        }
        if (error.response?.data?.status === 432) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Le délai de soumission de ce formulaire est passé",
            });
            setSelectedResponses({});
            setEmail('');
            return;
        }
    }
};

  let questionCounter2 = 1;

  return (
    <div className='body-background'>
      <div className="form-container">
        <h2 className="form-title">Formulaire de questionnaire sur un évenement</h2>
        <Form onSubmit={handleSubmit}>
          <div className="question-container" style={{ borderTop: '10px solid #004573' }}>
            <p className="question-text">{events.titre}</p>
          </div>
          <Form.Group controlId="formBasicEmail" className='mb-2'>
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {questions && questions.map((question, index) => (
            <div key={index} className="question-container">
              <p className="question-text"><strong>{questionCounter2++}-</strong>{question.nom}?</p>
              {question.reponses.length > 0 ? (
                question.reponses.map((reponse, reponseIndex) => (
                  <Form.Check
                    key={reponseIndex}
                    type="radio"
                    name={`question-${question.id}`}
                    id={`reponse-${reponse.id}`}
                    label={reponse.nom}
                    checked={selectedResponses[question.id] === reponse.id}
                    onChange={() => handleResponseChange(question.id, reponse.id)}
                    className="response-checkbox"
                  />
                ))
              ) : (
                <Form.Group controlId={`userResponse-${question.id}`}>
                  <Form.Control
                    type="text"
                    placeholder="Saisissez votre réponse"
                    value={userResponses[question.id] || ''}
                    onChange={(e) => handleUserResponseChange(question.id, e.target.value)}
                  />
                </Form.Group>
              )}
            </div>
          ))}

          <Button type="submit" className="submit-button">Envoyer</Button>
        </Form>
      </div>
    </div>
  );
}
