import React from 'react'
import './Footer.css';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button, Form, Image } from 'react-bootstrap'
import logo from '../../../Images/logo_2.png';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className='footer_content_main'>
        <section className='footer_content'>
            <div className='logo_footer_content_one'>
                <Image src={logo} />

            </div>
            {/* <div>
                <h5>Adresse</h5>
                <Link to={'/about'} style={{textDecoration:'none', color:'white'}}>Dakar, Sacré Coeur Rue 44</Link>
                <p>Lundi - Vendredi: 8h - 17h</p>
            </div> */}
            <div>
                <h5>Adresse</h5>
                <Link to={'/about'}style={{textDecoration:'none', color:'white'}} >Dakar,Sacré Coeur Rue 44</Link><br />
                <Link to={'/about'} style={{textDecoration:'none', color:'white'}} >Lundi-Vendredi: 8h-17h</Link>
            </div>
            <div>
                <h5>Qui sommes nous ?</h5>
                <Link to={'/about'}style={{textDecoration:'none', color:'white'}} >A propos de nous</Link><br />
                <Link to={'/about'} style={{textDecoration:'none', color:'white'}} >Nos objectifs</Link>
            </div>
            <div>
                <h5>Nous contacter</h5>
                <Link to={'#'} style={{textDecoration:'none', color:'white'}}>77301 72 72 </Link>
                <Link to={'#'} style={{textDecoration:'none', color:'white'}} >contact@barakagate.com</Link>
            </div>
            <div>
                <h5>Sécurité</h5>
                <Link to={'/confidentialite'} style={{textDecoration:'none', color:'white'}}>Politiques de confidentialité</Link><br />
                <Link to={'/conditions'} style={{textDecoration:'none', color:'white'}}>Condition d’utilisation</Link>
            </div>
        </section>
        <div className='footer_ref_home'>
            <hr />
        </div>
        <section className='footer_bottom_home'>
            <div className='copyright_footer_home'>
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
              <Form.Control  type="text" placeholder="Votre email" id='input_searchcontent_footer'/>
              <Button type='submit' id='btn_abonner_footer'>S'abonnez</Button>
            </Form>
          </div>
        </section>
      </footer>
    </div>
  )
}
