


import {
  faBuilding,
  faCalendarDay,
  faComment,
  faEnvelope,
    faEye,
    faLandMineOn,
    faLocation,
    faMagnifyingGlass,
    faMessage,
    faPenToSquare,
    faPhone,
    faTrash,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { Button, Form, Modal } from "react-bootstrap";
  import React, { useEffect, useState } from "react";
  // import axios from "axios";
  import './GestionDevis.css';
  import Swal from "sweetalert2";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import Pagination from "../../../Components/User_Components/Pagination/Pagination";
import LoadingBox from "../../../Components/LoadingBox/LoadingBox";
  
  
  
  export default function GestionDevis() {
    const [loading, setLoading] = useState(true);
  
  
    const [messages, setMessages] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);


    
     //  Lister les message
     const handleCloseShow = () => setShow(false);
    //  const handleShow = () => setShow(true);

    const handleShow = (message)=>{
      setSelectedMessage(message);
      setShow(true);
      console.log(message, 'id message')
      console.log(selectedMessage, 'selectmessage')
    };
    
  
    useEffect(() => {
      const fetchMessage= async () => {
        const role = localStorage.getItem("rolecle");
        const token = localStorage.getItem("tokencle");
        try {
          if (token || role === "Admin") {
            const response = await axios.get(
              "https://api.myfeedback360.com/api/ContactAbonementCs",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response, 'responmessage C')
            const tab=response.data.categories
            console.log(tab, 'tab message')
            setMessages(response.data.categories);
            setLoading(false)
            console.log(messages, 'messages apres abonment');
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories:", error);
        }
      };
      fetchMessage();
    }, []);
  
//     // Function pour supprimer une catégorie
    const supprimerMessage = async (id) => {
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
        if (token || role === "Admin"){
          const response = await axios.delete(
            `https://api.myfeedback360.com/api/ContactAbonements/${id}/soft-delete`,
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
                      text: "message supprimer avec succès!",
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
  
  
//          //  pour le champ recherche
         const [searchValue, setSearchValue] = useState("");
    // function la recherche
  const handleSearchChange = (nom) => {
    setSearchValue(nom.target.value);
  };
  
//   // faire le filtre des maison par addrsse
  const filteredMessage = messages.filter(
    (messageel) =>
      messageel &&
      messageel.nom &&
      messageel.nom.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayMessages= searchValue === "" ? messages : filteredMessage;
  
  
    const [currentPage, setCurrentPage] = useState(1);
  const  messageParPage= 5;
  
  // pagination
  const indexOfLastMessage = currentPage* messageParPage;
  const indexOfFirstMessage = indexOfLastMessage -  messageParPage;
  const currentMessages = filteredMessage.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  
  const totalPaginationPages = Math.ceil(messages.length /  messageParPage);
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  
    
   
    
  
   
  
  
    return (
      <div className="m-4">
         {loading ? (
        <LoadingBox />
         ) : (
      <div className="container">
        <div className="d-flex justify-content-between mt-5 content-input-global-projet">
          <div>
           
          </div>
          <div className="flex-grow-1 d-flex justify-content-end content-input-global-projet2 ">
            <div className="champsRecherche mt-2 mb-3 w-50">
              <Form>
                <div
                  className="input-group flex-nowrap "
                  style={{ borderColor: "#004573" }}
                >
                  <Form.Control
                    type="search"
                    className="form-control w-50   "
                    placeholder="Rechercher une demande d'abonnement"
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
        <div className="mt-4 ms-3  me-3 table-responsive">
          <h3>Liste des demandes d'abonnements</h3>
          <table className="table border  border-1">
            <thead
              className=""
              id="hearder-color"
              style={{ backgroundColor: "#004573" }}>
              <tr>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Nom Prénom</th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Email</th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Téléphone</th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Fixe</th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Entreprise </th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Poste</th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Pays</th>
                <th style={{ backgroundColor: "#004573", color: "#fff" }}>Ville</th>
                
                
                <th className="d-flex  justify-content-center "style={{backgroundColor: "#004573",color: "#fff",marginLeft: "3rem", }}>Action</th>
              </tr>
            </thead>
            <tbody>
                {currentMessages.map((messageel) => (
                <tr key={messageel.id}>
                  <td>{messageel.nom} {messageel.prenom} </td>
                  <td>{messageel.email}</td>
                  <td>{messageel.numeroTelephone}</td>
                  <td>{messageel.telephoneFixe}</td>
                  <td>{messageel.entreprise}</td>
                  <td>{messageel.poste}</td>
                  <td>{messageel.pays}</td>
                  <td>{messageel.ville}</td>
                  {/* <td></td> */}
                  {/* <td>{messageel.poste}</td> */}
                  <td className="d-flex justify-content-evenly" id="btn-listes">
                    <Button
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
                     
                      onClick={() => handleShow(messageel)}
                    >
                        <FontAwesomeIcon icon={faEye} />
                      
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
  
    {/* detail */}

    {/* <Modal
        show={show}
        onHide={handleCloseShow}
        id="buttonModifier"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // onClick={modifierUser}
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
            onClick={handleCloseShow}
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
      </Modal> */}

    <Modal show={show} onHide={handleCloseShow} id="buttonModifier" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Details du demande d'abonnement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedMessage && (
          <div className="col-xl-6 col-lg-7 col-md-12">
              
            <div className=" profile-header">
              <div className="">
                
                <div className="  devi-content-main-detail">
                  <div className="col-lg-4 col-md-4 col-12  CONTENT2">
                    <div className="profile-image float-md-right d-flex justify-content-center  
                    align-content-center align-items-center" style={{width:'150px',
                    height:'150px',
                    borderRadius:'50%',
                    border:'3px solid #004573',}}>
                      
                      <FontAwesomeIcon icon={faMessage}  style={{width:'100px',
                        height:'100px', color:'#004573'}}/>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12 lg  CONTENT1" >
                    
                    <div className="card p-3" style={{borderRight:'5px solid #004573'}}>
                    <div className="two_content_detail">
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faUser} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.prenom} { selectedMessage && selectedMessage.nom} </strong>
                    </h6>
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faEnvelope} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.email} </strong>
                    </h6>

                    </div>
                    <div className="two_content_detail">
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faPhone} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.numeroTelephone} </strong>
                    </h6>
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faPhone} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.telephoneFixe} </strong>
                    </h6>

                    </div>

                    <div className="two_content_detail">
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faBuilding} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.entreprise} </strong>
                    </h6>
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faLandMineOn} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.pays} </strong>
                    </h6>

                    </div>
                    <div className="two_content_detail">
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faBuilding} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.ville} </strong>
                    </h6>
                    <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faLocation} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.adressEntreprise} </strong>
                    </h6>

                    </div>

                   <div className="two_content_detail">
                     <h6 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faUser} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{ selectedMessage && selectedMessage.poste} </strong>
                    </h6>
                    <h6 className="m-t-0 m-b-0 mt-2">
                    <span><FontAwesomeIcon icon={faCalendarDay} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{formatDate( selectedMessage && selectedMessage.created_at)} </strong>
                    </h6>

                   </div>
                    <h6 className="m-t-0 m-b-0 mt-2">
                    <span><FontAwesomeIcon icon={faCalendarDay} style={{color:'#004573',marginRight:'10px'}} /> </span>
                      <strong>{selectedMessage && selectedMessage.abonnement.formule} </strong>
                    </h6>

                    </div>
                    <p>Message:</p>
                      <div className="card" style={{borderRight:'5px solid #004573'}}>
                      <p className=" mt-2">
                          <span style={{color:'#004573',marginRight:'10px', fontSize:'25px'}}>
                          {/* <FontAwesomeIcon icon={faComment} /> */}
                            </span>
                          { selectedMessage && selectedMessage.message}
                      </p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      
    </Modal>

      </div>
      )}

      </div>
    );
  }
  
  
  
  