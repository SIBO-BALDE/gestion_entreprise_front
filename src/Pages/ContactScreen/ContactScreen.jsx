import React, { useState } from 'react'
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import contact from '../../Images/Image-contact.png'
import './ContactScreen.css';
import map from '../../Images/map-map.png'
import contact1 from '../../Images/imgban/womanban.jpg'
import Underline from '../../Components/User_Components/Underline/Underline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { emailPattern } from "../Regex/Regex";
import Swal from 'sweetalert2'
import axios from 'axios'

export default function ContactScreen() {
  const handleClosemessages = () => setShowMessages(false);
  const handleShowMessages = () => setShowMessages(true);
  const [showMessages, setShowMessages] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  

  // Validation des checksamps
  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    message: "",
  
  });
  
  const [successeds, setSuccesseds] = useState({
    nom: "",
    email: "",
    message: "",
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
    else if (name === "nom") {
      if (!value.trim()) {
        errorMessage = "Le nom est obligatoire";
      } else if (value.trim().length < 2) {
        errorMessage = "Le nom doit contenir au moins 2 lettres";
      } else {
        successMessage = "Le nom est valide";
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
      nom: "",
      email: "",
      message: "",
    
    });

   // function pour ajouter une message
   const ajouterMessage = async () => {
    validateField("nom", nom);
    validateField("email", email);
   
    if (validationStatus) {
      
    try {
        const response = await axios.post(
          "https://api.com.myfeedback360.com/api/contacte/create",

          messageData,
        );

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle maison à la liste existante
          console.log(response, 'response categorie')
          setMessages([...messages, response.data]);
          // Réinitialisez les valeurs du formulaire après avoir ajouté la maison
          setMessageData({
            nom: "",
            email: "",
            message: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "message envoyé avec succée!",
          });
          // Fermez le modal
          handleClosemessages();
         
        } else {
          console.error("Erreur dans lajout de maison");
        }
     
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  }
}



  

  return (
    <div className='' style={{marginTop:'90px'}}>
      <header>
        <NavbarUser />
      </header>
      <main className='mt-3'>
        <Underline text='Contactez nous' />
         <section>
         <div className='form_content_main_contact mt-5 mb-5 '>
            <div className='form_content_right_contact'>
                <Image src={contact1} className='form_content_right_contact_image' />
            </div>
            <div className='form_content_left_contact'>
            <Form >
                <h3 className='text-white'>Contactez-Nous</h3>
                <Form.Group className="mb-3 mt-3 " controlId="exampleForm.ControlInput1" >
                <Form.Label className='inputs_content_contact'>Prénom et nom</Form.Label>
                <Form.Control placeholder='John Doe' 
                value={messageData.nom}
                onChange={(e) =>{
                 setMessageData({...messageData, nom: e.target.value})
                 validateField("nom", e.target.value);
               
                }}
                />
                <p style={{ color: "red" }}>{errors.nom}</p>
                <p style={{ color: "green" }}>{successeds.nom}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" >
                <Form.Label className='inputs_content_contact'>Email</Form.Label>
                <Form.Control placeholder='exemple@gmail.com'
                value={messageData.email}
                 onChange={(e) =>{
                  setMessageData({...messageData, email: e.target.value})
                  validateField("email", e.target.value);
                }}
                />
                <p style={{ color: "red" }}>{errors.email}</p>
                <p style={{ color: "green" }}>{successeds.email}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" >
                <Form.Label className='inputs_content_contact'>Message</Form.Label>
                <Form.Control as="textarea" placeholder="" 
                 value={messageData.message}
                 onChange={(e) =>{
                  setMessageData({...messageData, message: e.target.value})
                 
                }}
                
                />
                
                </Form.Group>
                <Button className='w-100 btn_contact_submit' onClick={ajouterMessage}>Soumettre</Button>
            </Form>
            </div>
         </div>
         </section>
         <div className=" mt-5 separator"></div>
         <section className='content_sectiontwo_main_contact'>
         <div className='mb-5 content_map_main_contact'>
         <div className='mt-5'>
            <div className='d-flex mt-2 '>
            <div className='contact_contact_icon'>
            <FontAwesomeIcon icon={faPhone} id='icon_content_contact' />
            </div>
            <div > 
                <p className='text-white element_context_textcontact'>+221 76 830 68 68</p>
            </div>
            </div>

            <div className='d-flex mt-2 '>
                <div className='contact_contact_icon'>
                <FontAwesomeIcon icon={faWhatsapp} id='icon_content_contact' /> 
                </div>
                <div>
                    <p className='text-white element_context_textcontact'>+221 77 134 64 96</p>
                </div>
            </div>
            <div className='d-flex mt-2 '> 
                <div className='contact_contact_icon'>
                <FontAwesomeIcon icon={faEnvelope} id='icon_content_contact' />
                </div>
                <div>
                    <p className='text-white element_context_textcontact'>service.client@myfeedback360.com</p>
                </div>
            </div>
         </div>
         <div>
            
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe className="gmap_iframe" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" 
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Sacré Coeur Rue 44&amp;
                    t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                  </iframe>
              </div>
              
            </div>
         </div>

         </div>
         </section>

      </main>
      <div className="separator"></div>
      <footer>
        <Footer />
      </footer>



      {/* modal debut  ajouter categorie*/}
      <>
        <Modal
          show={showMessages}
          onHide={handleClosemessages}
          id="buttonAjouter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Categorie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  value={messageData.nom}
                  onChange={(e) => {
                    setMessageData({ ...messageData , nom: e.target.value });
                  
                  }}
                  type="text"
                  placeholder=""
                />
                
              </Form.Group>

              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={ajouterMessage}
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
      {/* modal fin ajouter categorie */}
    </div>
  )
}
