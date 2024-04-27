import {
  faEye,
  faLock,
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
import { emailPattern } from "../../Regex/Regex";

import Swal from "sweetalert2";
import axios from "axios";



export default function GestionUser({ id }) {
  // const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showEditModalUsers, setShowEditModalUsers] = useState(false);

  const handleCloseEdit = () => setShowUser(false);
  const handleShowEdit = () => setShowUser(true);
  const handleCloseEditUser = () => setShowEditModalUsers(false);

  // tableau ou stocker la liste des users
  const [users, setUsers] = useState([]);

  const [categories, setCategories] = useState([]);
  const [entreprises, setEntreprises] = useState([]);


  
  //  Lister les categories
  const fetchCategories = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.categories);

        console.log(categories);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
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
    //  Lister les users
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
  
          console.log(users ,'ici users du users');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchUsers();
    }, []);

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
  // const filteredUsers = maisons.filter(
  //   (maison) =>
  //     maison &&
  //     maison.addresse &&
  //     maison.addresse.toLowerCase().includes(searchValue.toLowerCase())
  // );
  // const displayMaisons = searchValue === "" ? maisons : filteredMaisons;

  // etat pour ajout maison
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    categorie_id: "",
    entreprise_id: "",
    
  });

  //  etat initialiser à vide au depart pour modifier categorie
  const [editUserData, setEditUserData] = useState({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    categorie_id: "",
    entreprise_id: "",
  });

  
