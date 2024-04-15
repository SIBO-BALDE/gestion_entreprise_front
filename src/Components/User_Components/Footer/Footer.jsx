import React from 'react'
import './Footer.css';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button, Form, Image } from 'react-bootstrap'
import logo from '../../../Images/logo.png';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <div>
      <footer className='footer_content_main'>
        <section className='footer_content'>
            <div>
                <Image src={logo} />

            </div>
            <div>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
            </div>
            <div>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
            </div>
            <div>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
            </div>
            <div>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
                <p>Exemplaire</p>
            </div>
        </section>
        <div className='footer_ref_home'>
            <hr />
        </div>
        <div className='footer_bottom_home'>
            <div className='copyright_footer_home'>
                <p>Copyright  <FontAwesomeIcon icon={regularIcons.faCopyright} /> 2024 BARAKA GATE</p>
            </div>
            <div className='icons_footer_home'>
                <div><FontAwesomeIcon icon={faLinkedinIn} className='icon_footer_topbar' /> </div>
                <div><FontAwesomeIcon icon={faTwitter} className='icon_footer_topbar' /></div>
                <div><FontAwesomeIcon icon={faInstagram} className='icon_footer_topbar' /></div>
                <div><FontAwesomeIcon icon={faFacebookF} className='icon_footer_topbar' /></div>
            </div>
            <div className="section_search">
            <Form action="" className='d-flex'>
              <Form.Control  type="text" placeholder="Votre email" 
              
               id='input_searchcontent_footer'/>
              <Button type='submit' id='btn_abonner_footer'>S'abonnez</Button>
            </Form>
          </div>
        </div>
      </footer>
    </div>
  )
}
