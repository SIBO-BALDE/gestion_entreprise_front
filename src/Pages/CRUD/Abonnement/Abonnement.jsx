import {
    faEye,
    faLock,
    faLockOpen,
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
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";
import Pagination from "../../../Components/User_Components/Pagination/Pagination";


  
  
  

    


export default function Abonnement() {
    const [loading, setLoading] = useState(true);
    // const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showBlokUser, setShowBlokUser] = useState(false);
    const [showEditModalUsers, setShowEditModalUsers] = useState(false);
  
    const handleCloseEdit = () => setShowUser(false);
    const handleShowEdit = () => setShowUser(true);
    const handleCloseEditUser = () => setShowEditModalUsers(false);
    const handleCloseBlokUser = () => setShowBlokUser(false);
    const handleShowBlokUser = () => setShowBlokUser(true);
  
    // tableau ou stocker la liste des users
    const [users, setUsers] = useState([]);



    const fetchAbonnement = async () => {
        const role = localStorage.getItem("rolecle");
        const token = localStorage.getItem("tokencle");
        try {
          
            const response = await axios.get(
              "https://api.com.myfeedback360.com/api/listes/abonements",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUsers(response.data.Abonnements);
            console.log(response)
            setLoading(false)
    
            console.log(response ,'liste abonnement');
          
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories:", error);
        }
      };
      useEffect(() => {
        fetchAbonnement();
      }, []);
     // etat pour ajout maison
  const [userData, setUserData] = useState({
    formule: "",
    temps: "",
    prix: "",

  });
 


    const  ajouterAbonnement = async (e) => {
        e.preventDefault();
        const role = localStorage.getItem("rolecle");
        const token = localStorage.getItem('tokencle')
        
        if(userData.formule === "" || userData.prix === "" || userData.temps === "" ){
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "les champs sont  obligatoires!",
          });
          return
        }
          try {
            if (token || role==="SuperAdmin"){
              const response = await axios.post(
                "https://api.com.myfeedback360.com/api/abonment/create",
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
                console.log(response, 'ajout abonnement')
                setLoading(false)
                setUserData({
                    formule: "",
                    temps: "",
                    prix: "",
                });
      
                Swal.fire({
                  icon: "success",
                  title: "Succès!",
                  text: "abonnement ajoutée avec succès!",
                });
      
                handleCloseEdit();
                fetchAbonnement();
      
               
              } else {
                console.error("Erreur dans l'ajout de la maison");
              }
            }
            
          } catch (error) {
            console.error("Erreur Axios:", error);
          }
        
      
      };


        // Lister les users
  
//  pour le champ recherche
const [searchValueUser, setSearchValueUser] = useState("");

// function la recherche
const handleSearchChange = (event) => {
  setSearchValueUser(event.target.value);
};

// faire le filtre des maison par addrsse
const filteredUsers = users.filter(
  (user) =>
    user &&
    user.formule &&
    user.formule.toLowerCase().includes(searchValueUser.toLowerCase())
);
const displayUsers = searchValueUser === "" ? users : filteredUsers;


  const [currentPage1, setCurrentPage1] = useState(1);
const usersParPage= 7;

// pagination
const indexOfLastUser = currentPage1* usersParPage;
const indexOfFirstUser = indexOfLastUser - usersParPage;
const currentUsers = filteredUsers.slice(
  indexOfFirstUser,
  indexOfLastUser
);

const totalPaginationPagesUser = Math.ceil(users.length / usersParPage);
console.log(users, 'users')
console.log(currentUsers, 'currentsUser');
const [editUserData, setEditUserData] = useState({
    id: null,
    formule: "",
    temps: "",
    prix: "",
  });

  
// Funtion qui permet de recuperer les information du user sur le quel on a cliquer
  const handleShowEditUsers = (user) => {
    if (user && user.formule) {
      setEditUserData({
        id: user.id,
        nom: user.formule,
        prix: user.prix,
        temps: user.temps,
        formule: user.formule,
      });
      setShowEditModalUsers(true);
    } else {
      console.error("Catégorie non définie pour la maison à modifier.");
      // Autres actions nécessaires en cas d'erreur...
    }
  };

   // Modifier user
   const modifierUser = async (id) => {
    const token = localStorage.getItem('tokencle')
    const role = localStorage.getItem("rolecle");
    // if(userData.formule === "" || userData.prix === "" || userData.temps === "" ){
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops!",
    //       text: "les champs sont  obligatoires!",
    //     });
    //     return
    //   }
    
      try {
        
          if (token || role==="SuperAdmin"){

            const response = await axios.post(
              `https://api.com.myfeedback360.com/api/abonment/update/${editUserData.id}`,
              editUserData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`
                },
              }
            );
           
  
            if (response.status === 200) {
              console.log(response, 'response modif abonnement')
            //   const dataEv = response.data.participants
              const updatedUsers = users.map((user) =>
              
                user.id === editUserData.id ? response.data.Abonnement : user
              );
              // console.log('updatedMaisons:', updatedMaisons);
  
              setUsers(updatedUsers);
              setEditUserData(response.data.Abonnement);
              setLoading(false)
              fetchAbonnement();
              handleCloseEditUser();
             
              Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "abonnement mise à jour avec succès!",
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


// supprimer abonnement
    const supprimerAbonement = async (id) => { 
        const role = localStorage.getItem("rolecle");
        const token = localStorage.getItem("tokencle");
        Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "De vouloir supprimer l'abonnement?",
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
              `https://api.com.myfeedback360.com/api/abonements/${id}/soft-delete`,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
           
            if (response.status === 200) {
              // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
              const updatedUsers = users.filter(
                (userEl) => userEl.id !== id
              );
              setUsers(updatedUsers);
                    Swal.fire({
                        icon: "success",
                        title: "Succès!",
                        text: "abonnement supprimer avec succès!",
                    });
            } else {
              console.error("Erreur lors de la suppression de la catégorie");
            }
          }
        } catch (error) {}
    
      }
    });
      };




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
                onClick={handleShowEdit}
                className="ms-4"
                style={{ backgroundColor: "#004573", border: "none" }}
                id="buttonAjouter"
              >
                Ajouter un abonnement
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
                      className="form-control w-50 "
                      placeholder="Rechercher un abonnement"
                      aria-label="user"
                      aria-describedby="addon-wrapping"
                      value={searchValueUser}
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
            <h3>Liste des abonnements</h3>
            <table className="table border  border-1">
              <thead
                className=""
                id="hearder-color"
                style={{ backgroundColor: "#004573" }}
              >
                <tr>
                  
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                   Formule
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Prix
                  </th>
                  <th style={{ backgroundColor: "#004573", color: "#fff" }}>
                    Temp
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
              { currentUsers &&
                  currentUsers.map((user) => ( 
                  <tr key={user && user.id}>
                   
                    <td>{user &&  user.formule}</td>
                    <td>{user &&  user.prix}F CFA</td>
                    <td>{user &&  user.temps}</td>
                    
                   
    
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
                            onClick={() => supprimerAbonement(user.id)}
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
              currentPage={currentPage1}
              totalPaginationPages={totalPaginationPagesUser}
              setCurrentPage={setCurrentPage1}
              />  
          </div>
          
    
         
          <>
            <Modal show={showUser} onHide={handleCloseEdit} id="buttonAjouter">
              <Modal.Header closeButton>
                <Modal.Title>Ajouter un  Abonnement</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div className="d-flex justify-content-around " style={{gap:'10px'}}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Formule</Form.Label>
                      <Form.Control
                        value={userData.formule}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            formule: e.target.value,
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
                      <Form.Label>Prix</Form.Label>
                      <Form.Control
                        value={userData.prix}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            prix: e.target.value,
                          });
                        
                        }}
                        type="text"
                        placeholder=""
                      />
                     
                    </Form.Group>
                  </div>
                  <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>Temps</Form.Label>
                      <Form.Control
                        value={userData.temps}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            temps: e.target.value,
                          });
                        
                        }}
                        type="text"
                        placeholder=""
                      />
                     
                  </Form.Group>
                  
                  
                  {/* <div className="d-flex justify-content-around"> */}
               
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={ajouterAbonnement}
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
                  onClick={handleCloseEdit}
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
          <Modal.Title>Modifier un abonnement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUserData && editUserData.nom && (
            <Form>
            <div className="d-flex justify-content-around " style={{gap:'10px'}}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Formule</Form.Label>
                <Form.Control
                  value={editUserData.formule}
                  onChange={(e) => {
                    setEditUserData({
                      ...editUserData,
                      formule: e.target.value,
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
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  value={editUserData.prix}
                  onChange={(e) => {
                    setEditUserData({
                      ...editUserData,
                      prix: e.target.value,
                    });
                  
                  }}
                  type="text"
                  placeholder=""
                />
               
              </Form.Group>
            </div>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Temps</Form.Label>
                <Form.Control
                  value={editUserData.temps}
                  onChange={(e) => {
                    setEditUserData({
                      ...editUserData,
                      temps: e.target.value,
                    });
                  
                  }}
                  type="text"
                  placeholder=""
                />
               
              </Form.Group>
            
            
            {/* <div className="d-flex justify-content-around"> */}
         
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
        </div>
       )} 
        </div>
      );
    }
