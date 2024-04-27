import {
  faEye,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";



export default function GestionMessage({ id }) {


  const [messages, setMessages] = useState([]);
   //  Lister les message

  useEffect(() => {
    const fetchMessage= async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "Admin") {
          const response = await axios.get(
            "http://localhost:8000/api/contactes",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response, 'responmessage')
          const tab=response.data.Contactes
          console.log(tab, 'tab message')
          setMessages(response.data.Contactes);
          console.log(messages, 'messages apres');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    fetchMessage();
  }, []);

  // Function pour supprimer une catégorie
  const supprimerMessage = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
   
    try {
      if (token || role === "Admin"){
        const response = await axios.delete(
          `http://localhost:8000/api/contacte/${id}/soft-delete`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        if (response.status === 200) {
          // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
          const updatedCategories = messages.filter(
            (mess) => mess.id !== id
          );
  
          setMessages(updatedCategories);
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "message supprimée avec succès!",
          });
        } else {
          console.error("Erreur lors de la suppression de la catégorie");
        }
      }
    } catch (error) {}
  };

 


  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
        <div>
          {/* <Button
            variant="primary"
            onClick={handleShowEdit}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter un évenement
          </Button> */}
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
                  placeholder="Rechercher une message"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  // value={searchValue}
                  // onChange={handleSearchChange}
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
        <h3>Liste des message</h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}>
            <tr>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>Nom Prenom</th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>Email</th>
              <th className="d-flex  justify-content-center "style={{backgroundColor: "#004573",color: "#fff",marginLeft: "3rem", }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentMaisons &&
              currentMaisons.map((maison) => {  key={maison.id} {maison.image && (*/}
              {messages.map((messageel) => (
              <tr key={messageel.id}>
                <td>{messageel.nom}</td>
                <td>{messageel.email}</td>
                <td className="d-flex justify-content-evenly">
                  <Button
                  // onClick={supprimerMessage}
                  onClick={() => supprimerMessage(messageel.id)}
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                  >
                    <Link
                      style={{ color: "#004573" }}
                      to={`/gestionmessagedetail/${messageel.id || ''}`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        {/* <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>

  
    </div>
  );
}



