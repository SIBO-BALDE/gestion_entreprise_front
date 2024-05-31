
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
import { continents, countries, languages } from 'countries-list'
import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list'
// import { useAuth } from  '../../Auth/AuthContex'
import Pagination from "../../Components/User_Components/Pagination/Pagination";
import { emailPattern } from "../Regex/Regex";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";
// import Pagination from "../../Components/Pagination/Pagination";

export default function GestionEntrepriseAdmin() {
  const [loading, setLoading] = useState(true);
  const [showEntreprise, setshowEntreprise] = useState(false);
  const [showEditModalEntreprises, setShowEditModaEntreprises] = useState(false);

  const handleCloseEntreprises = () => setshowEntreprise(false); 
  const handleshowEntreprise = () => setshowEntreprise(true);
  const handleCloseEditEntreprises = () => setShowEditModaEntreprises(false);

// recuperer la lsite des pay sur l'api country list
  const [selectedCountry, setSelectedCountry] = useState('');
  const countryOptions = Object.values(countries).map(country => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  

  const [entreprises, setEntreprises] = useState([]);
  // etat pour ajout entreprise
  const [entrepriseData, setEntrepriseData] = useState({ 
    nom: "",
    email: "",
    pays:"",
    ville:"",
    adresse:"",
    numeroTelUn:"",
    numeroTelDeux:"",



  
  });
  
  
  // function pour ajouter une entreprise
  const ajouterEntreprise = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
   
  
    if(entrepriseData.nom === "" || entrepriseData.email === "" 
    || entrepriseData.pays === "" || entrepriseData.ville === "" 
    || entrepriseData.adresse === "" || entrepriseData.numeroTelUn === "" 
     || entrepriseData.numeroTelDeux === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      console.log(entrepriseData, 'entreprisedata')
      return
    }
    if (!entrepriseData.email.match(emailPattern)) {
      Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "L'e-mail  invalide!",
      });
      return;
  }
    try {
      if (token && role === "SuperAdmin") {
        const response = await axios.post(
          "http://localhost:8000/api/entrepriseAbonement/create",

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
          console.log(entreprises ,'entreprises ajout')
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setEntrepriseData({
            nom: "",
            email: "",
            pays:"",
            ville:"",
            adresse:"",
            numeroTelUn:"",
            numeroTelDeux:"",
           
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
        setLoading(false)

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

  //  etat pour modifier entreprise
 const [editentrepriseData, setEditentrepriseData] = useState({
    id: null,
    nom: "",
    email: "",
    pays:"",
    ville:"",
    adresse:"",
    numeroTelUn:"",
    numeroTelDeux:"",
  
});

  // Gestionnaire de clic pour le bouton de modification
  const handleShowEditentreprises = (entreprise) => {
    setEditentrepriseData({
      id: entreprise.id,
      nom: entreprise.nom,
      email: entreprise.email,
      pays:entreprise.pays,
      ville:entreprise.ville,
      adresse:entreprise.adresse,
      numeroTelUn:entreprise.numeroTelUn,
      numeroTelDeux:entreprise.numeroTelDeux,
     
    });
    setShowEditModaEntreprises(true);
  };

  // Fonction pour mettre à jour une catégorie
  const modifierEntreprise = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "SuperAdmin") {
          const response = await axios.post(
          `http://localhost:8000/api/entrepriseAbonement/update/${editentrepriseData.id}`,
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
      text: "De vouloir supprimer l'événement?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004573',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
      if (token || role === "SuperAdmin"){
        const response = await axios.delete(
          `http://localhost:8000/api/entrepriseAbonements/${id}/soft-delete`,
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
    } catch (error) {

    }
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
const filteredEntreprise =  entreprises && entreprises.filter(
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
const currentEntreprises =  filteredEntreprise && filteredEntreprise.slice(
  indexOfFirstEntreprise,
  indexOfLastEntreprise
);

const totalPaginationPages = Math.ceil( entreprises && entreprises.length /  entrepriseParPage);
  

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
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Pays
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Ville
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Addresse
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Telephone Portable
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Telephone Fixe
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
            {/* {currententreprises.map((entreprise) => ( key={entreprise.id} {entreprise.titre}{entreprise.description}*/}
            {currentEntreprises && currentEntreprises.map((entreprise) => ( 
              <tr key={entreprise && entreprise.id} >
                <td style={{ color: "black" }} >{entreprise && entreprise.nom}</td>
                <td style={{ color: "black" }} >{entreprise && entreprise.email}</td>
                <td style={{ color: "black" }} >{entreprise && entreprise.pays}</td>
                <td style={{ color: "black" }} >{entreprise && entreprise.ville}</td>
                <td style={{ color: "black" }} >{entreprise && entreprise.adresse}</td>
                <td style={{ color: "black" }} >{entreprise && entreprise.numeroTelUn}</td>
                <td style={{ color: "black" }} >{entreprise && entreprise.numeroTelDeux}</td>
                <td className="d-flex justify-content-evenly">
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditentreprises(entreprise)}
                    // onClick={handleShowEditentreprises}
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
              <div className="d-flex" style={{gap:'15px'}}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nom de l'entreprise</Form.Label>
                <Form.Control
                  value={entrepriseData.nom}
                  onChange={(e) => {
                    setEntrepriseData({ ...entrepriseData, nom: e.target.value });
                  }}
                  type="text"
                  placeholder=""
                />
                
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={entrepriseData.email}
                  onChange={(e) => {
                    setEntrepriseData({ ...entrepriseData, email: e.target.value });
                  }}
                  type="email"
                  placeholder=""
                />
                
              </Form.Group>

              </div>
              <div className="d-flex" style={{gap:'15px'}}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Numero Portable</Form.Label>
                  <Form.Control
                    value={entrepriseData.numeroTelUn}
                    onChange={(e) => {
                      setEntrepriseData({ ...entrepriseData, numeroTelUn: e.target.value });
                    }}
                    type="text"
                    placeholder=""
                  />
                  
                </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Télephone fixe</Form.Label>
                <Form.Control
                  value={entrepriseData.numeroTelDeux}
                  onChange={(e) => {
                    setEntrepriseData({ ...entrepriseData, numeroTelDeux: e.target.value });
                  }}
                  type="text"
                  placeholder=""
                />
                
              </Form.Group>

              </div>
              {/* pays */}
              <div className="d-flex" style={{gap:'15px'}}>
              <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    value={entrepriseData.adresse}
                    onChange={(e) => {
                      setEntrepriseData({ ...entrepriseData, adresse: e.target.value });
                    }}
                    type="text"
                    placeholder=""
                  />
                  
                </Form.Group>
                {/* pays */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    value={entrepriseData.ville}
                    onChange={(e) => {
                      setEntrepriseData({ ...entrepriseData, ville: e.target.value });
                    }}
                    type="text"
                    placeholder=""
                  />
                  
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                  <Form.Label>Pays</Form.Label>
                  <Form.Control
                    as="select"
                    value={entrepriseData.pays}
                      onChange={(e) => {
                        setEntrepriseData({
                          ...entrepriseData,
                          pays: e.target.value,
                        });
                        
                      }}
                  >
                    <option value="">Sélectionnez un pays</option>
                    {countryOptions}
                  </Form.Control>
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
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
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
            </Form.Group> */}

            <div className="d-flex" style={{gap:'15px'}}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={editentrepriseData.nom}
                  onChange={(e) => {
                    setEditentrepriseData({ ...editentrepriseData, nom: e.target.value });
                  }}
                  type="text"
                  placeholder=""
                />
                
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={editentrepriseData.email}
                  onChange={(e) => {
                    setEditentrepriseData({ ...editentrepriseData, email: e.target.value });
                  }}
                  type="email"
                  placeholder=""
                />
                
              </Form.Group>

              </div>
              <div className="d-flex" style={{gap:'15px'}}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Telephone portable</Form.Label>
                  <Form.Control
                    value={editentrepriseData.numeroTelUn}
                    onChange={(e) => {
                      setEditentrepriseData({ ...editentrepriseData, numeroTelUn: e.target.value });
                    }}
                    type="text"
                    placeholder=""
                  />
                  
                </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Téléphone fixe</Form.Label>
                <Form.Control
                  value={editentrepriseData.numeroTelDeux}
                  onChange={(e) => {
                    setEditentrepriseData({ ...editentrepriseData, numeroTelDeux: e.target.value });
                  }}
                  type="text"
                  placeholder=""
                />
                
              </Form.Group>

              </div>
              {/* pays */}
              <div className="d-flex" style={{gap:'15px'}}>
              <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    value={editentrepriseData.adresse}
                    onChange={(e) => {
                      setEditentrepriseData({ ...editentrepriseData, adresse: e.target.value });
                    }}
                    type="text"
                    placeholder=""
                  />
                  
                </Form.Group>
                {/* pays */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    value={editentrepriseData.ville}
                    onChange={(e) => {
                      setEditentrepriseData({ ...editentrepriseData, ville: e.target.value });
                    }}
                    type="text"
                    placeholder=""
                  />
                  
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                  <Form.Label>Pays</Form.Label>
                  <Form.Control
                    as="select"
                    value={editentrepriseData.pays}
                      onChange={(e) => {
                        setEditentrepriseData({
                          ...editentrepriseData,
                          pays: e.target.value,
                        });
                        
                      }}
                  >
                    <option value="">Sélectionnez un pays</option>
                    {countryOptions}
                  </Form.Control>
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
