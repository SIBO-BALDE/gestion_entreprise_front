
// import {
//   faMagnifyingGlass,
//   faPenToSquare,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Form, Modal } from "react-bootstrap";
// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { continents, countries, languages } from 'countries-list'
// import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list'
// // import { useAuth } from  '../../Auth/AuthContex'
// import Pagination from "../../Components/User_Components/Pagination/Pagination";
// import { emailPattern } from "../Regex/Regex";
// import LoadingBox from "../../Components/LoadingBox/LoadingBox";
// // import Pagination from "../../Components/Pagination/Pagination";

// export default function GestionEntrepriseAdmin() {
//   const [loading, setLoading] = useState(true);
//   const [showEntreprise, setshowEntreprise] = useState(false);
//   const [showEditModalEntreprises, setShowEditModaEntreprises] = useState(false);

//   const handleCloseEntreprises = () => setshowEntreprise(false); 
//   const handleshowEntreprise = () => setshowEntreprise(true);
//   const handleCloseEditEntreprises = () => setShowEditModaEntreprises(false);

// // recuperer la lsite des pay sur l'api country list
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const countryOptions = Object.values(countries).map(country => (
//     <option key={country.name} value={country.name}>
//       {country.name}
//     </option>
//   ));

  

//   const [entreprises, setEntreprises] = useState([]);
//   // etat pour ajout entreprise
//   const [entrepriseData, setEntrepriseData] = useState({ 
//     nom: "",
//     email: "",
//     pays:"",
//     ville:"",
//     adresse:"",
//     numeroTelUn:"",
//     numeroTelDeux:"",



  
//   });
  
  
//   // function pour ajouter une entreprise
//   const ajouterEntreprise = async () => {
//     const token = localStorage.getItem("tokencle");
//     const role = localStorage.getItem("rolecle");
   
  
//     if(entrepriseData.nom === "" || entrepriseData.email === "" 
//     || entrepriseData.pays === "" || entrepriseData.ville === "" 
//     || entrepriseData.adresse === "" || entrepriseData.numeroTelUn === "" 
//      || entrepriseData.numeroTelDeux === ""){
//       Swal.fire({
//         icon: "error",
//         title: "Oops!",
//         text: "les champs sont  obligatoires!",
//       });
//       console.log(entrepriseData, 'entreprisedata')
//       return
//     }
//     if (!entrepriseData.email.match(emailPattern)) {
//       Swal.fire({
//           icon: "error",
//           title: "Oops!",
//           text: "L'e-mail  invalide!",
//       });
//       return;
//   }
//     try {
//       if (token && role === "SuperAdmin") {
//         const response = await axios.post(
//           "http://localhost:8000/api/entrepriseAbonement/create",

//           entrepriseData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Vérifiez si la requête a réussi
//         if (response.status === 200) {
//           // Ajoutez la nouvelle maison à la liste existante
//           console.log(response, 'response entreprise')
//           setEntreprises([...entreprises, response.data]);
//           setLoading(false)
//           console.log(entreprises ,'entreprises ajout')
//           // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
//           setEntrepriseData({
//             nom: "",
//             email: "",
//             pays:"",
//             ville:"",
//             adresse:"",
//             numeroTelUn:"",
//             numeroTelDeux:"",
           
//           });
//           Swal.fire({
//             icon: "success",
//             title: "Succès!",
//             text: "entreprise ajouter avec succée!",
//           });
//           // Fermez le modal
//           handleCloseEntreprises();
//           fetchEntreprises()
//         } else {
//           console.error("Erreur dans lajout de maison");
//         }
//       }
//     } catch (error) {
//       // Gestion des erreurs Axios
//       console.error("Erreur Axios:", error);
//     }
//   };

//   //  Lister les entreprises
//   const fetchEntreprises = async () => {
//     const role = localStorage.getItem("rolecle");
//     const token = localStorage.getItem("tokencle");
//     try {
//       if (token || role === "SuperAdmin") {
//         const response = await axios.get(
//           "http://localhost:8000/api/listes/entrepriseAbonement",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(entreprises, 'entrepriseAbonement entre avant');
//         setEntreprises(response.data.EntrepriseAbonement);
//         setLoading(false)

//         console.log(entreprises, 'entrepriseAbonement entre apres');
//         console.log(response, 'entrepriseAbonement resp'); 
//       }
//     } catch (error) {
//       console.error("Erreur lors de la récupération des catégories:", error);
//     }
//   };
//   useEffect(() => {
//     fetchEntreprises();
//   }, []);

//   //  etat pour modifier entreprise
//  const [editentrepriseData, setEditentrepriseData] = useState({
//     id: null,
//     nom: "",
//     email: "",
//     pays:"",
//     ville:"",
//     adresse:"",
//     numeroTelUn:"",
//     numeroTelDeux:"",
  
// });

//   // Gestionnaire de clic pour le bouton de modification
//   const handleShowEditentreprises = (entreprise) => {
//     setEditentrepriseData({
//       id: entreprise.id,
//       nom: entreprise.nom,
//       email: entreprise.email,
//       pays:entreprise.pays,
//       ville:entreprise.ville,
//       adresse:entreprise.adresse,
//       numeroTelUn:entreprise.numeroTelUn,
//       numeroTelDeux:entreprise.numeroTelDeux,
     
//     });
//     setShowEditModaEntreprises(true);
//   };

//   // Fonction pour mettre à jour une catégorie
//   const modifierEntreprise = async () => {
//     const role = localStorage.getItem("rolecle");
//     const token = localStorage.getItem("tokencle");
//     try {
//       if (token || role === "SuperAdmin") {
//           const response = await axios.post(
//           `http://localhost:8000/api/entrepriseAbonement/update/${editentrepriseData.id}`,
//           editentrepriseData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           const updatedEntreprises = entreprises.map((entrepriseEl) =>
//             entrepriseEl.id === editentrepriseData.id
//               ? response.data.entreprise
//               : entrepriseEl
//           );
//           setEntreprises(updatedEntreprises);
//           setLoading(false)
//           handleCloseEditEntreprises();
//           Swal.fire({
//             icon: "success",
//             title: "Succès!",
//             text: "Entreprise mise à jour avec succès!",
//           });
//           fetchEntreprises();
//         } else {
//           console.error("erreur lors de la modification de la catégorie");
//         }
//       }
//     } catch (error) {
//       console.error("une erreur  Axios:", error);
//     }
//   };

//   // Function pour supprimer une catégorie
//   const supprimerEntrepriseEl = async (id) => { 
//     const role = localStorage.getItem("rolecle");
//     const token = localStorage.getItem("tokencle");
//     Swal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "De vouloir supprimer l'événement?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#004573',
//       cancelButtonColor: '#f00020',
//       confirmButtonText: "Oui, j'accepte!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//     try {
//       if (token || role === "SuperAdmin"){
//         const response = await axios.delete(
//           `http://localhost:8000/api/entrepriseAbonements/${id}/soft-delete`,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
       
//         if (response.status === 200) {
//           // Filtrez la liste des catégories pour exclure celle qui vient d'être supprimée
//           const updatedEntreprises = entreprises.filter(
//             (entrepriseEl) => entrepriseEl.id !== id
//           );
  
//           setEntreprises(updatedEntreprises);
//           setLoading(false)
//                 Swal.fire({
//                     icon: "success",
//                     title: "Succès!",
//                     text: "entreprise supprimer avec succès!",
//                 });
            
//         } else {
//           console.error("Erreur lors de la suppression de la catégorie");
//         }
//       }
//     } catch (error) {

//     }
//   }
//   });
//   };

   
// //  pour le champ recherche
// const [searchValue, setSearchValue] = useState("");

// // function la recherche
// const handleSearchChange = (nom) => {
//   setSearchValue(nom.target.value);
// };

// // faire le filtre des maison par addrsse
// const filteredEntreprise =  entreprises && entreprises.filter(
//   (entreprise) =>
//     entreprise &&
//     entreprise.nom &&
//     entreprise.nom.toLowerCase().includes(searchValue.toLowerCase())
// );
// const displayEntreprise= searchValue === "" ? entreprises : filteredEntreprise;


//   const [currentPage, setCurrentPage] = useState(1);
// const  entrepriseParPage= 5;

// // pagination
// const indexOfLastEntreprise = currentPage* entrepriseParPage;
// const indexOfFirstEntreprise = indexOfLastEntreprise -  entrepriseParPage;
// const currentEntreprises =  filteredEntreprise && filteredEntreprise.slice(
//   indexOfFirstEntreprise,
//   indexOfLastEntreprise
// );

// const totalPaginationPages = Math.ceil( entreprises && entreprises.length /  entrepriseParPage);
  

//   return (
    
//     <div className="mt-4">
//       {loading ? (
//       <LoadingBox />
//        ) : (
//       <div className="container">
      
//       <div className="d-flex justify-content-between mt-5">
//         <div>
//           <Button
//             variant="primary"
//             onClick={handleshowEntreprise}
//             className="ms-4"
//             style={{ backgroundColor: "#004573", border: "none" }}
//             id="buttonAjouter"
//           >
//             Ajouter une entreprise
//           </Button>
//         </div>
//         <div className="flex-grow-1 d-flex justify-content-end ">
//           <div className="champsRecherche mt-2 mb-3 w-50">
//             <Form>
//               <div
//                 className="input-group flex-nowrap "
//                 style={{ borderColor: "#004573" }}
//               >
//                 <Form.Control
//                   type="search"
//                   className="form-control w-50   "
//                   placeholder="Rechercher une entreprise"
//                   aria-label="user"
//                   aria-describedby="addon-wrapping"
//                   value={searchValue}
//                   onChange={handleSearchChange}
//                 />
//                 <span
//                   className="input-group-text text-white me-4"
//                   id="addon-wrapping"
//                   style={{ backgroundColor: "#004573" }}
//                 >
//                   <FontAwesomeIcon icon={faMagnifyingGlass} />
//                 </span>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 ms-3  me-3">
//         <h3>Liste des entreprises</h3>
//         <table className="table border  border-1">
//           <thead
//             className=""
//             id="hearder-color"
//             style={{ backgroundColor: "#004573" }}
//           >
//             <tr>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//                 Titre
//               </th>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//                 Email
//               </th>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//                 Pays
//               </th>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//                 Ville
//               </th>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//                 Addresse
//               </th>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//                 Telephone Portable
//               </th>
//               <th style={{ backgroundColor: "#004573", color: "#fff" }}>
//               Telephone Fixe
//               </th>

//               <th
//                 className="d-flex  justify-content-center "
//                 style={{
//                   backgroundColor: "#004573",
//                   color: "#fff",
//                   marginLeft: "3rem",
//                 }}
//               >
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {currententreprises.map((entreprise) => ( key={entreprise.id} {entreprise.titre}{entreprise.description}*/}
//             {currentEntreprises && currentEntreprises.map((entreprise) => ( 
//               <tr key={entreprise && entreprise.id} >
//                 <td style={{ color: "black" }} >{entreprise && entreprise.nom}</td>
//                 <td style={{ color: "black" }} >{entreprise && entreprise.email}</td>
//                 <td style={{ color: "black" }} >{entreprise && entreprise.pays}</td>
//                 <td style={{ color: "black" }} >{entreprise && entreprise.ville}</td>
//                 <td style={{ color: "black" }} >{entreprise && entreprise.adresse}</td>
//                 <td style={{ color: "black" }} >{entreprise && entreprise.numeroTelUn}</td>
//                 <td style={{ color: "black" }} >{entreprise && entreprise.numeroTelDeux}</td>
//                 <td className="d-flex justify-content-evenly">
//                   <Button
//                     variant="primary"
//                     onClick={() => handleShowEditentreprises(entreprise)}
//                     // onClick={handleShowEditentreprises}
//                     style={{
//                       backgroundColor: "#fff",
//                       border: "1px solid #004573",
//                       color: "#004573",
//                     }}
//                     id="buttonModifier"
//                   >
//                     <FontAwesomeIcon icon={faPenToSquare} />
//                   </Button>
//                   <Button
//                     style={{
//                       backgroundColor: "#fff",
//                       border: "1px solid #004573",
//                       color: "#004573",
//                     }}
//                     onClick={() => supprimerEntrepriseEl(entreprise.id)}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </Button>
//                 </td>
//               </tr>
//             ))} 
//           </tbody>
//         </table>
//         <Pagination
//           currentPage={currentPage}
//           totalPaginationPages={totalPaginationPages}
//           setCurrentPage={setCurrentPage}
//         />
//       </div>

//       {/* modal debut  ajouter entreprise*/}
//       <>
//         <Modal
//           show={showEntreprise}
//           onHide={handleCloseEntreprises}
//           id="buttonAjouter"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>Ajouter entreprise</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <div className="d-flex" style={{gap:'15px'}}>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Nom de l'entreprise</Form.Label>
//                 <Form.Control
//                   value={entrepriseData.nom}
//                   onChange={(e) => {
//                     setEntrepriseData({ ...entrepriseData, nom: e.target.value });
//                   }}
//                   type="text"
//                   placeholder=""
//                 />
                
//               </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   value={entrepriseData.email}
//                   onChange={(e) => {
//                     setEntrepriseData({ ...entrepriseData, email: e.target.value });
//                   }}
//                   type="email"
//                   placeholder=""
//                 />
                
//               </Form.Group>

//               </div>
//               <div className="d-flex" style={{gap:'15px'}}>
//                 <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Numero Portable</Form.Label>
//                   <Form.Control
//                     value={entrepriseData.numeroTelUn}
//                     onChange={(e) => {
//                       setEntrepriseData({ ...entrepriseData, numeroTelUn: e.target.value });
//                     }}
//                     type="text"
//                     placeholder=""
//                   />
                  
//                 </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Télephone fixe</Form.Label>
//                 <Form.Control
//                   value={entrepriseData.numeroTelDeux}
//                   onChange={(e) => {
//                     setEntrepriseData({ ...entrepriseData, numeroTelDeux: e.target.value });
//                   }}
//                   type="text"
//                   placeholder=""
//                 />
                
//               </Form.Group>

//               </div>
//               {/* pays */}
//               <div className="d-flex" style={{gap:'15px'}}>
//               <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Adresse</Form.Label>
//                   <Form.Control
//                     value={entrepriseData.adresse}
//                     onChange={(e) => {
//                       setEntrepriseData({ ...entrepriseData, adresse: e.target.value });
//                     }}
//                     type="text"
//                     placeholder=""
//                   />
                  
//                 </Form.Group>
//                 {/* pays */}
//                 <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Ville</Form.Label>
//                   <Form.Control
//                     value={entrepriseData.ville}
//                     onChange={(e) => {
//                       setEntrepriseData({ ...entrepriseData, ville: e.target.value });
//                     }}
//                     type="text"
//                     placeholder=""
//                   />
                  
//                 </Form.Group>
//               </div>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
//                   <Form.Label>Pays</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={entrepriseData.pays}
//                       onChange={(e) => {
//                         setEntrepriseData({
//                           ...entrepriseData,
//                           pays: e.target.value,
//                         });
                        
//                       }}
//                   >
//                     <option value="">Sélectionnez un pays</option>
//                     {countryOptions}
//                   </Form.Control>
//               </Form.Group>

              
              

              
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="secondary"
//               onClick={ajouterEntreprise}
//               style={{
//                 backgroundColor: "#004573",
//                 border: "none",
//                 width: "130px",
//               }}
//             >
//               Ajouter
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleCloseEntreprises}
//               style={{
//                 backgroundColor: "#fff",
//                 border: "1px solid #004573",
//                 width: "130px",
//                 color: "#004573",
//               }}
//             >
//               Fermer
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//       {/* modal fin ajouter entreprise */}

//       {/* modal debut modifier entreprise */}
//       <Modal
//         show={showEditModalEntreprises}
//         onHide={handleCloseEditEntreprises}
//         id="buttonModifier"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Modifier Catégorie</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Nom</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder=""
//                 name="nom"
//                 value={editentrepriseData.nom}
//                 onChange={(e) =>
//                   setEditentrepriseData({
//                     ...editentrepriseData,
//                     nom:e.target.value,
//                   })
//                 }
//               />
//             </Form.Group> */}

//             <div className="d-flex" style={{gap:'15px'}}>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Nom</Form.Label>
//                 <Form.Control
//                   value={editentrepriseData.nom}
//                   onChange={(e) => {
//                     setEditentrepriseData({ ...editentrepriseData, nom: e.target.value });
//                   }}
//                   type="text"
//                   placeholder=""
//                 />
                
//               </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   value={editentrepriseData.email}
//                   onChange={(e) => {
//                     setEditentrepriseData({ ...editentrepriseData, email: e.target.value });
//                   }}
//                   type="email"
//                   placeholder=""
//                 />
                
//               </Form.Group>

//               </div>
//               <div className="d-flex" style={{gap:'15px'}}>
//                 <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Telephone portable</Form.Label>
//                   <Form.Control
//                     value={editentrepriseData.numeroTelUn}
//                     onChange={(e) => {
//                       setEditentrepriseData({ ...editentrepriseData, numeroTelUn: e.target.value });
//                     }}
//                     type="text"
//                     placeholder=""
//                   />
                  
//                 </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>Téléphone fixe</Form.Label>
//                 <Form.Control
//                   value={editentrepriseData.numeroTelDeux}
//                   onChange={(e) => {
//                     setEditentrepriseData({ ...editentrepriseData, numeroTelDeux: e.target.value });
//                   }}
//                   type="text"
//                   placeholder=""
//                 />
                
//               </Form.Group>

//               </div>
//               {/* pays */}
//               <div className="d-flex" style={{gap:'15px'}}>
//               <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Adresse</Form.Label>
//                   <Form.Control
//                     value={editentrepriseData.adresse}
//                     onChange={(e) => {
//                       setEditentrepriseData({ ...editentrepriseData, adresse: e.target.value });
//                     }}
//                     type="text"
//                     placeholder=""
//                   />
                  
//                 </Form.Group>
//                 {/* pays */}
//                 <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Ville</Form.Label>
//                   <Form.Control
//                     value={editentrepriseData.ville}
//                     onChange={(e) => {
//                       setEditentrepriseData({ ...editentrepriseData, ville: e.target.value });
//                     }}
//                     type="text"
//                     placeholder=""
//                   />
                  
//                 </Form.Group>
//               </div>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
//                   <Form.Label>Pays</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={editentrepriseData.pays}
//                       onChange={(e) => {
//                         setEditentrepriseData({
//                           ...editentrepriseData,
//                           pays: e.target.value,
//                         });
                        
//                       }}
//                   >
//                     <option value="">Sélectionnez un pays</option>
//                     {countryOptions}
//                   </Form.Control>
//               </Form.Group>
            
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={modifierEntreprise}
//             style={{
//               backgroundColor: "#004573",
//               border: "none",
//               width: "130px",
//             }}
//           >
//             Modifier
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleCloseEditEntreprises}
//             style={{
//               backgroundColor: "#fff",
//               border: "1px solid #004573",
//               width: "130px",
//               color: "#004573",
//             }}
//           >
//             Fermer
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* modal fin modifier maison */}
    
//       </div>
//      )}
//     </div>
 
//   );
// }



import { faEye, faFolderOpen, faMagnifyingGlass, faPenToSquare, faPlus, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from '../../Components/User_Components/Pagination/Pagination';
import LoadingBox from '../../Components/LoadingBox/LoadingBox';



export default function GestionEntrepriseAdmin() {
  const [loading, setLoading] = useState(true);
  const [showEvaluation, setShowEvaluation]=useState(false)
  
  const handleCloseEvaluation = () => setShowEvaluation(false);
  const handleShowEvaluation = () => setShowEvaluation(true);
  const [evaluations, setEvaluations] = useState([])
  const [searchValueBlok, setSearchValueBlok] = useState("");
  const [eventsBlok, setEventsBlok] = useState([]);
  //  pour le champ recherche
 const [searchValue, setSearchValue] = useState("");
  


  const [questions, setQuestions] = useState([{ index: 0, responseCount: 1, nom: '', categorie_id: '', reponses: [''], niveau: [0] }]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState({});
  // const [evaluationData, setEvaluationData] = useState({ titre: '', questions: [{ nom: '', categorie_id: '', reponses: [] }] });
  const [evaluationData, setEvaluationData] = useState({
        titre: '',
        questions: [{ nom: '', categorie_id: '', reponses: [{ reponse: '', niveau: 0 }] }]
    });

  const addQuestion = () => {
      setQuestions(prevQuestions => {
          const newQuestionIndex = prevQuestions.length;
          return [
              ...prevQuestions,
              {
                  index: newQuestionIndex,
                  responseCount: 1,
                  nom: '',
                  categorie_id: '',
                  reponses: [''],
                  niveau: [0]
              }
          ];
      });

      setSelectedCategories(prevSelectedCategories => ({
          ...prevSelectedCategories,
          [questionIndex]: []
      }));

      setQuestionIndex(prevIndex => prevIndex + 1);
  };

  const removeQuestion = indexToRemove => {
      setQuestions(prevQuestions => prevQuestions.filter(question => question.index !== indexToRemove));
  };

  const addResponse = questionIndex => {
      setQuestions(prevQuestions =>
          prevQuestions.map(question => {
              if (question.index === questionIndex) {
                  return {
                      ...question,
                      responseCount: question.responseCount + 1,
                      reponses: [...question.reponses, ''],
                      niveau: [...question.niveau, 0]
                  };
              }
              return question;
          })
      );
  };

  const handleResponseChange = (questionIndex, responseIndex, value) => {
      setQuestions(prevQuestions =>
          prevQuestions.map(question => {
              if (question.index === questionIndex) {
                  const updatedReponses = question.reponses.map((response, idx) =>
                      idx === responseIndex ? value : response
                  );
                  return { ...question, reponses: updatedReponses };
              }
              return question;
          })
      );
  };

  const handleNumberChange = (questionIndex, numberIndex, value) => {
      setQuestions(prevQuestions =>
          prevQuestions.map(question => {
              if (question.index === questionIndex) {
                  const updatedNumbers = question.niveau.map((number, idx) =>
                      idx === numberIndex ? value : number
                  );
                  return { ...question, niveau: updatedNumbers };
              }
              return question;
          })
      );
  };

  const fetchEventsBlok = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "Admin") {
        const response = await axios.get(
          "http://localhost:8000/api/listes/evaluation/archives",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response , 'listes evaluation archives')
        setEventsBlok(response.data.evaluations);
        setLoading(false)
  
        console.log(eventsBlok, 'blok event');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchEventsBlok();
  }, []);

// archiver 

const archiverEvaluation = async (evenement_id) => {
  const token = localStorage.getItem("tokencle");
  const role = localStorage.getItem("rolecle");
  console.log("0 evenementId :", evenement_id);
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "De vouloir archiver l'évaluation?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#004573',
    cancelButtonColor: '#f00020',
    confirmButtonText: "Oui, j'accepte!",
  }).then(async (result) => {
    if (result.isConfirmed) {
  
  if (token && role === 'Admin') {
    console.log("one evenementId :", evenement_id);
    try {
      console.log("evenementId seconde :", evenement_id);
      // Envoie une requête PUT à l'endpoint pour archiver l'évaluation avec l'evenementId spécifié
      const response = await axios.put(
        `http://localhost:8000/api/archiver/evaluation/${evenement_id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "l'évaluation a été archiver avec succès!",
            });
            fetchEventsBlok()
            fetchEvaluations()

      console.log("Évaluation archivée avec succès :", response.data);
      console.log("Évaluation evenementId :", evenement_id);
      
      // Gérer la mise à jour de l'état de l'application ou de l'interface utilisateur si nécessaire
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'évaluation :", error);
    }
  }
}
});
};



    
  const [categories, setCategories] = useState([]);


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
        setLoading(false)

        console.log(categories);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    
  }, []);



const handleCategorySelect = (questionIndex, categoryId) => {
  setSelectedCategories(prevSelectedCategories => {
      const selected = prevSelectedCategories[questionIndex] || [];
      if (selected.includes(categoryId)) {
          return {
              ...prevSelectedCategories,
              [questionIndex]: selected.filter(id => id !== categoryId)
          };
      } else {
          return {
              ...prevSelectedCategories,
              [questionIndex]: [...selected, categoryId]
          };
      }
  });
};


    const ajouterEvaluation = async () => {
        const token = localStorage.getItem('tokencle');
        const role = localStorage.getItem('rolecle');
        
        if (token && role === 'Admin') {
            try {
                // Vérifier si toutes les données requises sont remplies
                const isDataValid = evaluationData.titre && questions.every(question => question.nom && question.reponses.length > 0);
                
                if (!isDataValid) {
                    throw new Error("Veuillez remplir tous les champs obligatoires.");
                }

                const requestData = {
                    titre: evaluationData.titre,
                    questions: questions.map((question, index) => ({
                        nom: question.nom.trim(),
                        categorie_id: selectedCategories[index]?.[0],
                        reponses: question.reponses.map((reponse, reponseIndex) => ({
                            reponse: reponse.trim(),
                            niveau: question.niveau[reponseIndex]
                        }))
                    }))
                };

                console.log('Données d\'évaluation à envoyer :', requestData);

                // Envoyez les données au serveur
                const response = await axios.post(
                    'http://localhost:8000/api/Questionsevaluation/create',
                    requestData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('Réponse de la requête :', response);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'Question évaluation ajoutée avec succès!',
                });

                // Réinitialiser les champs après l'ajout
                setEvaluationData({ 
                  titre: '',
                  questions: [{ nom: '', categorie_id: '', reponses: [{ reponse: '', niveau: 0 }] }]
                 });
                
                fetchEvaluations();
                handleCloseEvaluation();
                
                

                fetchEvaluations();
                handleCloseEvaluation();
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'évaluation :', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: error.message || 'Une erreur est survenue lors de l\'ajout de l\'évaluation.',
                });
            }
        }
    };


const fetchEvaluations = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    // if (token) {
      const response = await axios.get(
        "http://localhost:8000/api/evaluations/question/reponse",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response , 'liste evaluations')
      setEvaluations(response.data.evaluations);
      setLoading(false)
      

      console.log(evaluations);
   
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
};
useEffect(() => {
  fetchEvaluations();
}, []);


const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};


 // function la recherche
 const handleSearchChange = (titre) => {
   setSearchValue(titre.target.value);
 };
 
 // faire le filtre des maison par addrsse
 const filteredEvaluation = evaluations?.filter(
   (evaluation) =>
     evaluation &&
     evaluation.titre &&
     evaluation.titre.toLowerCase().includes(searchValue.toLowerCase())
 );
 const displayEvaluation= searchValue === "" ? evaluations : filteredEvaluation;
 
 const [currentPage, setCurrentPage] = useState(1);
 const evaluationParPage= 6;
 
 // pagination
 const indexOfLastEvaluation = currentPage*  evaluationParPage;
 const indexOfFirstEvaluation = indexOfLastEvaluation -   evaluationParPage;
 const currentEvaluations = filteredEvaluation.slice(
   indexOfFirstEvaluation,
   indexOfLastEvaluation
 );
 
 const totalPaginationPages = Math.ceil(evaluations?.length /   evaluationParPage);
 console.log(evaluations.length, 'evaluations?.length')

//  modification evaluation
 const [showEditEvaluation, setShowEditEvaluation] = useState(false);
const [currentEvaluation, setCurrentEvaluation] = useState(null);

const handleShowEditEvaluation = (evaluation) => {
  setCurrentEvaluation(evaluation);
  setShowEditEvaluation(true);
};
const handleCloseEditEvaluation = () => setShowEditEvaluation(false);
const handleCloseshowEditEvaluation = () => setShowEditEvaluation(false);


// const modifierEvaluation = async () => {
//   const token = localStorage.getItem("tokencle");
//   const role = localStorage.getItem("rolecle");
//   if (token && role === 'Admin' && currentEvaluation) {
//     try {
//       const requestData = {
//        titre: evaluationData.titre,
// questions: questions.map(question => ({
//   nom: question.nom.trim(),
//   categorie_id: selectedCategories[question.index][0],
//   reponses: question.reponses.map((reponse, index) => ({
//       reponse: reponse.trim(),
//       niveau: question.niveau[index]
//   }))
// }))
//       };

//       const response = await axios.put(
//         `http://localhost:8000/api/Questionsevaluation/update/${currentEvaluation.id}`,
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Succès!",
//         text: "Évaluation modifiée avec succès!",
//       });
//       fetchEvaluations();
//       handleCloseEditEvaluation();
//     } catch (error) {
//       console.error("Erreur lors de la modification de l'évaluation :", error);
//     }
//   }
// };





// function la recherche


const handleSearchChangeBlok = (event) => {
  setSearchValueBlok(event.target.value);
};

// faire le filtre des maison par addrsse
const filteredEventsBlok = eventsBlok.filter(
  (evaluation) =>
    evaluation &&
    evaluation.titre &&
    evaluation.titre.toLowerCase().includes(searchValueBlok.toLowerCase())
);
const displayEventsBlok = searchValueBlok === "" ? eventsBlok : filteredEventsBlok;


  const [currentPage1, setCurrentPage1] = useState(1);
const  eventsBlokParPage= 5;

// pagination
const indexOfLastEventBlok = currentPage * eventsBlokParPage; // Utiliser currentPage au lieu de currentPage1
const indexOfFirstEventBlok = indexOfLastEventBlok - eventsBlokParPage;
const currentEventsBlok = filteredEventsBlok.slice(
  indexOfFirstEventBlok,
  indexOfLastEventBlok
);

const totalPaginationPages1 = Math.ceil(
  eventsBlok.length / eventsBlokParPage
);

// evaluation block
const [showEventBlok, setShowEventBlok] = useState(false);
const handleCloseEventBlok = () => setShowEventBlok(false);
const handleShowEventBlok = () => setShowEventBlok(true);



// modification 

const [showEditModal, setShowEditModal] = useState(false);
const [editQuestionIndex, setEditQuestionIndex] = useState(null);

const closeEditModal = () => {
  setShowEditModal(false);
  setEditQuestionIndex(null);
  setEvaluationData({ titre: '', questions: [{ nom: '', categorie_id: '', reponses: [] }] });
};


const openEditModal = (evaluationIndex) => {
  const evaluationToEdit = currentEvaluations[evaluationIndex];
  console.log('Evaluation to edit:', evaluationToEdit);
  setEditQuestionIndex(evaluationIndex);

  // Ajout de vérifications pour s'assurer que `questions` et `reponses` existent
  const questions = evaluationToEdit.questions || [];
  const formattedQuestions = questions.map(question => ({
      nom: question?.nom || '',
      categorie_id: question?.categorie_id || '',
      reponses: (question?.reponses || []).map(reponse => ({
          reponse: reponse?.reponse || '',
          niveau: reponse?.niveau || 0
      }))
  }));

  const defaultQuestion = {
      nom: '',
      categorie_id: '',
      reponses: [{ reponse: '', niveau: 0 }]
  };

  setEvaluationData({
      titre: evaluationToEdit.titre || '',
      questions: formattedQuestions.length > 0 ? formattedQuestions : [defaultQuestion]
  });

  setShowEditModal(true);
  console.log(evaluationData,'ev')
};







const handleEdit = async () => {
  const token = localStorage.getItem("tokencle");
  const role = localStorage.getItem("rolecle");

  if (editQuestionIndex === null) return;

  const questionToEdit = questions[editQuestionIndex];
  const updatedQuestion = {
      nom: evaluationData.questions[0].nom.trim(),
      categorie_id: evaluationData.questions[0].categorie_id,
      reponses: evaluationData.questions[0].reponses.map((reponse) => ({
          reponse: reponse.reponse.trim(),
          niveau: reponse.niveau
      }))
  };

  try {
      if (token || role === "Admin") {
          const response = await axios.put(
              `http://localhost:8000/api/entreprise/update/Questions/reponse/evaluation/update/${questionToEdit.index}`,
              updatedQuestion,
              {
                  headers: { Authorization: `Bearer ${token}` },
              }
          );

          setQuestions(prevQuestions =>
              prevQuestions.map(question =>
                  question.index === questionToEdit.index ? { ...question, ...updatedQuestion } : question
              )
          );

          closeEditModal();
      }
  } catch (error) {
      console.error("Erreur lors de la modification de la question:", error);
  }
};
console.log({currentEvaluations: Object.keys(currentEvaluations?.[0] ?? {})},'donneee');
console.log(currentEvaluation, 'currentEvaluation')
console.log(evaluations, 'Evaluation')







  






  return (
    <div className='mt-4'>
      {loading ? (
        <LoadingBox />
         ) : (
     <div className="container">
      <div className="d-flex justify-content-between mt-5">
        <div>
          <Button
            variant="primary"
            onClick={handleShowEvaluation}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter une évaluation
          </Button>
        </div>
        <div>
        <Button
            variant="primary"
            onClick={handleShowEventBlok}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Liste des évaluations archivés
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
                  placeholder="Rechercher une évaluation "
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
        <h3>Liste des evaluations</h3>
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
              Date de création
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
            
                {Object.keys(evaluations).map((key) => (
              <tr key={key}>
              <td>{evaluations[key].evaluation.titre}</td>
              <td >{formatDate(evaluations[key].evaluation.created_at)}</td>
              <td>
                  <Button
                    variant="primary"
                            onClick={() => archiverEvaluation(evaluations[key].evaluation.id)}
                            style={{
                              backgroundColor: "#fff",
                              border: "1px solid #004573",
                              color: "#004573",
                            }}
                            id="buttonArchiver"
                    >
                    {/* <FontAwesomeIcon icon={faFolderOpen} /> */}
                    Archiver
                  </Button>
              </td>
            </tr>
                ))}

                
                {/* {Object.keys(currentEvaluations).map((key) => (
            <tr key={key}>
              <td>{currentEvaluations[key].titre}</td>
              <td>{formatDate(currentEvaluations[key].created_at)}</td>
              <td>
                <button onClick={() => archiverEvaluation(currentEvaluations[key].id)}>
                  Archiver
                </button>
              </td>
            </tr>
          ))} */}
               
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      
       
            

       <Modal show={showEvaluation} onHide={handleCloseEvaluation}>
          <Modal.Header closeButton>
              <Modal.Title>Ajouter une évaluation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <FormGroup>
                      <FormLabel>Titre de l'évaluation:</FormLabel>
                      <FormControl
                          type="text"
                          value={evaluationData.titre}
                          onChange={(e) => setEvaluationData({ ...evaluationData, titre: e.target.value })}
                          required
                      />
                  </FormGroup>

                  <div id="questions-container">
                      {questions.map((question, questionIndex) => (
                          <div className="question mt-2" key={questionIndex}>
                              <FormLabel>Question:</FormLabel>
                              <FormControl
                                  type="text"
                                  value={question.nom}
                                  onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[questionIndex].nom = e.target.value;
                                      setQuestions(updatedQuestions);
                                  }}
                              />
                              <h6 className='m-3'>Choisissez la catégorie</h6>
                              <div className='mb-3 mt-3'>
                                  {categories.map(categorie => (
                                      <div key={categorie.id} style={{ display: "flex", alignItems: "center" }}>
                                          <Form.Check
                                              type="checkbox"
                                              value={categorie.id}
                                              label={categorie.nom}
                                              onChange={() => handleCategorySelect(questionIndex, categorie.id)}
                                              checked={selectedCategories[questionIndex]?.includes(categorie.id)}
                                              disabled={selectedCategories[questionIndex]?.length > 0 && !selectedCategories[questionIndex]?.includes(categorie.id)}
                                          />
                                      </div>
                                  ))}
                              </div>
                              <Button type="button" className="add-response me-2" onClick={() => addResponse(questionIndex)} style={{ backgroundColor: '#004573', border: 'none' }}>
                                  <FontAwesomeIcon icon={faPlus} />
                              </Button>
                              <span>Ajouter une réponse</span>
                              <div className="responses mb-3">
                                  {question.reponses.map((reponse, responseIndex) => (
                                      <div key={responseIndex} className="response-pair">
                                        <Form.Label className='mt-3'>Reponse: </Form.Label>
                                          <FormControl
                                              type="text"
                                              placeholder={`Réponse ${responseIndex + 1}`}
                                              value={reponse}
                                              onChange={(e) => handleResponseChange(questionIndex, responseIndex, e.target.value)}
                                              
                                          />
                                          <Form.Label className='mt-3'>Niveau de la reponse: </Form.Label>
                                          <FormControl
                                              type="number"
                                              value={question.niveau[responseIndex]}
                                              onChange={e => handleNumberChange(questionIndex, responseIndex, e.target.value)}
                                          />
                                      </div>
                                  ))}
                              </div>
                              <Button variant='danger' className="remove-question mb-3" onClick={() => removeQuestion(questionIndex)}>
                                  <FontAwesomeIcon icon={faTrash} />
                              </Button>
                          </div>
                      ))}
                  </div>
                  <Button type="button" id="add-question" onClick={addQuestion} className='me-2' style={{ backgroundColor: '#004573', border: 'none' }}>
                      <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <span>Ajouter une question</span>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={ajouterEvaluation} style={{ backgroundColor: '#004573', border: 'none', width: '130px' }}>
                  Ajouter
              </Button>
              <Button variant="primary" onClick={handleCloseEvaluation} style={{ backgroundColor: '#fff', border: '1px solid #004573', width: '130px', color: '#004573' }}>
                  Fermer
              </Button>
          </Modal.Footer>
      </Modal>

       
      <Modal show={showEventBlok} onHide={handleCloseEventBlok} id="buttonAjouter" size="lg">
          <Modal.Header closeButton>
          
            <Modal.Title>Liste des evaluations archives</Modal.Title>
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
                  placeholder="Rechercher un évaluation archivé"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  value={searchValueBlok}
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
          <div className="mt-4 ms-3  me-3">
        
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
              Date de création
              </th>
              
            </tr>
          </thead>
          <tbody>
            
                {currentEventsBlok &&  currentEventsBlok.map((evaluation) => (
                   <tr key={evaluation.id} >
                   <td>{evaluation.titre} </td>
                   <td>{formatDate(evaluation.created_at)}</td>
                  
                 </tr>
                )

                )
                 
                }
               
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage1}
          totalPaginationPages={totalPaginationPages1}
          setCurrentPage={setCurrentPage1}
        />
      </div>
        
      
        
          </Modal.Body>
          
      </Modal>

        {/*modif */}
        <Modal show={showEditModal} onHide={closeEditModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier l'évaluation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>Titre de l'évaluation:</FormLabel>
                        <FormControl
                            type="text"
                            value={evaluationData.titre}
                            onChange={(e) => setEvaluationData({ ...evaluationData, titre: e.target.value })}
                            required
                        />
                    </FormGroup>

                    <div id="questions-container">
                        {evaluationData.questions.map((question, questionIndex) => (
                            <div className="question mt-2" key={questionIndex}>
                                <FormLabel>Question:</FormLabel>
                                <FormControl
                                    type="text"
                                    value={question.nom}
                                    onChange={(e) => {
                                        const updatedQuestions = [...evaluationData.questions];
                                        updatedQuestions[questionIndex].nom = e.target.value;
                                        setEvaluationData({ ...evaluationData, questions: updatedQuestions });
                                    }}
                                />
                                <h6 className='m-3'>Choisissez la catégorie</h6>
                                <div className='mb-3 mt-3'>
                                    {categories.map(categorie => (
                                        <div key={categorie.id} style={{ display: "flex", alignItems: "center" }}>
                                            <Form.Check
                                                type="checkbox"
                                                value={categorie.id}
                                                label={categorie.nom}
                                                onChange={() => handleCategorySelect(questionIndex, categorie.id)}
                                                checked={question.categorie_id === categorie.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button type="button" className="add-response me-2" onClick={() => addResponse(questionIndex)} style={{ backgroundColor: '#004573', border: 'none' }}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                                <span>Ajouter une réponse</span>
                                <div className="responses mb-3">
                                    {question.reponses.map((reponse, responseIndex) => (
                                        <div key={responseIndex} className="response-pair">
                                            <FormControl
                                                type="text"
                                                placeholder={`Réponse ${responseIndex + 1}`}
                                                value={reponse.reponse}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...evaluationData.questions];
                                                    updatedQuestions[questionIndex].reponses[responseIndex].reponse = e.target.value;
                                                    setEvaluationData({ ...evaluationData, questions: updatedQuestions });
                                                }}
                                                className='mt-3'
                                            />
                                            <Form.Label>Niveau: </Form.Label>
                                            <FormControl
                                                type="number"
                                                value={reponse.niveau}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...evaluationData.questions];
                                                    updatedQuestions[questionIndex].reponses[responseIndex].niveau = e.target.value;
                                                    setEvaluationData({ ...evaluationData, questions: updatedQuestions });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button variant='danger' className="remove-question mb-3" onClick={() => {
                                    const updatedQuestions = [...evaluationData.questions];
                                    updatedQuestions.splice(questionIndex, 1);
                                    setEvaluationData({ ...evaluationData, questions: updatedQuestions });
                                }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button type="button" id="add-question" onClick={() => {
                        const updatedQuestions = [...evaluationData.questions, {
                            nom: '',
                            categorie_id: '',
                            reponses: [{ reponse: '', niveau: 0 }]
                        }];
                        setEvaluationData({ ...evaluationData, questions: updatedQuestions });
                    }} className='me-2' style={{ backgroundColor: '#004573', border: 'none' }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <span>Ajouter une question</span>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleEdit}>Modifier</Button>
            <Button variant="primary" onClick={closeEditModal}>Annuler</Button>
            </Modal.Footer>
        </Modal>
    </div>

    )}
    </div>
  )
}




 


  
 





