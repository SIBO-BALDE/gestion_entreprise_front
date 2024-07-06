import { faBellConcierge, faBuilding, faCalendar, faFeed, faQuestion, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import "./Tableaux.css";
import axios from 'axios';

export default function Tableaux() {

  // tableau ou stocker la liste des users
  const [users, setUsers] = useState([]);
  const [entreprises, setEntreprises] = useState([]);

  const fetchUsers = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "https://api.myfeedback360.com/api/users_participants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.participants);
        const tabuser =response.data.participants
        console.log(tabuser, 'tabuser')

        console.log(users ,'ici users du users');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

    //  Lister les entreprises
    const fetchEntreprises = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "Admin") {
          const response = await axios.get(
            "https://api.myfeedback360.com/api/entreprises",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEntreprises(response.data.entreprises);
  
          console.log(entreprises);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchEntreprises();
    }, []);


    // Liste evenements
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "Admin") {
          const response = await axios.get(
            "https://api.myfeedback360.com/api/evenements",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response , 'liste')
          setEvents(response.data.evenements);
  
          console.log(events);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchEvents();
    }, []);



const [evaluationDataRecu, setEvaluationDataRecu]=useState([])

const fetchEvaluationUserRecu = async () => {
  const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
  try {
    if (token || role === "Admin") {
      const response = await axios.get('https://api.myfeedback360.com/api/listes/total/utlisateur/evaluer',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setEvaluationDataRecu(response.data.evaluatedUsers);
      console.log(response, 'listes/total/utlisateur/evaluer')
      console.log(evaluationDataRecu, 'evaluationDataRecu')
    }
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
};
useEffect(()=>{
  fetchEvaluationUserRecu ();
},[])


  return (
<div>
    <div className='content_tab_admin_statistique' id='content_tab_admin_statistique'>
       
        <div className="card1-admin  pt-2 ps-1">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
          </div>
          <div>
            <h4>Nombre de participants</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{users.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1 ">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faBuilding} id="icon-content-admin" />
            </div>
            <div>
              <h4> Nombre d'entreprises</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{entreprises.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faCalendar} id="icon-content-admin" />
            </div>
            <div>
              <h4>Nombre d'evenements</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{events.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
            </div>
            <div>
              <h4>Nombre de participant évalué</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{evaluationDataRecu.length}</h1>
        </div>
       
    </div>
    {/* tablette */}
    <div className='content_tab_admin_statistique2' id='content_tab_admin_statistique2'>
      <div id='content_tab_admin_statistique-gap'>
        <div className="card1-admin  pt-2 ps-1">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
          </div>
          <div>
            <h4>Nombre de participants</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{users.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1 ">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faBuilding} id="icon-content-admin" />
            </div>
            <div>
              <h4> Nombre d'entreprises</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{entreprises.length}</h1>
        </div>

      </div>
      <div id='content_tab_admin_statistique-gap'>
        <div className="card1-admin  pt-2 ps-1">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faCalendar} id="icon-content-admin" />
            </div>
            <div>
              <h4>Nombre d'evenements</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{events.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
            </div>
            <div>
              <h4>Nombre de participant évalué</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{evaluationDataRecu.length}</h1>
        </div>

      </div>

    </div>
    {/* mobile */}
    <div className='content_tab_admin_statistique3' id='content_tab_admin_statistique3'>
       
        <div className="card1-admin  pt-2 ps-1">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
          </div>
          <div>
            <h4>Nombre de participants</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{users.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1 ">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faBuilding} id="icon-content-admin" />
            </div>
            <div>
              <h4> Nombre d'entreprises</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{entreprises.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faCalendar} id="icon-content-admin" />
            </div>
            <div>
              <h4>Nombre d'evenements</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{events.length}</h1>
        </div>
        <div className="card1-admin  pt-2 ps-1">
          <div className="d-flex justify-content-around mt-2 ">
            <div>
              <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
            </div>
            <div>
              <h4>Nombre de participant évalué</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{evaluationDataRecu.length}</h1>
        </div>
       
    </div>

</div>
  )
}
