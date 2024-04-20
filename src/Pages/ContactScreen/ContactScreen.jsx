import React from 'react'
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import { Button, Form, Image } from 'react-bootstrap'
import contact from '../../Images/Image-contact.png'
import './ContactScreen.css';
import map from '../../Images/map-map.png'
import Underline from '../../Components/User_Components/Underline/Underline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function ContactScreen() {
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
                <Image src={contact} className='form_content_right_contact_image' />
            </div>
            <div className='form_content_left_contact'>
            <Form>
                <h3 className='text-white'>Contactez-Nous</h3>
                <Form.Group className="mb-3 mt-3 " controlId="exampleForm.ControlInput1" >
                <Form.Label className='inputs_content_contact'>Prénom et nom</Form.Label>
                <Form.Control placeholder='sibo baldé' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" >
                <Form.Label className='inputs_content_contact'>Email</Form.Label>
                <Form.Control placeholder='baldesibo@gmail.com' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" >
                <Form.Label className='inputs_content_contact'>Message</Form.Label>
                <Form.Control as="textarea" placeholder="" />
                </Form.Group>
                <Button className='w-100 btn_contact_submit'>Soumettre</Button>
            </Form>
            </div>
         </div>
         </section>
         <div class=" mt-5 separator"></div>
         <section className='content_sectiontwo_main_contact'>
         <div className='mb-5 content_map_main_contact'>
         <div>
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
                    <p className='text-white element_context_textcontact'>+221 77 301 72 72</p>
                </div>
            </div>
            <div className='d-flex mt-2 '> 
                <div className='contact_contact_icon'>
                <FontAwesomeIcon icon={faEnvelope} id='icon_content_contact' />
                </div>
                <div>
                    <p className='text-white element_context_textcontact'>contact@barakagate.com</p>
                </div>
            </div>
         </div>
         <div>
            
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe className="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Sacré Coeur Rue 44&amp;
                    t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                  </iframe>
                 
              </div>
              
            </div>
         </div>

         </div>
         </section>

      </main>
      <div class="separator"></div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
