import React from 'react'
import './AboutScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import ButtonDeco from '../../Components/User_Components/Buttons/ButtonDeco'
import ben from '../../Images/Ben.png';
import image1 from '../../Images/image 1.png'
import image2 from '../../Images/image 2.png';
import image3 from '../../Images/image 3.png';
import ban_about from '../../Images/ban_apropos.jpg';
import { Image } from 'react-bootstrap';
import Underline from '../../Components/User_Components/Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { faComments, faFileVideo, faHandshake } from '@fortawesome/free-regular-svg-icons';
import ev1 from '../../Images/Ev-4 1.png';
import ev2 from '../../Images/Ev-5 1.png';
import ev3 from '../../Images/Ev-6 1.png';
import formateur1 from '../../Images/image 50.png';
import formateur2 from '../../Images/image 51.png';
import formateur3 from '../../Images/image 52.png';
import partenaire1 from '../../Images/1.png';
import partenaire2 from '../../Images/10.png';
import partenaire3 from '../../Images/0.png';
import partenaire4 from '../../Images/casa.png';
import partenaire5 from '../../Images/3fpt.png';
import partenaire6 from '../../Images/13.png';

export default function AboutScreen() {
  return (
    <div>
      
      <header>
      <NavbarUser />
      </header>

      <main>
        {/**************************** Banniere debut ****************************/}
       <div className=' w-100 ban_about_about_one'>
        <Image  src={ban_about} id='ban_about_about_one1' />
       </div>
       <div className='ban_about_about_one2' style={{marginLeft:'350px', lineHeight:'120px'}}>
        <h1 className='text-white text-center '>
            <strong style={{color:'#004573'}}>BARAKA </strong>
            <strong className='text-center' style={{color:'#FFB703'}}>GATE </strong>
               INCARNE  <br />LE MIRACLE ET L'ABONDANCE
        </h1>
        
       </div>
       {/**************************** Banniere fin ****************************/}

      {/**************************** Comment sa marche debut ****************************/}
      <section style={{backgroundColor:'#004573', paddingBottom:'60px',paddingTop:'20px'}}>
        <Underline  text='Comment ça marche ?' color='white'/>

      <div className='bann_about_aboutscreen mt-5'>
        <div className='ban_left_content_about'>
        <h3 className='ms-5' style={{marginTop:'50px', color:'#FFB703'}}>On vous explique   comment sa marche</h3>
                <p className='ms-5 text-white '>BARAKA GATE vous propose de répondre 
                    au besoin croissant d'accompagnement 
                    et de soutien pour les entreprise. 
                    La plateforme souhaite démocratiser
                     l'accès à l’évaluation en ligne en fournissant 
                    une source fiable d'informations pour aider
                     les utilisateurs à concrétiser leur projet
                      d’évaluation avec succès.
                     </p>
                     <div>
                        <div className='d-flex ms-5 '>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703'}}> Organisation d’une session d’évaluation</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703'}}> Des ressources en ligne gratuits</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703'}}> Des ressources en ligne gratuits</p></div>
                        </div>
                     </div>
        </div>
        <div className='ban_right_content_about'>
            <div>
            <div className='ban_right_image_about_content1 mb-3'><Image src={image1} className='ban_right_image_about1' /></div>
            <div className='ban_right_image_about_content1'><Image src={image2} className='ban_right_image_about1' /></div>

            </div>
            <div>
                <div className='ban_right_image_about_content2 mb-3'><Image src={image3} className='ban_right_image_about2' /></div>
                <div className='ban_right_image_about_content2'><Image src={image1} className='ban_right_image_about2' /></div>
            </div>
        </div>
      </div>
      </section>
      {/****************************comment sa marche fin****************************/}

     
      {/**************************** Nos objectifs  debut****************************/}
      <section>
        <Underline text='Nos objectifs' />
        <div className='objectif_content_flex'>
          <div>
            <div className='top_content_first_objectif'>
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <div className='content_flex_midle_el'>
                <div className='content_flex_midle_el_first'>
                    <FontAwesomeIcon icon={faFileVideo} />
                </div>
                <div className='content_main_midle_about3'>
                    <div className='content_midle_about3'>
                        <FontAwesomeIcon icon={faComments} className='icon_comment_figure' />
                    </div>
                </div>
                <div className='content_flex_midle_el_thirth'>
                    <FontAwesomeIcon icon={faSignsPost} />
                </div>
            </div>
            <div className='bottom_content_last_objectif'>
            <FontAwesomeIcon icon={faHandshake} />
            </div>
          </div>
          <div>
            <div className="text-container">
                <h1 style={{color:'#004573', marginBottom:'30px'}} className='text_design_header'>4 BONNES RAISON DE NOUS <br />
                FAIRE CONFIANCE</h1>
            </div>
            <div>
                <div className='d-flex'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 content_numero_object1'> 1</h4>
                    </div>
                    <div>
                        <p>Notre mission est de fournir aux entreprises du monde entier <br />
                           les outils et lesressources nécessairespour optimiser la <br />
                            performance de leurs équipes.Nous nous engageons à offrir <br />
                             une plateforme en ligne conviviale et innovante qui permet <br />
                             à chaque</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 content_numero_object1'> 2</h4>
                    </div>
                    <div>
                        <p>Le plateforme vise à inspirer, informer et guider les <br />
                            pour qu'ils puissent réaliser leurs souhaits d’évalution <br />
                            facile à leur employés. <br />
                             </p>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 content_numero_object1'> 3</h4>
                    </div>
                    <div>
                        <p>Le principal objectif est d'aider les entreprises en simplifiant  <br />
                        l'organisation des sessions d'évaluation de leur équipe, afin <br />
                            performance de leurs équipes.Nous nous engageons à offrir <br />
                            souci de clarté, de logique et de professionnalisme accrus.</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 content_numero_object1'> 4</h4>
                    </div>
                    <div>
                        <p><strong style={{color:'#004573'}} className='baraka_content'>BARAKA </strong>
                        <strong style={{color:'#FFB703'}} className='gate_content'>GATE  </strong> 
                           offre une gamme complète de ressources  <br />
                            essentielles pour faciliter la planification, l'analyse, la gestion  <br />
                            des évaluations</p>
                    </div>
                </div>
                
            </div>
          </div>
        </div>
      </section>
       {/**************************** Nos objectifs  fin****************************/}

       {/**************************** Recontre avec nos expert debut****************************/}
       <div class="separator"></div>
        <section className='conten_separateur'>
            <Underline text='Nos differents évenements organisé' color='white' />
            <div className='content_images_top_ev_flex'>
                <div className='content_content_formateur'>
                <Image src={ev1} className='content_content_formateur_image' />
                </div>
                <div className='content_content_formateur'>
                <Image src={ev2} className='content_content_formateur_image'/>
                </div>
                <div className='content_content_formateur'>
                <Image src={ev3}  className='content_content_formateur_image'/>
                </div>
            </div>
            <div className='content_images_under_ev'>
                <h5 className='text-center'>Nos differents sessions d’évaluation</h5>
            </div>
            <div className='d-flex justify-content-center mt-3 mb-5 '>
            <div style={{backgroundColor:'#7796ab', display:'flex', justifyContent:'center', padding:'20px'}}>
                <div className='bg-white p-4'>
                    <p>Lorem Ipsum is simply dummy text of the printing and <br /> 
                        typesetting industry. Lorem Ipsum has been the industry's <br /> 
                        standard dummy text ever since the 1500s, when an unknown<br /> 
                        printer took a galley of type and scrambled it to make a <br /> 
                        type specimen book. It has survived not only five centuries,<br /> 
                            but also the leap into scrambled it to make a type specimen book.<br />  
                            It has survived not only five centuries, but also the leap into. <br /> 
                    </p>
                </div>
            </div>
            </div>

            {/* deuxieme partie */}
            <div className='content_images_top_ev_flex'>
                <div className='content_content_formateur'>
                <Image src={formateur1}  className='content_content_formateur_image'/>
                </div>
                <div className='content_content_formateur'>
                <Image src={formateur2} className='content_content_formateur_image'/>
                </div>
                <div className='content_content_formateur'>
                <Image src={formateur3}  className='content_content_formateur_image'/>
                </div>
            </div>
            <div className='content_images_under_ev'>
                <h5 className='text-center'>Nos differents organisateurs des sessions</h5>
            </div>
            <div className='d-flex justify-content-center mt-3  '>
            <div style={{backgroundColor:'#7796ab', display:'flex', justifyContent:'center', padding:'20px'}}>
                <div className='bg-white p-4'>
                    <p>Lorem Ipsum is simply dummy text of the printing and <br /> 
                        typesetting industry. Lorem Ipsum has been the industry's <br /> 
                        standard dummy text ever since the 1500s, when an unknown<br /> 
                        printer took a galley of type and scrambled it to make a <br /> 
                        type specimen book. It has survived not only five centuries,<br /> 
                            but also the leap into scrambled it to make a type specimen book.<br />  
                            It has survived not only five centuries, but also the leap into. <br /> 
                    </p>
                </div>
            </div>
            </div>
        </section>
    
       {/**************************** Recontre avec nos expert  fin****************************/}


       {/**************************** Ils nous font confiance  debut****************************/}
       <section>
       <div className='mt-5 mb-4'>
        <Underline  text='Ils nous font confiance'/>
            </div>
            <div className="Section_partenaire">
          <div className="partenaire">
            <div className="card_partenaire">
          <Image src={partenaire1} alt=""  className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
          <Image src={partenaire2} alt=""  className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
          <Image src={partenaire3} alt="" className='card-partenaire-img' />
            </div>
            <div className="card_partenaire">
          <Image src={partenaire4} alt="" className='card-partenaire-img' />
            </div>
            <div className="card_partenaire">
          <Image src={partenaire5} alt="" className='card-partenaire-img' />
            </div>
            <div className="card_partenaire">
          <Image src={partenaire6} alt=""  className='card-partenaire-img'/>
            </div>
          </div>
            </div>
       </section>
       {/**************************** Ils nous font confiance  fin****************************/}
      
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  )
}
