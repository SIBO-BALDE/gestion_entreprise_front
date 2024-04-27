import { faBellConcierge, faBuilding, faFeed, faQuestion, faUsers } from '@fortawesome/free-solid-svg-icons'
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
          "http://localhost:8000/api/users_participants",
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
            "http://localhost:8000/api/entreprises",
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


  return (
    <div className=''>
      {/* <div className="content-diagramme-circulaire-right-conten-2  pt-4 "> */}
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
            <FontAwesomeIcon icon={faUsers} id="icon-content-admin" />
          </div>
          <div>
            <h4>Nombre d'evenements</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">150</h1>
      </div>
        {/* </div> */}
    </div>
  )
}
