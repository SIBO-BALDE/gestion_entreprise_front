
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



export default function GestionEvenement({ id }) {
  // const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  const [showEditModalEvents, setShowEditModalEvents] = useState(false);

  const handleCloseEdit = () => setShowEvent(false);
  const handleShowEdit = () => setShowEvent(true);
  const handleShowEditEvent = () => showEditModalEvents(true);
  const handleCloseEditEvents = () => setShowEditModalEvents(false);
  
  


  const [events, setEvents] = useState([]);
  // etat pour ajout categorie
  const [eventData, setEventData] = useState({
    titre: "",
    description: "",
    date_debut: "",
    date_fin: "",
  
  });

   // function pour ajouter une categorie
   const ajouterEvent = async () => {
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
    // alert('okay')
  
    if(eventData.titre === "" ||  eventData.description === ""  || eventData.date_debut === "" || eventData.date_fin === "" ){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      // console.log(eventData, 'categoriedata')
      return
    }
    try {
      if (token && role === "Admin") {
        const response = await axios.post(
          "http://localhost:8000/api/evenement/create",

          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'responses event ajout')
        const essay =response.data.Evenement
        console.log(essay , 'essay')

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle maison à la liste existante
          console.log(response, 'response categorie')
          setEvents([...events, response.data.Evenement
          ]);
          
          console.log(events, 'events event')
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setEventData({
            titre: "",
            description: "",
            date_debut: "",
            date_fin: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "evenement ajouter avec succée!",
          });
          // Fermez le modal
          handleCloseEdit();
          fetchEvents()
        } else {
          console.error("Erreur dans lajout de maison");
        }
      }
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  };

  const fetchEvents = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/evenements",
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


   // Function pour supprimer une catégorie
   const supprimerEvent = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
   
    try {
      if (token || role === "Admin"){
        const response = await axios.delete(
          `http://localhost:8000/api/evenements/${id}/soft-delete`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        if (response.status === 200) {
          // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
          const updatedEvents = events.filter(
            (evet) => evet.id !== id
          );
  
          setEvents(updatedEvents);
          Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "De vouloir supprimer un evenement?",
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
                    text: "evenement supprimer avec succès!",
                });
            }
        });
        } else {
          console.error("Erreur lors de la suppression de la catégorie");
        }
      }
    } catch (error) {}
  };

  //  etat pour modifier categorie
 const [editEventData, setEditEventData] = useState({
  id: null,
  titre: "",
  description: "",
  date_debut: "",
  date_fin: "",
  
});

  // Gestionnaire de clic pour le bouton de modification

  const handleShowEditEvents = (eventEl) => {
    setEditEventData({
      id: eventEl.id,
      titre: eventEl.titre,
      description: eventEl.description,
      date_debut: eventEl.date_debut,
      date_fin: eventEl.date_fin,
     
    });
    setShowEditModalEvents(true);
  };

  // Fonction pour mettre à jour une catégorie
  const modifierEvent = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
          const response = await axios.post(
          `http://localhost:8000/api/evenement/update/${editEventData.id}`,
          editEventData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'response ev modif')

        if (response.status === 200) {
          const updatedEvents = events.map((evtUp) =>
            evtUp.id === editEventData.id
              ? response.data.evenements
              : evtUp
          );
          setEvents(updatedEvents);
          handleCloseEditEvents();
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "evenement mise à jour avec succès!",
          });
          fetchEvents();
        } else {
          console.error("erreur lors de la modification de la evenement");
        }
      }
    } catch (error) {
      console.error("une erreur  Axios:", error);
    }
  };

  

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
          <Button
            variant="primary"
            onClick={handleShowEdit}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter un évenement
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
                  placeholder="Rechercher un évenement"
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
        <h3>Liste des évenements</h3>
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
               Dsecription
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
               Date de début
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Date de fin
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
            {/* {currentMaisons &&
              currentMaisons.map((maison) => {  key={maison.id} {maison.image && (*/}
                {/* return ( */}

                {events && events.map((eventEl) => (
                  <tr key={ eventEl && eventEl.id}>
                    <td>{ eventEl && eventEl.titre}</td>
                    <td>{ eventEl && eventEl.description}</td>
                    <td>{ eventEl && eventEl.date_debut}</td>
                    <td>{ eventEl && eventEl.date_fin}</td>
                    <td className="d-flex justify-content-evenly">
                      {/* Vos boutons d'action ici */}
                    </td>
                    <td className="d-flex justify-content-evenly">
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditEvents(eventEl)}
                    // onClick={handleShowEditEvent}
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
                    onClick={() => supprimerEvent(eventEl.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
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

      {/* modal debut  ajouter event*/}
      <>
        <Modal show={showEvent} onHide={handleCloseEdit} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un évenement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex justify-content-around ">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    value={eventData.titre}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        titre: e.target.value,
                      });
                    
                    }}
                    type="text"
                    placeholder=""
                  />
                 
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={eventData.description}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        description: e.target.value,
                      });
                      
                    }}
                    type="text"
                    placeholder=""
                  />
                 
                </Form.Group>
                
              </div>
              <div className="d-flex justify-content-around ">
              <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date de début</Form.Label>
                  <Form.Control
                    value={eventData.date_debut}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        date_debut: e.target.value,
                      });
                      
                    }}
                    type="date"
                    placeholder=""
                  />
                  
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date de fin</Form.Label>
                  <Form.Control
                    value={eventData.date_fin}
                    onChange={(e) => {
                      setEventData({
                        ...eventData,
                        date_fin: e.target.value,
                      });
                     
                    }}
                    type="date"
                    placeholder=""
                  />
                 
                </Form.Group>

              </div>
               
              
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterEvent}
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
              // onClick={handleCancleAdd}
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
      {/* modal fin ajouter event */}

      {/* modal debut modifier event */}
      
      <Modal
        show={showEditModalEvents}
        onHide={handleCloseEditEvents}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier Evenement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="titre"
                value={editEventData.titre}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    titre:e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="nom"
                value={editEventData.description}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    description:e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date de debut</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="nom"
                value={editEventData.date_debut}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    date_debut:e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="nom"
                value={editEventData.date_fin}
                onChange={(e) =>
                  setEditEventData({
                    ...editEventData,
                    date_fin:e.target.value,
                  })
                }
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={modifierEvent}
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
            // onClick={handleCancleEdit}
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
     
      {/* modal fin modifier event */}
    </div>
  );
}


