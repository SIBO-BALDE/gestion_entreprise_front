import React, { useEffect, useState } from 'react'
import './ContactDevis.css';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { emailPattern } from "../Regex/Regex";
import axios from 'axios';
import Swal from 'sweetalert2';
import imageForm from '../../Images/devis_contact.jpeg'
import { continents, countries, languages } from 'countries-list'
import Underline from '../../Components/User_Components/Underline/Underline'
import Footer from '../../Components/User_Components/Footer/Footer';
import NavbarUser from '../../Components/User_Components/NavbarUser';
import { Link } from 'react-router-dom';

export default function ContactDevis() {

  const [loading, setLoading] = useState(true);
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-8]{3})$/;
  const phoneRegex2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-8]{3})$/;




    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [numeroTelephone, setNumeroTelephone] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [telephoneFixe, setTelephoneFixe] = useState("");
    const [adressEntreprise, setAdressEntreprise] = useState("");
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [poste, setPoste] = useState("");
    const [Abonnement_id, setAbonnement_id] = useState("");



    // recuperer la lsite des pay sur l'api country list
  const [selectedCountry, setSelectedCountry] = useState('');
  const countryOptions = Object.values(countries).map(country => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));
  

  // Validation des checksamps
  const [errors, setErrors] = useState({
      prenom: "",
      nom: "",
      email: "",
      numeroTelephone: "",
      entreprise: "",
      poste: "",
      telephoneFixe: "",
      adressEntreprise: "",
      pays: "",
  
  });
  
  const [successeds, setSuccesseds] = useState({
    prenom: "",
    nom: "",
    email: "",
    numeroTelephone: "",
    entreprise: "",
    poste: "",
    telephoneFixe: "",
    addressEntreprise: "",
    pays: "",
  });
  const [validationStatus, setValidationStatus] = useState(false);

 
  
  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "email") {
        if (!value.trim()) {
            errorMessage = "L'email est obligatoire";
        } else if (!emailPattern.test(value)) {
            errorMessage = "L'email est invalide";
        }
    } else if (name === "nom") {
        if (!value.trim()) {
            errorMessage = "Le nom est obligatoire";
        } else if (value.trim().length < 2) {
            errorMessage = "Le nom doit contenir au moins 2 lettres";
        }
    } else if (name === "prenom") {
        if (!value.trim()) {
            errorMessage = "Le prenom est obligatoire";
        } else if (value.trim().length < 2) {
            errorMessage = "Le prenom doit contenir au moins 2 lettres";
        }
    } else if (name === "entreprise") {
        if (!value.trim()) {
            errorMessage = "L'entreprise est obligatoire";
        } else if (value.trim().length < 2) {
            errorMessage = "L'entreprise doit contenir au moins 2 lettres";
        }
    } else if (name === "poste") {
        if (!value.trim()) {
            errorMessage = "Le poste est obligatoire";
        }
    } else if (name === "numeroTelephone") {
        if (!value.trim()) {
            errorMessage = "Le numéro est obligatoire";
        } else if (value.trim().length < 7) {
            errorMessage = "Minimum 7 chiffres";
        }else if (!/^\d+$/.test(value.trim())) {
          errorMessage = "Chiffres uniquement permis";
        } 
        // } else if (!phoneRegex.test(value)) {
        //     errorMessage = "Le numéro est invalide";
        // }
    } else if (name === "telephoneFixe") {
        if (!value.trim()) {
            errorMessage = "Le numéro est obligatoire";
        } else if (!phoneRegex2.test(value)) {
            errorMessage = "Le numéro est invalide";
        }
    } else if (name === "ville") {
        if (!value.trim()) {
            errorMessage = "La ville est obligatoire";
        }
    } else if (name === "adressEntreprise") {
        if (!value.trim()) {
            errorMessage = "L'adresse de l'entreprise est obligatoire";
        }
    } else if (name === "pays") {
        if (!value.trim()) {
            errorMessage = "Le pays est obligatoire";
        }
    } else if (name === "Abonnement_id") {
        if (!value.trim()) {
            errorMessage = "L'ID de l'abonnement est obligatoire";
        }
    }

    return errorMessage;
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
      telephoneFixe: "",
      adressEntreprise: "",
      pays: "",
      Abonnement_id: "",
    
    });



