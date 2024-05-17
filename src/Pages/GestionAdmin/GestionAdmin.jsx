
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
import { emailPattern } from "../../Pages/Regex/Regex";

import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../../Components/User_Components/Pagination/Pagination";



export default function GestionAdmin({ id }) {
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
  const [usersBlock, setUsersBlock] = useState([]);

  
  const [entreprises, setEntreprises] = useState([]);

;

//   Lister les entreprises
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
    //  Lister les users
    const fetchUsers = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "SuperAdmin") {
          const response = await axios.get(
            "http://localhost:8000/api/listes/admins",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers(response.data.Admins);
  
          console.log(response ,'liste admin');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchUsers();
    }, []);
    //  Lister les users blocked
    const fetchUsersBlock = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "SuperAdmin") {
          const response = await axios.get(
            "http://localhost:8000/api/listes/admin/bloquer",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsersBlock(response.data.Admin);
  
          console.log(response ,'liste admin blok');
          console.log(usersBlock ,' blok');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchUsersBlock();
    }, []);

  
  // etat pour ajout maison
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    entreprise_abonements_id: "",
    
  });

  //  etat initialiser à vide au depart pour modifier categorie
  const [editUserData, setEditUserData] = useState({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    entreprise_abonements_id: "",
  });

  
// Funtion qui permet de recuperer les information du user sur le quel on a cliquer
  const handleShowEditUsers = (user) => {
    if (user && user.entreprise_abonements_id) {
      setEditUserData({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        entreprise_abonements_id: user.entreprise_abonements_id,
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
     || userData.password === "" || userData.entreprise_abonements_id === ""){
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
        if (token || role==="SuperAdmin"){
          const response = await axios.post(
            "http://localhost:8000/api/admin/create",
            userData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if(response.data.status === 420){
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "L'e-mail existe déja!",
            });
            console.log(response.status, "status 420")
            return;
          }
  
          if (response.status === 200) {
            setUsers([...users, response.data]);
            setUserData({
              nom: "",
              prenom: "",
              email: "",
              password: "",
              entreprise_abonements_id: "",
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
 

  
 
  // Modifier user
  const modifierUser = async (id) => {
    const token = localStorage.getItem('tokencle')
    const role = localStorage.getItem("rolecle");
    if(editUserData.nom === "" || editUserData.prenom === "" || editUserData.email === "" 
     || editUserData.entreprise_abonements_id === ""){
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
        
          if (token || role==="SuperAdmin"){

            const response = await axios.post(
              `http://localhost:8000/api/admin/update/${editUserData.id}`,
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
              
                user.id === editUserData.id ? response.data.participants : user
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
    
  

// bloquer
  const supprimerUser = async (id) => {
    const token = localStorage.getItem('tokencle');
    const role = localStorage.getItem("rolecle");

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir bloquer l'admin?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004573',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
        if (token || role === "SuperAdmin") {
            const response = await axios.post(
                `http://localhost:8000/api/admin/${id}/bloquer`,
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
                            icon: "success",
                            title: "Succès!",
                            text: "l'admin bloqué avec succès!",
                        });
                    
               
                fetchUsers();
                fetchUsersBlock()
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur");
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
  }
});
};


// debloquer
const debloquerUser = async (id) => {
  const token = localStorage.getItem('tokencle');
  const role = localStorage.getItem("rolecle");

  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "De vouloir debloquer l'admin?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#004573',
    cancelButtonColor: '#f00020',
    confirmButtonText: "Oui, j'accepte!",
  }).then(async (result) => {
    if (result.isConfirmed) {
  try {
      if (token || role === "SuperAdmin") {
          const response = await axios.post(
              `http://localhost:8000/api/admin/${id}/debloquer`,
              {}, // Passer un objet vide en tant que corps de la requête
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          
          if (response.status === 200) {
              // Débloquer l'utilisateur avec succès
              const userId = response.data.id; // Assurez-vous de récupérer l'ID correctement
              console.log("Admin débloqué avec succès :", userId);
                    Swal.fire({
                        icon: "success",
                        title: "Succès!",
                        text: "l'admin debloqué avec succès!",
                    });
                

              Swal.fire({
                  icon: "success",
                  title: "Succès!",
                  text: "Admin débloqué avec succès!",
              });

              fetchUsers();
              fetchUsersBlock();
              handleCloseBlokUser();
          } else {
              console.error("Erreur lors du déblocage de l'admin");
          }
      }
  } catch (error) {
      console.error("Une erreur s'est produite :", error);
  }
}
});
};






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
     user.nom &&
     user.nom.toLowerCase().includes(searchValueUser.toLowerCase())
 );
 const displayUsers = searchValueUser === "" ? users : filteredUsers;


   const [currentPage1, setCurrentPage1] = useState(1);
 const usersParPage= 3;

 // pagination
 const indexOfLastUser = currentPage1* usersParPage;
 const indexOfFirstUser = indexOfLastUser - usersParPage;
 const currentUsers = filteredUsers.slice(
   indexOfFirstUser,
   indexOfLastUser
 );

 const totalPaginationPagesUser = Math.ceil(users.length / usersParPage);

 //  pour le champ recherche
 const [searchValueUserBlock, setSearchValueUserBlock] = useState("");

 // function la recherche
 const handleSearchChangeBlok = (event) => {
   setSearchValueUserBlock(event.target.value);
 };

 // faire le filtre des maison par addrsse
 const filteredUsersBlok = usersBlock.filter(
   (user) =>
     user &&
     user.nom &&
     user.nom.toLowerCase().includes(searchValueUserBlock.toLowerCase())
 );
 const displayUsersBlok = searchValueUserBlock === "" ? usersBlock : filteredUsersBlok;


   const [currentPage, setCurrentPage] = useState(1);
 const usersBlokParPage= 10;

 // pagination
 const indexOfLastUserBlok = currentPage* usersBlokParPage;
 const indexOfFirstUserBlok = indexOfLastUserBlok - usersBlokParPage;
 const currentUsersBlok = filteredUsersBlok.slice(
   indexOfFirstUserBlok,
   indexOfLastUserBlok
 );

 const totalPaginationPages = Math.ceil(usersBlock.length / usersBlokParPage);


  

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
            Ajouter un admin client
          </Button>
        </div>
        <div>
        <Form.Control
            variant="primary"
           
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none", color:'white', width:'250px' }}
            id="buttonAjouter"
            type="file"
            placeholder="Téléverser liste participant"
           />
        </div>
        <div>
          <Button
            variant="primary"
            onClick={handleShowBlokUser}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Liste Admin bloqué
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
                  placeholder="Rechercher un admin"
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
        <h3>Liste des administrateurs</h3>
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
          { currentUsers &&
              currentUsers.map((user) => ( 
              <tr key={user && user.id} >
                <td>{user &&  user.nom}</td>
                <td>{user &&  user.prenom}</td>
                <td>{user &&  user.email}</td>
                <td>{user &&   user.entreprise_abonement && user.entreprise_abonement.nom}</td>

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
        <Pagination
          currentPage={currentPage1}
          totalPaginationPages={totalPaginationPagesUser}
          setCurrentPage={setCurrentPage1}
          />  
      </div>

      {/* modal debut  ajouter participant*/}
      <>
        <Modal show={showUser} onHide={handleCloseEdit} id="buttonAjouter">
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un  admin client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex justify-content-around " style={{gap:'10px'}}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Nom du client</Form.Label>
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
                  <Form.Label>Prenom du client</Form.Label>
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
              <div className="d-flex justify-content-around" style={{gap:'10px'}}>
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
                  <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput6"
                >
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={userData.entreprise_abonements_id}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        entreprise_abonements_id: e.target.value,
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
          <Modal.Title>Modifier user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUserData && editUserData.nom && (
            <Form>
              <div className="d-flex justify-content-around " style={{gap:'10px'}}>
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
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    // value={editUserData.categories_id}
                    value={editUserData.entreprise_abonements_id || ""}
                    onChange={(e) => {
                      setEditUserData({
                        ...editUserData,
                        entreprise_abonements_id: e.target.value,
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



      {/* user blok */}

      <div >
        <Modal show={showBlokUser} onHide={handleCloseBlokUser} id="buttonAjouter" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Liste des admins bloqué</Modal.Title>
          </Modal.Header>

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
                  placeholder="Rechercher un admin bloqué"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  value={searchValueUserBlock}
                  onChange={handleSearchChangeBlok}
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
          <Modal.Body>
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
                Debloquer
              </th>
            </tr>
          </thead>
          <tbody>
            

          { currentUsersBlok &&
              currentUsersBlok.map((user) => ( 
              <tr key={user && user.id} >
                <td>{user &&  user.nom}</td>
                <td>{user &&  user.prenom}</td>
                <td>{user &&  user.email}</td>
                <td>{user &&   user.entreprise_abonement && user.entreprise_abonement.nom}</td>

                    <td className=" d-flex justify-content-evenly">
                      
                      <Button
                        onClick={() => debloquerUser(user.id)}
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #004573",
                          color: "#004573",
                        }}
                      >
                        <FontAwesomeIcon icon={faLockOpen} />
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
          </Modal.Body>
          
        </Modal>
      </div>
      {/* user blok */}
    </div>
  );
}


