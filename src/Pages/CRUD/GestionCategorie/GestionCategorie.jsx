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

export default function GestionCategorie() {
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [showEditModalCategories, setShowEditModalCategories] = useState(false);

  const handleCloseCategories = () => setShowCategories(false);
  const handleshowCategories = () => setShowCategories(true);
  const handleCloseEditCategories = () => setShowEditModalCategories(false);

 

  
 
  const [categories, setCategories] = useState([]);
  // etat pour ajout categorie
  const [categoryData, setCategoryData] = useState({
    nom: "",
  
  });
  const { userRole, userToken } = useAuth();
  // function pour ajouter une categorie
  const ajouterCategory = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
    // alert('okay')
  
    if(categoryData.nom === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      console.log(categoryData, 'categoriedata')
      return
    }
    try {
      if (token && role === "Admin") {
        const response = await axios.post(
          "http://localhost:8000/api/categorie/create",

          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle maison à la liste existante
          console.log(response, 'response categorie')
          setCategories([...categories, response.data]);
          setLoading(false)
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setCategoryData({
            nom: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Lien hiérachie ajouter avec succée!",
          });
          // Fermez le modal
          handleCloseCategories();
          fetchCategories()
        } else {
          console.error("Erreur dans lajout de maison");
        }
      }
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  };

  //  Lister les categories
  const fetchCategories = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      // if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response , 'category resp')
        setCategories(response.data.categories);
        setLoading(false)

        console.log(categories);
      // }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  //  etat pour modifier categorie
 const [editCategoryData, setEditCategoryData] = useState({
  id: null,
  nom: "",
  
});

  // Gestionnaire de clic pour le bouton de modification
  const handleShowEditCategories = (categorie) => {
    setEditCategoryData({
      id: categorie.id,
      nom: categorie.nom,
     
    });
    setShowEditModalCategories(true);
  };

  // Fonction pour mettre à jour une catégorie
  const modifierCategory = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
          const response = await axios.post(
          `http://localhost:8000/api/categorie/update/${editCategoryData.id}`,
          editCategoryData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      

        if (response.status === 200) {
          const updatedCategories = categories.map((category) =>
            category.id === editCategoryData.id
              ? response.data.categorie
              : category
          );
          setCategories(updatedCategories);
          setLoading(false)
          handleCloseEditCategories();
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Lien hiérachie mise à jour avec succès!",
          });
          fetchCategories();
        } else {
          console.error("erreur lors de la modification de la lien hiérachie");
        }
      }
    } catch (error) {
      console.error("une erreur  Axios:", error);
    }
  };

  // Function pour supprimer une catégorie
  const supprimerCategory = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir supprimer le lien hiérachie?",
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
          `http://localhost:8000/api/categories/${id}/soft-delete`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.status === 200) {
          // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
          const updatedCategories = categories.filter(
            (category) => category.id !== id
          );
          setCategories(updatedCategories);
          setLoading(false)
                Swal.fire({
                    icon: "success",
                    title: "Succès!",
                    text: "Lien hiérachie supprimer avec succès!",
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
const filteredCategorie = categories.filter(
  (categorie) =>
    categorie &&
    categorie.nom &&
    categorie.nom.toLowerCase().includes(searchValue.toLowerCase())
);
const displayCategories= searchValue === "" ? categories : filteredCategorie;


  const [currentPage, setCurrentPage] = useState(1);
const  categorieParPage= 5;

// pagination
const indexOfLastCategorie = currentPage* categorieParPage;
const indexOfFirstCategorie = indexOfLastCategorie -  categorieParPage;
const currentCategories = filteredCategorie.slice(
  indexOfFirstCategorie,
  indexOfLastCategorie
);

const totalPaginationPages = Math.ceil(categories.length /  categorieParPage);

  
 
  

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
            onClick={handleshowCategories}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter un lien hiérachie
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
                  placeholder="Rechercher unlen hiérachie"
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
        <h3>Liste des liens hiérachies</h3>
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
            {/* {currentCategories.map((categorie) => ( key={categorie.id} {categorie.titre}{categorie.description}*/}
            {currentCategories && currentCategories.map((categorie) => ( 
              <tr key={categorie && categorie.id} >
                <td style={{ color: "black" }} >{categorie && categorie.nom}</td>
                <td className="d-flex justify-content-evenly">
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditCategories(categorie)}
                    // onClick={handleShowEditCategories}
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
                    onClick={() => supprimerCategory(categorie.id)}
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

      {/* modal debut  ajouter categorie*/}
      <>
        <Modal
          show={showCategories}
          onHide={handleCloseCategories}
          id="buttonAjouter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ajouter lien hiérachie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  value={categoryData.nom}
                  onChange={(e) => {
                    setCategoryData({ ...categoryData, nom: e.target.value });
                  //   validateField("titre", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                />
                {/* {errors.titre && (
                  <p className="error-message">{errors.titre}</p>
                )}
                {successeds.titre && (
                  <p className="success-message">{successeds.titre}</p>
                )} */}
              </Form.Group>

              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterCategory}
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
              onClick={handleCloseCategories}
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
      {/* modal fin ajouter categorie */}

      {/* modal debut modifier categorie */}
      <Modal
        show={showEditModalCategories}
        onHide={handleCloseEditCategories}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier lien hiérachi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="nom"
                value={editCategoryData.nom}
                onChange={(e) =>
                  setEditCategoryData({
                    ...editCategoryData,
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
            onClick={modifierCategory}
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
            onClick={handleCloseEditCategories}
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