// Funtion qui permet de recuperer les information du user sur le quel on a cliquer
  const handleShowEditUsers = (user) => {
    if (user && user.categorie_id) {
      setEditUserData({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        categorie_id: user.categorie_id,
        entreprise_id: user.entreprise_id,
      });
      setShowEditModalUsers(true);
    } else {
      console.error("Catégorie non définie pour la maison à modifier.");
      // Autres actions nécessaires en cas d'erreur...
    }
  };

  const ajouterUser = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem('tokencle')
    
    if(userData.nom === "" || userData.prenom === "" || userData.email === "" 
    || userData.categorie_id === "" || userData.password === "" || userData.entreprise_id === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      return
    }
    if (!emailPattern.test(userData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "L'adresse e-mail saisie n'est pas valide!",
      });
      return;
    }
    if ((userData.password.trim().length < 8)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "le password doit etre plus de 8!",
      });
      return
      
    }
    
      try {
        if (token || role==="Admin"){
          const response = await axios.post(
            "http://localhost:8000/api/participant/create",
            userData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.status === 200) {
            setUsers([...users, response.data]);
            setUserData({
              nom: "",
              prenom: "",
              email: "",
              password: "",
              categorie_id: "",
              entreprise_id: "",
            });
  
            Swal.fire({
              icon: "success",
              title: "Succès!",
              text: "user ajoutée avec succès!",
            });
  
            handleCloseEdit();
            fetchUsers();
  
           
          } else {
            console.error("Erreur dans l'ajout de la maison");
          }
        }
        
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    
  
  };
  
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

  
 
  // Modifier user
  const modifierUser = async (id) => {
    const token = localStorage.getItem('tokencle')
    const role = localStorage.getItem("rolecle");
    if(editUserData.nom === "" || editUserData.prenom === "" || editUserData.email === "" 
    || editUserData.categorie_id === ""  || editUserData.entreprise_id === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      return
    }
    if (!emailPattern.test(editUserData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "L'adresse e-mail saisie n'est pas valide!",
      });
      return;
    }
      try {
        
          if (token || role==="Admin"){

            const response = await axios.post(
              `http://localhost:8000/api/participant/update/${editUserData.id}`,
              editUserData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`
                },
              }
            );
           
  
            if (response.status === 200) {
              console.log(response, 'response modif')
              const dataEv = response.data.participants
              const updatedUsers = users.map((user) =>
              
                user.id === editUserData.id ? dataEv : user
              );
              // console.log('updatedMaisons:', updatedMaisons);
  
              setUsers(updatedUsers);
              setEditUserData(response.data.participants);
              fetchUsers();
              handleCloseEditUser();
              Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "user mise à jour avec succès!",
              });
           
              console.log('Valeur de categories_id après la requête:', editUserData.categorie_id);
            } else {
              console.error("Erreur lors de la modification de la user");
            }
          
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    }
    
  

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

  const supprimerUser = async (id) => {
    const token = localStorage.getItem('tokencle');
    const role = localStorage.getItem("rolecle");
    try {
        if (token || role === "Admin") {
            const response = await axios.post(
                `http://localhost:8000/api/participant/${id}/bloquer`,
                {}, // Passer un objet vide en tant que corps de la requête
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // Bloquer l'utilisateur avec succès
                const userId = response.data.id; // Assurez-vous de récupérer l'ID correctement
                console.log("Utilisateur bloqué avec succès :", userId);

                // Supprimer l'utilisateur de la liste des utilisateurs
                setUsers(users.filter((user) => user.id !== userId));

                Swal.fire({
                    title: 'Êtes-vous sûr?',
                    text: "De vouloir bloquer l'utilisateur?",
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
                            text: "Utilisateur bloqué avec succès!",
                        });
                    }
                });
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
};



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
            Ajouter un participant
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
                  placeholder="Rechercher un utilisateur"
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
        <h3>Liste des participants</h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
               Nom
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Prenom
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Catégorie
              </th>
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                Entreprise
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

                {users && users.map((user) => (
                    <tr key={user && user.id}>
                        <td>{user ? user.nom : ''}</td>
                        <td>{user ? user.prenom : ''}</td>
                        <td>{user ? user.email : ''}</td>
                        <td>{user && user.categorie ? user.categorie.nom : ''}</td>
                        <td>{user && user.entreprise ? user.entreprise.nom : ''}</td>
                    {/* <td>7758966</td> */}

                    <td className=" d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        // onClick={handleShowEdit}
                        onClick={() => handleShowEditUsers(user)}
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
                        onClick={() => supprimerUser(user.id)}
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                      >
                        <FontAwesomeIcon icon={faLock} />
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

      {/* modal debut  ajouter participant*/}
      <>
        <Modal show={showUser} onHide={handleCloseEdit} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un participant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex justify-content-around ">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={userData.nom}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        nom: e.target.value,
                      });
                      //
                    }}
                    type="text"
                    placeholder=""
                  />
                 
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    value={userData.prenom}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        prenom: e.target.value,
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
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={userData.email}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      });
                     
                    }}
                    type="email"
                    placeholder=""
                  />
                  
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    value={userData.password}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        password: e.target.value,
                      });
                      
                    }}
                    type="password"
                    placeholder=""
                  />
                  
                </Form.Group>

              </div>
              <div className="d-flex justify-content-around">
                  <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput5"
                >
                  <Form.Label>Categorie</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={userData.categorie_id}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        categorie_id: e.target.value,
                      });
                      
                    }}
                  >
                    <option>Choisir une catégorie</option>
                    {categories &&
                      categories.map((cat, index) => {
                        return (
                          <option key={index} value={cat.id}>
                            {cat.nom}
                          </option>
                        );
                      })}
                  </Form.Select>
                  </Form.Group>
                  <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput6"
                >
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={userData.entreprise_id}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        entreprise_id: e.target.value,
                      });
                      
                    }}
                  >
                    <option>Choisir une entreprise</option>
                    {entreprises &&
                      entreprises.map((entrepriseel, index) => {
                        return (
                          <option key={index} value={entrepriseel.id}>
                            {entrepriseel.nom}
                          </option>
                        );
                      })}
                  </Form.Select>
                  </Form.Group>
              </div>
              
              {/* <div className="d-flex justify-content-around"> */}
           
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterUser}
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
      {/* modal fin ajouter user */}

      {/* modal debut modifier user */}
      <Modal
        show={showEditModalUsers}
        onHide={handleCloseEditUser}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUserData && editUserData.nom && (
            <Form>
              <div className="d-flex justify-content-around ">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={editUserData.nom}
                    onChange={(e) => {
                      setEditUserData({
                        ...editUserData,
                        nom: e.target.value,
                      });
                     
                    }}
                  />
                  
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={editUserData.prenom}
                    onChange={(e) => {
                      setEditUserData({
                        ...editUserData,
                        prenom: e.target.value,
                      });
                      
                    }}
                  />
                  
                </Form.Group>
              </div>
              <div className="d-flex justify-content-around">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    value={editUserData.email}
                    onChange={(e) => {
                      setEditUserData({
                        ...editUserData,
                        email: e.target.value,
                      });
                     
                    }}
                  />
                 
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput5"
                >
                  <Form.Label>Categorie</Form.Label>
                  <Form.Select
                      aria-label="Default select example"
                      value={editUserData.categorie_id}
                      onChange={(e) => {
                        setEditUserData({
                          ...editUserData,
                          categorie_id: e.target.value,
                        });
                      }}
                    >
                    <option>Choisir une catégorie</option>
                    {categories &&
                      categories.map((cat, index) => {
                        return (
                          <option key={index} value={cat.id}>
                            {cat.nom}
                          </option>
                        );
                      })}
                  </Form.Select>
                  </Form.Group>
              </div>
              <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    // value={editUserData.categories_id}
                    value={editUserData.entreprise_id || ""}
                    onChange={(e) => {
                      setEditUserData({
                        ...editUserData,
                        entreprise_id: e.target.value,
                      });
                     
                    }}
                  >
                    {/* recuperer la categorie selectionner par défaut pour la modifier */}
                  {entreprises &&
                      entreprises.map((entrepriseel, index) => {
                        return (
                          <option key={index} value={entrepriseel.id}>
                            {entrepriseel.nom}
                          </option>
                        );
                      })}
                  </Form.Select>
                  
                </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={modifierUser}
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
            onClick={handleCloseEditUser}
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
     
      {/* modal fin modifier user */}
    </div>
  );
}

