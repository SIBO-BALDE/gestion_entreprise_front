import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from '../../../Components/User_Components/Pagination/Pagination';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LoadingBox from '../../../Components/LoadingBox/LoadingBox';

export default function FeedbackReponse() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleClosAdd = () => setShowAdd(false); 
  const handleshowAdd = () => setShowAdd(true);

  const fetchEvent = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token && role === "Participant") {
      const token = localStorage.getItem("tokencle");
      const response = await axios.get(
        'http://localhost:8000/api/user/events',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(response.data); 
      console.log(response, 'response feedback liste')
      setLoading(false)
    }
      
    } catch (error) {
      
    }
  };
  useEffect(()=>{
fetchEvent()
  }, [])


  const [eventQuestions, setEventQuestions] = useState([]);
  const [selectedEvalR, setSelectedEvalR] = useState(null);
  
  
  const fetchEventQuestions = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      // if (token && role === "Participant") {
      const response = await axios.get(
        `http://localhost:8000/api/user/evenements/question/reponse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventQuestions(response.data); 
      console.log(response, 'response feedback detail')
      setLoading(false)
    // }
      
    } catch (error) {
      
    }
  };
  useEffect(()=>{
    if (selectedEvalR) {
      fetchEventQuestions(selectedEvalR);
    }
  }, [selectedEvalR]);



  const handleButtonClick = async (id) => {
    await fetchEventQuestions(id);
    console.log(id,'id')
    setShowAdd(true);
  };

   //  pour le champ recherche
const [searchValue, setSearchValue] = useState("");

// function la recherche
const handleSearchChange = (event) => {
  setSearchValue(event.target.value);
};
  const filteredEvents = events.filter(
    (eventEl) =>
      eventEl &&
      eventEl.titre &&
      eventEl.titre.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayEvents = searchValue === "" ? events : filteredEvents;
  
  
    const [currentPage, setCurrentPage] = useState(1);
  const  eventsParPage= 3;
  
  // pagination
  const indexOfLastEvent = currentPage* eventsParPage;
  const indexOfFirstEvent = indexOfLastEvent -  eventsParPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  
  const totalPaginationPages = Math.ceil(events.length /  eventsParPage);
  
  let questionCounter = 1
  


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
                        placeholder="Rechercher un évenement commenté"
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
            {/*  */}
            <div className="mt-4 ms-3  me-3">
              <h3>Liste des évenements commentés</h3>
              <table className="table border  border-1">
                <thead
                  className=""
                  id="hearder-color"
                  style={{ backgroundColor: "#004573" }}
                >
                  <tr>
                    <th style={{ backgroundColor: "#004573", color: "#fff" }}>Titre</th>
                    <th style={{ backgroundColor: "#004573", color: "#fff" }}>Date debut</th>
                    <th style={{ backgroundColor: "#004573", color: "#fff" }}>Date fin</th>
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
                  {
                    currentEvents && currentEvents.map((eventEl) => ( 
                    <tr key={eventEl.id} >
                      <td>{ eventEl && eventEl.titre}</td>
                          <td>{ eventEl && eventEl.date_debut}</td>
                          <td>{ eventEl && eventEl.date_fin}</td>
                      <td className="d-flex justify-content-evenly">
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            border: "1px solid #004573",
                            color: "#004573",
                          }}
                          onClick={() => handleButtonClick(eventEl.id)}
                        >
                          
                          <FontAwesomeIcon icon={faEye} />
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



            <>
              <Modal
                show={showAdd}
                onHide={handleClosAdd}
                id="buttonAjouter"
              >
                <Modal.Header closeButton>
                <Modal.Title>Feedback donné pour cette évenement</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
              
              {eventQuestions?.length > 0 && eventQuestions.map((userData, index) => {
          //  const { user, userData } = userData;
                      ; // Initialize question counter inside the map function
                  
                      return (
                          <div key={index} className="card mb-3 p-3 ">
                            <p className='card-text'><strong>{userData.question}</strong> </p>
                            <p className='card-text'>{questionCounter++}-{userData.nom} </p>
                            {userData.reponse_feedbacks.map((resp, index) => {
                              return (
                            <div key={index}>
                              <p className='card-text'>{resp.nom} </p>

                            </div>
                             )
                           

                            })}
                          </div>
                      );
                  })}
      
              </Modal.Body>
          
              </Modal>
            </>
          </div>
        )}
           

    </div>
  )
}
