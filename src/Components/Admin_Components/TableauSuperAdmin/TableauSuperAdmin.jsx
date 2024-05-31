
import { faBellConcierge, faBuilding, faCalendar, faFeed, faQuestion, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import "./TableauSuperAdmin.css";
import axios from 'axios';

export default function TableauSuperAdmin() {

  // tableau ou stocker la liste des users
  const [users, setUsers] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [abonnement, setAbonnement] = useState([]);

  const fetchUsers = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "SuperAdmin") {
        const response = await axios.get(
          "http://localhost:8000/api/listes/admins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.Admins);

        console.log(response ,'liste admin');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchEntreprises = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "SuperAdmin") {
        const response = await axios.get(
          "http://localhost:8000/api/listes/entrepriseAbonement",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(entreprises, 'entrepriseAbonement entre avant');
        setEntreprises(response.data.EntrepriseAbonement);

        console.log(entreprises, 'entrepriseAbonement entre apres');
        console.log(response, 'entrepriseAbonement resp'); 
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchEntreprises();
  }, []);

  const fetchAbonnement = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      
        const response = await axios.get(
          "http://localhost:8000/api/listes/abonements",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAbonnement(response.data.Abonnements);
        console.log(response)
        

        console.log(response ,'liste abonnement');
      
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchAbonnement();
  }, []);


    


  return (
    <div className=''>
        <div className="card1-admin  pt-2 ps-1">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
          </div>
          <div>
            <h4>Nombre de client</h4>
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
              <h4>Types d'abonnement</h4>
            </div>
          </div>
          <h1 className="text-center mt-1 ">{abonnement.length}</h1>
        </div>
    </div>
  )
}

