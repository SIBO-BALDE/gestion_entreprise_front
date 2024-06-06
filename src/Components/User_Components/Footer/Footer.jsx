import React, { useState } from 'react'
import './Footer.css';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button, Form, Image } from 'react-bootstrap'
import logo from '../../../Images/Logo_bleu-removebg-preview.png';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { emailPattern } from "../../../Pages/Regex/Regex";

export default function Footer() {

  const [emails, setEmails] = useState([]);
  // etat pour ajout categorie
  const [emailData, setEmailData] = useState({
    email: "",
  
  });

  const ajouterEmail = async (e) => {
    e.preventDefault();

    if(emailData.email === ""){
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "les champs sont  obligatoires!",
      });
      return
    }
    if (!emailPattern.test(emailData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "L'adresse e-mail saisie n'est pas valide!",
      });
      return;
    }
    try {
        const response = await axios.post(
          "http://localhost:8000/api/newsletter/create",

          emailData,
        
        );
        if (response.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "l'email existe dejas!",
          });

          return

        }

        // Vérifiez si la requête a réussi
        if (response.status === 200) {
          // Ajoutez la nouvelle email à la liste existante
          console.log(response, 'response newsletter')
          setEmails([...emails, response.data]);
          
          setEmailData({
            email: "",
           
          });
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "newsletter envoyé avec  succée!",
          });
          setEmails("")
        } else {
          console.error("Erreur dans lajout de email");
        }
     
    } catch (error) {
      // Gestion des erreurs Axios
      console.error("Erreur Axios:", error);
    }
  };



  return (
    <div>
      <footer className='footer_content_main pb-4'>
        <section className='footer_content'>
            <div className='logo_footer_content_one'>
                <Image src={logo} style={{width:'100px', height:'100px'}} />

            </div>
           
            <div>
                <h4>Adresse</h4>
                <Link to={'/about'}style={{textDecoration:'none', color:'white'}} >Dakar,Sacré Coeur Rue 44</Link><br />
                <Link to={'/about'} style={{textDecoration:'none', color:'white'}} >Lundi-Vendredi: 8h-17h</Link>
            </div>
            <div>
                <h4>Qui sommes nous ?</h4>
                <Link to={'/about'}style={{textDecoration:'none', color:'white'}} >A propos de nous</Link><br />
                <Link to={'/about'} style={{textDecoration:'none', color:'white'}} >Nos objectifs</Link>
            </div>
            <div>
                <h4>Nous contacter</h4>
                <Link to={'#'} style={{textDecoration:'none', color:'white'}}>77301 72 72 </Link>
                <Link to={'#'} style={{textDecoration:'none', color:'white'}} >service.client@myfeedbak.com</Link>
            </div>
            <div>
                <h4>Sécurité</h4>
                <Link to={'/confidentialite'} style={{textDecoration:'none', color:'white'}}>Politiques de confidentialité</Link><br />
                <Link to={'/conditions'} style={{textDecoration:'none', color:'white'}}>Condition d’utilisation</Link>
            </div>
        </section>
        <div className='footer_ref_home'>
            <hr />
        </div>
        <section className='footer_bottom_home'>
            <div className='copyright_footer_home mt-4'>
                <p>Copyright  <FontAwesomeIcon icon={regularIcons.faCopyright} /> 2024 BARAKA GATE /
                <Link to={'https://kevacom.com/'}  style={{textDecoration:'none', color:'#FFB703'}}>KEVACOM</Link>
                
                </p>
            </div>
            <div className='icons_footer_home'>
                <Link to={'https://www.linkedin.com/company/barakagate/'} className='icons_footer_home_icon_social'><FontAwesomeIcon icon={faLinkedinIn} className='icon_footer_topbar' /> </Link>
                <Link to={'https://twitter.com/BarakaGate'} className='icons_footer_home_icon_social'><FontAwesomeIcon icon={faTwitter} className='icon_footer_topbar' /></Link>
                <Link to={'https://www.instagram.com/barakagate/'} className='icons_footer_home_icon_social'><FontAwesomeIcon icon={faInstagram} className='icon_footer_topbar' /></Link>
                <Link to={'https://www.facebook.com/BarakaGate'}className='icons_footer_home_icon_social'><FontAwesomeIcon icon={faFacebookF} className='icon_footer_topbar' /></Link>
            </div>
            <div className="section_search">
            <Form action="" className='d-flex '>
              <Form.Control
               value={emailData.email}
               onChange={(e) => {
                 setEmailData({ ...emailData, email: e.target.value });
              
               }} 
              type="text" placeholder="Votre email" 
              id='input_searchcontent_footer'/>
              <Button type='submit' id='btn_abonner_footer' onClick={ajouterEmail}>S'abonnez</Button>
            </Form>
          </div>
        </section>
      </footer>
    </div>
  )
}