const ajouterMessage = async (e) => {
  e.preventDefault();

  

  const emptyFields = Object.keys(messageData).filter(key => !messageData[key].trim());
        if (emptyFields.length > 0) {
            Swal.fire({
                icon: "error",
                title: "Erreur de validation",
                text: "Veuillez remplir tous les champs"
            });
            return;
        }



        const fieldsToValidate = [
          { name: "email", value: messageData.email },
          { name: "nom", value: messageData.nom },
          { name: "prenom", value: messageData.prenom },
          { name: "numeroTelephone", value: messageData.numeroTelephone },
          { name: "entreprise", value: messageData.entreprise },
          { name: "poste", value: messageData.poste },
          { name: "telephoneFixe", value: messageData.telephoneFixe },
          { name: "ville", value: messageData.ville },
          { name: "pays", value: messageData.pays },
          { name: "adressEntreprise", value: messageData.adressEntreprise },
          { name: "Abonnement_id", value: messageData.Abonnement_id }
      ];

      for (let field of fieldsToValidate) {
          const error = validateField(field.name, field.value);
          if (error) {
              Swal.fire({
                  icon: "error",
                  title: `Erreur de validation`,
                  text: error
              });
              return;
          }
      }


  // If no validation errors, proceed with the request
  try {
      const response = await axios.post("https://api.myfeedback360.com/api/ContactAbonementC/create", messageData);

      if (response.status === 200) {
          setMessages([...messages, response.data]);
          setMessageData({
              prenom: "",
              nom: "",
              email: "",
              entreprise: "",
              poste: "",
              numeroTelephone: "",
              message: "",
              adressEntreprise: "",
              ville: "",
              pays: "",
              telephoneFixe: "",
              Abonnement_id: "",
          });
          Swal.fire({
              icon: "success",
              title: "Succès!",
              text: "Message envoyé avec succès!",
          });
      } else {
          console.error("Erreur dans l'ajout de l'abonnement");
      }
  } catch (error) {
      console.error("Erreur Axios:", error);
  }
};


