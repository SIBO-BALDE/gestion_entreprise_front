
import {
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
import { useAuth } from  '../../Auth/AuthContex'
import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";
// import Pagination from "../../Components/Pagination/Pagination";

export default function GestionEntreprise() {
  const [loading, setLoading] = useState(true);
  const [showEntreprise, setshowEntreprise] = useState(false);
  const [showEditModalEntreprises, setShowEditModaEntreprises] = useState(false);

  const handleCloseEntreprises = () => setshowEntreprise(false); 
  const handleshowEntreprise = () => setshowEntreprise(true);
  const handleCloseEditEntreprises = () => setShowEditModaEntreprises(false);

 

  const [entreprises, setEntreprises] = useState([]);
  // etat pour ajout entreprise
  const [entrepriseData, setEntrepriseData] = useState({ 
    nom: "",
  
  });
  const { userRole, userToken } = useAuth();
  // function pour ajouter une entreprise
  const ajouterEntreprise = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
   
  
    if(entrepriseData.nom === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      console.log(entrepriseData, 'entreprisedata')
      return
    }
    try {
      if (token && role === "Admin") {
        const response = await axios.post(
          "http://localhost:8000/api/entreprise/create",

          entrepriseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle maison à la liste existante
          console.log(response, 'response entreprise')
          setEntreprises([...entreprises, response.data]);
          setLoading(false)
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setEntrepriseData({
            nom: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "entreprise ajouter avec succée!",
          });
          // Fermez le modal
          handleCloseEntreprises();
          fetchEntreprises()
        } else {
          console.error("Erreur dans lajout de maison");
        }
      }
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  };

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
        setLoading(false)

        console.log(entreprises);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchEntreprises();
  }, []);

  //  etat pour modifier entreprise
 const [editentrepriseData, setEditentrepriseData] = useState({
  id: null,
  nom: "",
  
});

  // Gestionnaire de clic pour le bouton de modification
  const handleShowEditentreprises = (entreprise) => {
    setEditentrepriseData({
      id: entreprise.id,
      nom: entreprise.nom,
     
    });
    setShowEditModaEntreprises(true);
  };

  // Fonction pour mettre à jour une catégorie
  const modifierEntreprise = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
          const response = await axios.post(
          `http://localhost:8000/api/entreprise/update/${editentrepriseData.id}`,
          editentrepriseData,
          {
            
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedEntreprises = entreprises.map((entrepriseEl) =>
            entrepriseEl.id === editentrepriseData.id
              ? response.data.entreprise
              : entrepriseEl
          );
          setEntreprises(updatedEntreprises);
          setLoading(false)
          handleCloseEditEntreprises();
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Entreprise mise à jour avec succès!",
          });
          fetchEntreprises();
        } else {
          console.error("erreur lors de la modification de la catégorie");
        }
      }
    } catch (error) {
      console.error("une erreur  Axios:", error);
    }
  };

  // Function pour supprimer une catégorie
  const supprimerEntrepriseEl = async (id) => { 
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir supprimer l'entreprise?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004573',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
      if (token || role === "Admin"){
        const response = await axios.delete(
          `http://localhost:8000/api/entreprises/${id}/soft-delete`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        if (response.status === 200) {
          // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
          const updatedEntreprises = entreprises.filter(
            (entrepriseEl) => entrepriseEl.id !== id
          );
          setEntreprises(updatedEntreprises);
          setLoading(false)
                Swal.fire({
                    icon: "success",
                    title: "Succès!",
                    text: "entreprise supprimer avec succès!",
                });
        } else {
          console.error("Erreur lors de la suppression de la catégorie");
        }
      }
    } catch (error) {}

  }
});
  };

   
//  pour le champ recherche
const [searchValue, setSearchValue] = useState("");

// function la recherche
const handleSearchChange = (nom) => {
  setSearchValue(nom.target.value);
};

// faire le filtre des maison par addrsse
const filteredEntreprise = entreprises.filter(
  (entreprise) =>
    entreprise &&
    entreprise.nom &&
    entreprise.nom.toLowerCase().includes(searchValue.toLowerCase())
);
const displayEntreprise= searchValue === "" ? entreprises : filteredEntreprise;


  const [currentPage, setCurrentPage] = useState(1);
const  entrepriseParPage= 5;

// pagination
const indexOfLastEntreprise = currentPage* entrepriseParPage;
const indexOfFirstEntreprise = indexOfLastEntreprise -  entrepriseParPage;
const currentEntreprises = filteredEntreprise.slice(
  indexOfFirstEntreprise,
  indexOfLastEntreprise
);

const totalPaginationPages = Math.ceil(entreprises.length /  entrepriseParPage);
  

  return (
    <div className="mt-4">
      {loading ? (
        <LoadingBox />
         ) : (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
        <div>
          <Button
            variant="primary"
            onClick={handleshowEntreprise}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter une entreprise
          </Button>
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
                  placeholder="Rechercher une entreprise"
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
        <h3>Liste des entreprises</h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Titre
              </th>

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
            
            {currentEntreprises && currentEntreprises.map((entreprise) => ( 
              <tr key={entreprise && entreprise.id} >
                <td style={{ color: "black" }} >{entreprise && entreprise.nom}</td>
                <td className="d-flex justify-content-evenly">
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditentreprises(entreprise)}
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    id="buttonModifier"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #004573",
                      color: "#004573",
                    }}
                    onClick={() => supprimerEntrepriseEl(entreprise.id)}
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

      {/* modal debut  ajouter entreprise*/}
      <>
        <Modal
          show={showEntreprise}
          onHide={handleCloseEntreprises}
          id="buttonAjouter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ajouter entreprise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  value={entrepriseData.nom}
                  onChange={(e) => {
                    setEntrepriseData({ ...entrepriseData, nom: e.target.value });
                  }}
                  type="text"
                  placeholder=""
                />
              
              </Form.Group>

              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterEntreprise}
              style={{
                backgroundColor: "#004573",
                border: "none",
                width: "130px",
              }}
            >
              Ajouter
            </Button>
            <Button
              variant="primary"
              onClick={handleCloseEntreprises}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #004573",
                width: "130px",
                color: "#004573",
              }}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {/* modal fin ajouter entreprise */}

      {/* modal debut modifier entreprise */}
      <Modal
        show={showEditModalEntreprises}
        onHide={handleCloseEditEntreprises}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="nom"
                value={editentrepriseData.nom}
                onChange={(e) =>
                  setEditentrepriseData({
                    ...editentrepriseData,
                    nom:e.target.value,
                  })
                }
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={modifierEntreprise}
            style={{
              backgroundColor: "#004573",
              border: "none",
              width: "130px",
            }}
          >
            Modifier
          </Button>
          <Button
            variant="primary"
            onClick={handleCloseEditEntreprises}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #004573",
              width: "130px",
              color: "#004573",
            }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal fin modifier maison */}
    </div>
 )}
    </div>
  );
}

