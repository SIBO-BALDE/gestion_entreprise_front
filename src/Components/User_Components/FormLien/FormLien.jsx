import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function FormLien() {
  const { token } = useParams();
  const [questions, setQuestions] = useState([]); 
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/repondre/${token}`);
        setQuestions(response.data.questions);
        console.log(response, 'resp');
      } catch (error) {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    };

    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const handleResponseChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedResponses = Object.entries(responses).map(([questionId, nom]) => ({
      questionsfeedbacks_id: questionId,
      nom,
    }));

    try {
      const response = await axios.post(
        `http://localhost:8000/api/repondre/evenement/${token}`,
        { reponses: formattedResponses }
      );
      console.log(response, 'responses submitted');
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Succès!",
          text: "Les réponses ont été envoyées avec succès!",
        });
        setResponses({});

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Une erreur s'est produite lors de l'envoi des réponses.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des réponses:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'envoi des réponses.",
      });
    }
  };

  return (
    <div>
      <h2>Questions de l'événement</h2>
      <Form onSubmit={handleSubmit}>
        {questions && questions.map((question, index) => (
          <div key={index}>
            <p>{question.nom}</p>
            <Form.Control
              type="text"
              value={responses[question.id] || ''}
              onChange={(e) => handleResponseChange(question.id, e.target.value)}
            />
          </div>
        ))}
        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  );
}
