
import {
  faEye,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";



export default function GestionNewsletter({ id }) {


  
  const [emails, setEmails] = useState([]);
  // etat pour ajout categorie
  


   //  Lister les categories
   const fetchNewsletter = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/newsletters",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newsl = response.data
        console.log(newsl, 'newsl')
        setEmails(response.data.newsletter);

        console.log(emails);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des newsletter:", error);
    }
  };
  useEffect(() => {
    fetchNewsletter();
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

// faire le filtre des maison par addrsse
const filteredEmails = emails.filter(
  (emailEl) =>
    emailEl &&
    emailEl.created_at &&
    emailEl.created_at.toLowerCase().includes(searchValue.toLowerCase())
);
const displayEmails= searchValue === "" ? emails : filteredEmails;


  const [currentPage, setCurrentPage] = useState(1);
const  emailParPage= 3;

// pagination
const indexOfLastEmail = currentPage*  emailParPage;
const indexOfFirstEmail = indexOfLastEmail -   emailParPage;
const currentEmails = filteredEmails.slice(
  indexOfFirstEmail,
  indexOfLastEmail
);

const totalPaginationPages = Math.ceil(emails.length /   emailParPage);



 // Function pour supprimer une catégorie
 const supprimerNewsletter = async (id) => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  
  try {
    if (token || role === "Admin"){
      const response = await axios.delete(
        `http://localhost:8000/api/newsletter/${id}/soft-delete`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
        const updatedEmails = emails.filter(
          (emailletter) => emailletter.id !== id
        );

        setEmails(updatedEmails);
        Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "De vouloir supprimer le newsletter?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#004573',
          cancelButtonColor: '#f00020',
          confirmButtonText: "Oui, j'accepte!",
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  icon: "success",
                  title: "Succès!",
                  text: "newsletter supprimer avec succès!",
              });
          }
      });
      } else {
        console.error("Erreur lors de la suppression de la newsletter");
      }
    }
  } catch (error) {}
};

  
  

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
        <div>
          
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
                  placeholder="Rechercher une email"
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
        <h3>Liste des emails</h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Email
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Date de création
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Action
              </th>
              
            </tr>
          </thead>
          <tbody>

          {currentEmails && currentEmails.map((emailEl) => ( 
              <tr key={emailEl && emailEl.id} >
                <td style={{ color: "black" }} >{emailEl && emailEl.email}</td>
                <td style={{ color: "black" }} >{ formatDate(emailEl && emailEl.created_at)}</td>
                <td className=" d-flex justify-content-evenly">
                    
                      <Button
                        onClick={() =>supprimerNewsletter(emailEl.id)}
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
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

  
    </div>
  );
}