const [abonnement, setAbonnement] = useState([]);
const fetchAbonnement = async () => {
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");
  try {
    
      const response = await axios.get(
        "https://api.myfeedback360.com/api/listes/abonements",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAbonnement(response.data.Abonnements);
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

  return (
    <div>
      {/* <NavbarUser/> */}

    <div  style={{backgroundColor:'#004573',padding:'20px'}} className='content-devis-main-one-contnt' id='content-devis-main-one-contnt'>
     
    <Underline text="Pour plus d'information remplissez ce formulaire" color='#fff' />
      <div className='content_devis_main container'>
      <div className='content_devis_main-form-one' style={{backgroundColor:'#FFF',paddingLeft:'10px' ,paddingRight:'10px', width:'100%' ,height:'645px', paddingTop:'27px',borderBottom:'7px solid #FFB703', borderBottomLeftRadius:'10px' , borderTopLeftRadius:'10px'}} >
        <Form onSubmit={ajouterMessage}>
          
          <Row>
            <Col>
              <Form.Group controlId="prenom">
                <Form.Label className='' style={{color:'#004573'}}>Prenom<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
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
                <Form.Label className='' style={{color:'#004573'}}>Nom<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
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
            <Col>
              <Form.Group controlId="email">
                <Form.Label className='' style={{color:'#004573'}}>Email<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
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
          </Row>
          <Row>
            
            <Col>
              <Form.Group controlId="addressEntreprise">
                <Form.Label className='' style={{color:'#004573'}}>Addresse<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
                  type="text"
                  value={messageData.adressEntreprise}
                  onChange={(e) => {
                    setMessageData({ ...messageData, adressEntreprise: e.target.value });
                    validateField("adressEntreprise", e.target.value);
                  }}
                />
                <Form.Text style={{ color: "red" }}>{errors.adressEntreprise}</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="numeroTelephone">
                <Form.Label className='' style={{color:'#004573'}}>Télephone<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
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
            <Col>
              <Form.Group controlId="poste">
                <Form.Label className='' style={{color:'#004573'}}>Fixe:</Form.Label>
                <Form.Control
                 style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
                  value={messageData.telephoneFixe}
                  onChange={(e) => {
                    setMessageData({ ...messageData, telephoneFixe: e.target.value });
                    validateField("telephoneFixe", e.target.value);
                  }}
                >
                  
                </Form.Control>
                <Form.Text style={{ color: "red" }}>{errors.telephoneFixe}</Form.Text>
              </Form.Group>
            </Col>
            
          </Row>
          
          <Row>
            <Col>
              <Form.Group controlId="entreprise">
                <Form.Label className='' style={{color:'#004573'}}>Entreprise<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
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
                <Form.Label className='' style={{color:'#004573'}}>Poste<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
               
                  as="select"
                  value={messageData.poste}
                  onChange={(e) => {
                    setMessageData({ ...messageData, poste: e.target.value });
                    validateField("poste", e.target.value);
                  }}
                >
                  <option value="">Sélectionnez un poste<span style={{color:'red'}}>*</span></option>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                  <Form.Label className='' style={{color:'#004573'}}>Pays<span style={{color:'red'}}>*</span></Form.Label>
                  <Form.Control
                  style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
                    as="select"
                    value={messageData.pays}
                      onChange={(e) => {
                        setMessageData({
                          ...messageData,
                          pays: e.target.value,
                        });
                        
                      }}
                  >
                    <option value="">Sélectionnez un pays<span style={{color:'red'}}>*</span>:</option>
                    {countryOptions}
                  </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="poste">
                <Form.Label className=''style={{color:'#004573'}}>Ville<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                 style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
                  value={messageData.ville}
                  onChange={(e) => {
                    setMessageData({ ...messageData, ville: e.target.value });
                    validateField("ville", e.target.value);
                  }}
                >
                  
                </Form.Control>
                <Form.Text style={{ color: "red" }}>{errors.ville}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* cc */}
            <Col>
              <Form.Group controlId="poste">
                <Form.Label className='' style={{color:'#004573'}}>Type d'abonnement<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Select
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
                    aria-label="Default select example"
                    value={messageData.Abonnement_id}
                    onChange={(e) => {
                      setMessageData({
                        ...messageData,
                        Abonnement_id: e.target.value,
                      });
                      
                    }}
                  >
                    <option className='text-white'>Choisir une abonnement<span style={{color:'red'}}>*</span>:</option>
                    {abonnement &&
                      abonnement.map((abonel, index) => {
                        return (
                          <option key={index} value={abonel.id}>
                            {abonel.formule}
                          </option>
                        );
                      })}
                  </Form.Select>
                
                <Form.Text style={{ color: "red" }}>{errors.abonnement_id}</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="message">
                <Form.Label style={{color:'#004573'}}>Message:</Form.Label>
                <Form.Control
                style={{backgroundColor:'#FFF', borderBottom: '2px solid #004573',marginBottom:'10px'}}
                  as="textarea"
                  rows={3}
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
          <Button type="submit" className='content_title_devis_button_content mt-3' onClick={ajouterMessage}>Demande d'abonnement:</Button>
        </Form>
      </div>
      <div className='imageForm-content-devis-one' style={{width:'100%' ,height:'645px',borderBottom:'7px solid #FFB703', borderBottomRightRadius:'10px'}} id='imageForm-content-devis-one'>
        <Link to={'/'}><Image src={imageForm} className='imageForm-content-devis'style={{borderTopRightRadius:'10px'}} id='imageForm-content-devis' /></Link>
        
      </div>

      </div>
      <footer><Footer/> </footer>   
    </div>
    </div>
  )
}
