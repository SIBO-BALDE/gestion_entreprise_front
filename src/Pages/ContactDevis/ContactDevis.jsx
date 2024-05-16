import React, { useState } from 'react'
import './ContactDevis.css';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { emailPattern } from "../Regex/Regex";
import axios from 'axios';
import Swal from 'sweetalert2';
import imageForm from '../../Images/cc.jpg'

export default function ContactDevis() {
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/



    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [poste, setPoste] = useState("");
  

  // Validation des checksamps
  const [errors, setErrors] = useState({
    prenom: "",
      nom: "",
      email: "",
      numeroTelephone: "",
      entreprise: "",
      poste: "",
  
  });
  
  const [successeds, setSuccesseds] = useState({
    prenom: "",
      nom: "",
      email: "",
      numeroTelephone: "",
      entreprise: "",
      poste: "",
  });
  const [validationStatus, setValidationStatus] = useState(false);

  // function validation
  const validateField = (name, value) => {
    let errorMessage = "";
    let successMessage = "";
  
    if (name === "email") {
      if (!value.trim()) {
        errorMessage = "L'email est obligatoire";
      } else if (!emailPattern.test(value)) {
        errorMessage = "L'email  invalide";
      } else {
        successMessage = "L'adresse est valide";
      }
    }
    if (name === "nom") {
      if (!value.trim()) {
        errorMessage = "Le nom est obligatoire";
      } else if (value.trim().length < 2) {
        errorMessage = "Le nom doit contenir au moins 2 lettres";
      } else {
        successMessage = "Le nom est valide";
      }
    }
    if (name === "prenom") {
      if (!value.trim()) {
        errorMessage = "Le prenom est obligatoire";
      } else if (value.trim().length < 2) {
        errorMessage = "Le prenom doit contenir au moins 2 lettres";
      } else {
        successMessage = "Le prenom est valide";
      }
    }
    if (name === "entreprise") {
      if (!value.trim()) {
        errorMessage = "L'entreprise est obligatoire";
      } else if (value.trim().length < 2) {
        errorMessage = "L'entreprise doit contenir au moins 2 lettres";
      } else {
        successMessage = "L'entreprise  valide";
      }
    }
    if (name === "poste") {
      if (!value.trim()) {
        errorMessage = "Le poste est obligatoire";
      } 
       else {
        successMessage = "L'entreprise  valide";
      }
    }
    if (name === "numeroTelephone") {
        if (!value.trim()) {
          errorMessage = "numero est obligatoire";
        } else if (!phoneRegex.test(value)) {
          errorMessage = "numero  invalide";
        } else {
          successMessage = "numero  valide";
        }
      }
    
    
  
  
  
    // Mettez à jour le state en utilisant le nom du champ actuel
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    setSuccesseds((prevSuccess) => ({
      ...prevSuccess,
      [name]: successMessage,
    }));
  
    const isValid = Object.values(errors).every((error) => !error);
    setValidationStatus(isValid);
  };

 
   // tableau ou stocker la liste des messages
   const [messages, setMessages] = useState([]);
    // etat pour ajout categorie
    const [messageData, setMessageData] = useState({
      prenom: "",
      nom: "",
      email: "",
      numeroTelephone: "",
      entreprise: "",
      poste: "",
      message: "",
    
    });


// function pour ajouter une message
const ajouterMessage = async (e) => {
    e.preventDefault()
    
   

    validateField("nom", prenom);
    validateField("nom", nom);
    validateField("numeroTelepnone", numeroTelephone);
    validateField("entreprise", entreprise);
    validateField("poste", poste);
    
   


    if (validationStatus) {
      
    try {
        const response = await axios.post(
          "http://localhost:8000/api/ContactAbonementC/create",

          messageData,
        );

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle maison à la liste existante
          console.log(response, 'response abonnement')
          setMessages([...messages, response.data]);
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setMessageData({
            prenom: "",
            nom: "",
            email: "",
            entreprise: "",
            poste: "",
            numeroTelepnone: "",
            message: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "message envoyé avec succée!",
          });
          
         
        } else {
          console.error("Erreur dans lajout de abonnement");
        }
     
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  }
}


  return (
    // <div className='d-flex'>
    //   <div>hello</h1></div>
    //     <div className="container_devis_form">
    //     <form action="#" >
    //         <h2 className='content_title_devis'>Pour plus d'information remplissez ce formulaire</h2>

            

    //         <div className='d-flex justify-around'>
    //         <div className="input-group">
    //             <label >Prenom:</label>
    //             <input type="text" id="name" name="name" required 
    //             value={messageData.prenom}
    //             onChange={(e) =>{
    //              setMessageData({...messageData, prenom: e.target.value})
    //              validateField("prenom", e.target.value);
               
    //             }}
    //             />
    //             <p style={{ color: "red" }}>{errors.prenom}</p>
    //             <p style={{ color: "green" }}>{successeds.prenom}</p>
    //         </div>
    //         <div className="input-group">
    //             <label >Nom:</label>
    //             <input type="text" id="text" name="text" required 
    //             value={messageData.nom}
    //             onChange={(e) =>{
    //              setMessageData({...messageData, nom: e.target.value})
    //              validateField("nom", e.target.value);
               
    //             }}
    //             />
    //             <p style={{ color: "red" }}>{errors.nom}</p>
    //             <p style={{ color: "green" }}>{successeds.nom}</p>
                
    //         </div>
    //         </div>

    //         <div className='d-flex justify-around'>
    //         <div className="input-group">
    //             <label >Email:</label>
    //             <input type="email" id="email" name="email" required

    //             value={messageData.email}
    //             onChange={(e) =>{
    //              setMessageData({...messageData, email: e.target.value})
    //              validateField("email", e.target.value);
               
    //             }}
    //             />
    //             <p style={{ color: "red" }}>{errors.email}</p>
    //             <p style={{ color: "green" }}>{successeds.email}</p>
    //         </div>
    //         <div className="input-group">
    //             <label >Télephone:</label>
    //             <input type="text" id="tel" name="tel" required 
    //                 value={messageData.numeroTelephone}
    //                 onChange={(e) =>{
    //                 setMessageData({...messageData, numeroTelephone: e.target.value})
    //                 validateField("numeroTelephone", e.target.value);

    //                 }}
    //                 />
    //                 <p style={{ color: "red" }}>{errors.numeroTelephone}</p>
    //                 <p style={{ color: "green" }}>{successeds.numeroTelephone}</p>

    //         </div>

    //         </div>
    //         <div className='d-flex justify-around'>
    //         <div className="input-group">
    //             <label >Entreprise:</label>
    //             <input type="text" id="text" name="text" required
    //             value={messageData.entreprise}
    //             onChange={(e) =>{
    //             setMessageData({...messageData, entreprise: e.target.value})
    //             validateField("entreprise", e.target.value);

    //             }}
    //             />
    //             <p style={{ color: "red" }}>{errors.entreprise}</p>
    //             <p style={{ color: "green" }}>{successeds.entreprise}</p> 

                
    //         </div>
    //         <div className="input-group d-flex flex-column">
    //           <div>
    //             <label >Poste:</label>
    //           </div>
    //           <div>
    //               <select id="poste" name="poste" className="form-control" required 
    //                   value={messageData.poste}
    //                   onChange={(e) => {
    //                       setMessageData({...messageData, poste: e.target.value});
    //                       validateField("poste", e.target.value);
    //                   }}
    //                   // style={{height:'38px',width:'100%'}}
    //               >
    //                   <option value="">poste</option>
    //                   <option value="Poste 1">Directeur</option>
    //                   <option value="Poste 2">Comptable</option>
    //                   <option value="Poste 3">Commercial</option>
    //                   {/* Ajoutez autant d'options que nécessaire */}
    //               </select>
    //           </div>

    //         {/* <p style={{ color: "red" }}>{errors.poste}</p>
    //         <p style={{ color: "green" }}>{successeds.poste}</p> */}
    //         </div>
    //         </div>

            

    //         <div className="input-group">
    //             <label >Message:</label>
    //             <textarea id="message" name="message" rows="5" required
    //             value={messageData.message}
    //             onChange={(e) =>{
    //             setMessageData({...messageData, message: e.target.value})
    //             validateField("message", e.target.value);

    //             }}
                
    //             ></textarea>
    //         </div>
    //         <Button type="submit" className='content_title_devis_button_content' onClick={ajouterMessage}>Demander devis</Button>
    //     </form>
    //     </div>
      
    // </div>
    <div className='d-flex container' style={{gap:'20px'}}>
      
      <div className="container_devis_form">
        <Form onSubmit={ajouterMessage}>
          <h2 className='content_title_devis'>Pour plus d'information remplissez ce formulaire</h2>
          <Row>
            <Col>
              <Form.Group controlId="prenom">
                <Form.Label>Prenom:</Form.Label>
                <Form.Control
                  type="text"
                  value={messageData.prenom}
                  onChange={(e) => {
                    setMessageData({ ...messageData, prenom: e.target.value });
                    validateField("prenom", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.prenom}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="nom">
                <Form.Label>Nom:</Form.Label>
                <Form.Control
                  type="text"
                  value={messageData.nom}
                  onChange={(e) => {
                    setMessageData({ ...messageData, nom: e.target.value });
                    validateField("nom", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.nom}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={messageData.email}
                  onChange={(e) => {
                    setMessageData({ ...messageData, email: e.target.value });
                    validateField("email", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="numeroTelephone">
                <Form.Label>Télephone:</Form.Label>
                <Form.Control
                  type="text"
                  value={messageData.numeroTelephone}
                  onChange={(e) => {
                    setMessageData({ ...messageData, numeroTelephone: e.target.value });
                    validateField("numeroTelephone", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.numeroTelephone}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="entreprise">
                <Form.Label>Entreprise:</Form.Label>
                <Form.Control
                  type="text"
                  value={messageData.entreprise}
                  onChange={(e) => {
                    setMessageData({ ...messageData, entreprise: e.target.value });
                    validateField("entreprise", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.entreprise}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="poste">
                <Form.Label>Poste:</Form.Label>
                <Form.Control
                  as="select"
                  value={messageData.poste}
                  onChange={(e) => {
                    setMessageData({ ...messageData, poste: e.target.value });
                    validateField("poste", e.target.value);
                  }}
                >
                  <option value="">Sélectionnez un poste</option>
                  <option value="Directeur">Directeur</option>
                  <option value="Comptable">Comptable</option>
                  <option value="Commercial">Commercial</option>
                </Form.Control>
                <Form.Text style={{ color: "red" }}>{errors.poste}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="message">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={messageData.message}
                  onChange={(e) => {
                    setMessageData({ ...messageData, message: e.target.value });
                    validateField("message", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.message}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className='content_title_devis_button_content mt-3' onClick={ajouterMessage}>Demander devis</Button>
        </Form>
      </div>
      <div className='' style={{width:'700px' ,height:'700px'}}>
        
        <Image src={imageForm} className='' style={{width:'100%', heigh:'100%'}} />
      </div>
    </div>
  )
}
