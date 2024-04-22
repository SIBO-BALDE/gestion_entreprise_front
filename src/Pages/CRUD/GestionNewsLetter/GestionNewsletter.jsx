
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



export default function GestionNewsletter({ id }) {
  // const [show, setShow] = useState(false);
  const [showMaison, setshowMaison] = useState(false);
  const [showEditModalMaisons, setShowEditModalMaisons] = useState(false);

  const handleCloseEdit = () => setshowMaison(false);
  const handleShowEdit = () => setshowMaison(true);
  const handleCloseEditMaisons = () => setShowEditModalMaisons(false);

  // tableau ou stocker la liste des maison
  // const [maisons, setMaisons] = useState([]);

  // const [newFile, setNewFile] = useState("");

  //  state pour liste les categorie
  // const [categories, setCategories] = useState([]);

  //  pour le champ recherche
  // const [searchValue, setSearchValue] = useState("");

  // function la recherche
  // const handleSearchChange = (event) => {
  //   setSearchValue(event.target.value);
  // };

  // faire le filtre des maison par addrsse
  // const filteredMaisons = maisons.filter(
  //   (maison) =>
  //     maison &&
  //     maison.addresse &&
  //     maison.addresse.toLowerCase().includes(searchValue.toLowerCase())
  // );
  // const displayMaisons = searchValue === "" ? maisons : filteredMaisons;

  // etat pour ajout maison
  // const [maisonData, setMaisonData] = useState({
  //   addresse: "",
  //   superficie: "",
  //   prix: "",
  //   categories_id: "",
  //   image: "",
  //   annee_construction: "",
  //   description: "",
  // });

  //  etat pour modifier categorie
  // const [editMaisonData, setEditMaisonData] = useState({
  //   id: null,
  //   addresse: "",
  //   superficie: "",
  //   prix: "",
  //   categories_id: "",
  //   image: null,
  //   annee_construction: "",
  //   description: "",
  // });

  // const handleFileChange = (file) => {
  //   setNewFile(file);
  // };

  // const handleShowEditMaisons = (maison) => {
   
  //   if (maison && maison.categories_id) {
  //     setEditMaisonData({
  //       id: maison.id,
  //       addresse: maison.addresse,
  //       superficie: maison.superficie,
  //       prix: maison.prix,
  //       categories_id: maison.categories_id,
  //       image: maison.image,
  //       annee_construction: maison.annee_construction,
  //       description: maison.description,
  //     });
  //     setShowEditModalMaisons(true);
  //     // console.log(maison.categories_id, 'maison.categories_id onclick')
  //   } else {
  //     console.error("Catégorie non définie pour la maison à modifier.");
  //     // Autres actions nécessaires en cas d'erreur...
  //   }
  // };

  // const ajouterMaison = async (e) => {
  //   e.preventDefault();
  //   const role = localStorage.getItem("rolecle");
  //   const token = localStorage.getItem('tokencle')
  //   if(maisonData.addresse === "" || maisonData.superficie === "" || maisonData.prix === "" 
  //   || maisonData.categories_id === "" || maisonData.image === "" || maisonData.annee_construction === ""
  //    || maisonData.description === ""){
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops!",
  //       text: "les champs sont  obligatoires!",
  //     });
  //     return
  //   }
    

  //   if (validationStatus) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("addresse", maisonData.addresse);
  //       formData.append("superficie", maisonData.superficie);
  //       formData.append("prix", maisonData.prix);
  //       formData.append("categories_id", maisonData.categories_id);
  //       formData.append("image", maisonData.image);
  //       formData.append("annee_construction", maisonData.annee_construction);
  //       formData.append("description", maisonData.description);
       

  //       if (token || role==="admin"){
  //         const response = await axios.post(
  //           "http://localhost:8000/api/maison/create",
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  
  //         if (response.status === 200) {
  //           setMaisons([...maisons, response.data]);
  //           setMaisonData({
  //             addresse: "",
  //             superficie: "",
  //             prix: "",
  //             categories_id: "",
  //             image: "",
  //             annee_construction: "",
  //             description: "",
  //           });
  
  //           Swal.fire({
  //             icon: "success",
  //             title: "Succès!",
  //             text: "Maison ajoutée avec succès!",
  //           });
  
  //           handleCloseEdit();
  //           fetchMaison();
  
  //           setErrors({});
  //           setSuccesseds({});
  //           setValidationStatus(false);
  //         } else {
  //           console.error("Erreur dans l'ajout de la maison");
  //         }
  //       }
        
  //     } catch (error) {
  //       console.error("Erreur Axios:", error);
  //     }
    
  // }
  // };
  
  // annuler l'ajout
  // const handleCancleAdd = () => {
  //   Swal.fire({
  //     title: "Vous etes sur?",
  //     text: "De vouloir annuler!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#004573",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Oui, je veux annuler!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Annulé!",
  //         text: "Votre requete a été annulée avec succée.",
  //         icon: "success",
  //       });
  //     }
  //   });
  //   handleCloseEdit();
  //   setErrors({});
  //   setSuccesseds({});
  //   setValidationStatus(false);
  // };

  
  // function pour lister les maison
  // const fetchMaison = async () => {
  //   const token = localStorage.getItem('tokencle')
  //   const role = localStorage.getItem("rolecle");
  //   try {
  //     if (token || role==="admin") {

  //     }
  //     const response = await axios.get(
  //       "http://localhost:8000/api/maison/liste",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       }


  //     );
  //     // console.log(response, "response");
  //     setMaisons(response.data.maison);

  //     // console.log(maison, "liste maison");
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des maisons:", error);
  //   }
  // };

  // recuperer la liste des maisons
  // useEffect(() => {
  //   fetchMaison();
  // }, []);

  // recuperer les categorie
  // useEffect(() => {
  //   // Effectuer une requête pour récupérer la liste des catégories depuis le backend
  //   const RecupererCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/categorie/liste"
  //       );
  //       // console.log(response, "les respones");
  //       setCategories(response.data.categories);
  //     } catch (error) {
  //       // console.error("Erreur lors de la récupération des catégories:", error);
  //     }
  //   };
  //   RecupererCategories();
  // }, []);

  // Modifier maison
  // const modifierMaison = async (id) => {
  //   const token = localStorage.getItem('tokencle')
  //   const role = localStorage.getItem("rolecle");
  //   if (validationStatus) {
  //     try {
  //       {
  //         // Créez un objet FormData pour l'envoi de la requête
  //         const formData = new FormData();
  //         formData.append("id", editMaisonData.id);
  //         formData.append("addresse", editMaisonData.addresse);
  //         formData.append("superficie", editMaisonData.superficie);
  //         formData.append("prix", editMaisonData.prix);
  //         formData.append("categories_id", editMaisonData.categories_id);
  //         console.log(" avant categories_id", editMaisonData.categories_id);
  //         if (newFile instanceof File) {
  //           formData.append("image", newFile);
  //         } else {
  //           formData.append("image", editMaisonData.image);
  //         }
  //         // console.log('Données avant la requête:', formData);

  //         formData.append(
  //           "annee_construction",
  //           editMaisonData.annee_construction
  //         );
  //         formData.append("description", editMaisonData.description);
  //         // console.log(addresse, 'address')

  //         if (token || role==="admin"){

  //           const response = await axios.post(
  //             `http://localhost:8000/api/maison/edit/${editMaisonData.id}`,
  //             formData,
  //             {
  //               headers: {
  //                 "Content-Type": "multipart/form-data",
  //                 Authorization: `Bearer ${token}`
  //               },
  //             }
  //           );
  //           // console.log('Réponse du serveur après mise à jour :', response.data);
  //           // console.log('Valeur de categories_id après la requête (côté client) :', response.data.maison.categories_id);
  
  //           if (response.status === 200) {
  //             const updatedMaisons = maisons.map((maison) =>
  //               maison.id === editMaisonData.id ? response.data.maison : maison
  //             );
  //             // console.log('updatedMaisons:', updatedMaisons);
  
  //             setMaisons(updatedMaisons);
  //             setEditMaisonData(response.data.maison);
  //             handleCloseEditMaisons();
  //             Swal.fire({
  //               icon: "success",
  //               title: "Succès!",
  //               text: "Maison mise à jour avec succès!",
  //             });
  //             setErrors({});
  //             setSuccesseds({});
  //             setValidationStatus(false);
  //             // console.log('Valeur de categories_id après la requête:', editMaisonData.categories_id);
  //           } else {
  //             console.error("Erreur lors de la modification de la maison");
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Erreur Axios:", error);
  //     }
  //   }
  // };

  // femer annuler la modificacion
  // const handleCancleEdit = () => {
  //   Swal.fire({
  //     title: "Vous etes sur?",
  //     text: "De vouloir annuler!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#004573",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Oui, je veux annuler!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Annulé!",
  //         text: "Votre requete a été annulée avec succée.",
  //         icon: "success",
  //       });
  //     }
  //   });
  //   handleCloseEditMaisons();
  //   setErrors({});
  //   setSuccesseds({});
  //   setValidationStatus(false);
  // };

  // const supprimerMaison = async (id) => {
  //   const token = localStorage.getItem('tokencle')
  //   const role = localStorage.getItem("rolecle");
  //   try {
  //     if (token || role==="admin"){
  //       const response = await axios.delete(
  //         `http://localhost:8000/api/maison/supprimer/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  
  
          
  //       );
  //       if (response.status === 200) {
  //         // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
  //         const updatedMaisons = maisons.filter((maison) => maison.id !== id);
  
  //         setMaisons(updatedMaisons);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Succès!",
  //           text: "maison supprimée avec succès!",
  //         });
  //         fetchMaison();
  //       } else {
  //         console.error("Erreur lors de la suppression de la catégorie");
  //       }
  //     }
  //   } catch (error) {}
  // };

  // pour la pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const maisonsParPage = 4;
  // pagination
  // const indexOfLastMaison = currentPage * maisonsParPage;
  // const indexOfFirstMaison = indexOfLastMaison - maisonsParPage;
  // const currentMaisons = filteredMaisons.slice(
  //   indexOfFirstMaison,
  //   indexOfLastMaison
  // );

  // const totalPaginationPages = Math.ceil(maisons.length / maisonsParPage);

  // etat pour faire la validation des champs
  // const [errors, setErrors] = useState({
  //   addresse: "",
  //   superficie: "",
  //   prix: "",
  //   categories_id: "",
  //   image: "",
  //   annee_construction: "",
  //   description: "",
  // });

  // const [successeds, setSuccesseds] = useState({
  //   addresse: "",
  //   superficie: "",
  //   prix: "",
  //   categories_id: "",
  //   image: "",
  //   annee_construction: "",
  //   description: "",
  // });

  // const [validationStatus, setValidationStatus] = useState(false);

  // funtion pour faire la validation des champs
  // const validateField = (name, value) => {
  //   // Ajoutez vos conditions de validation pour chaque champ
  //   let errorMessage = "";
  //   let successMessage = "";

  //   if (name === "addresse") {
  //     if (!value.trim()) {
  //       errorMessage = "L'adresse ne peut pas être vide";
  //     } else if (value.trim().length < 2) {
  //       errorMessage = "L'adresse doit contenir au moins deux lettres";
  //     } else {
  //       successMessage = "L'adresse est valide";
  //     }
  //   } else if (name === "superficie") {
  //     if (!value.trim()) {
  //       errorMessage = "La superficie ne peut pas être vide";
  //     } else if (value.trim().length < 3) {
  //       errorMessage = "La superficie doit contenir au moins trois chiffres";
  //     } else if (!/^\d+$/.test(value.trim())) {
  //       errorMessage = "La superficie doit contenir uniquement des chiffres";
  //     } else {
  //       successMessage = "La superficie est valide";
  //     }
  //   } else if (name === "prix") {
  //     if (!value.trim()) {
  //       errorMessage = "La prix ne peut pas être vide";
  //     } else if (value.trim().length < 7) {
  //       errorMessage = "La prix doit contenir au moins sept chiffres";
  //     } else if (!/^\d+$/.test(value.trim())) {
  //       errorMessage = "Le prix doit contenir uniquement des chiffres";
  //     } else {
  //       successMessage = "Le prix est valide";
  //     }
  //   } else if (name === "categories_id") {
  //     if (!value.trim()) {
  //       errorMessage = "La categories ne peut pas être vide";
  //     } else {
  //       successMessage = "La categorie a été remplie";
  //     }
  //   } else if (name === "image") {
  //     if (!value) {
  //       errorMessage = "L'image doit être definie";
  //     } else {
  //       successMessage = "L'image a été definie";
  //     }
  //   } else if (name === "annee_construction") {
  //     if (!value.trim()) {
  //       errorMessage = "L'annee de construction ne doit pas etre vide";
  //     } else {
  //       successMessage = "L'annee de construction est valide";
  //     }
  //   }

  //   // Mettez à jour le state en utilisant le nom du champ actuel
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: errorMessage,
  //   }));
  //   setSuccesseds((prevSuccess) => ({
  //     ...prevSuccess,
  //     [name]: successMessage,
  //   }));

  //   const isValid = Object.values(errors).every((error) => !error);
  //   setValidationStatus(isValid);
  // };

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
                  placeholder="Rechercher une email"
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
            {/* {currentMaisons &&
              currentMaisons.map((maison) => {  key={maison.id} {maison.image && (*/}
                {/* return ( */}
                  <tr >
                    

                    {/* {maison && <td>{maison.addresse || "N/A"}</td>} {maison.superficie}m2 {maison.prix} */}
                    
                    <td>Email</td>
                    <td> Date de création</td>

                    <td className=" d-flex justify-content-evenly">
                    
                      <Button
                        // onClick={() => supprimerMaison(maison.id)}
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
                          // to={`/detailmaisonadmin/${maison.id} || '' `}
                          style={{ color: "#004573" }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                {/* ); */}
              {/* })} */}
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




