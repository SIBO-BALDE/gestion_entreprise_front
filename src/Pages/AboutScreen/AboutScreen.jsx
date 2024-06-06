import React, { useRef, useState } from 'react'
import './AboutScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import ButtonDeco from '../../Components/User_Components/Buttons/ButtonDeco'
import ben from '../../Images/Ben.png';
import image1 from '../../Images/image 1.png'
import image2 from '../../Images/image 2.png';
import image3 from '../../Images/image 3.png';
import ban_about from '../../Images/ap_ban3.jpg';
import { Button, Carousel, Image } from 'react-bootstrap';
import Underline from '../../Components/User_Components/Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCheck, faQuestion, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { faComments, faFileVideo, faHandshake } from '@fortawesome/free-regular-svg-icons';
import ev1 from '../../Images/baraka9.jpeg';
import ev2 from '../../Images/Ev-5 1.png';
import ev3 from '../../Images/baraka8.jpeg';
import formateur1 from '../../Images/image 50.png';
import formateur2 from '../../Images/image 51.png';
import formateur3 from '../../Images/image 52.png';
import partenaire1 from '../../Images/part1.png';
import partenaire2 from '../../Images/10.png';
import partenaire3 from '../../Images/0.png';
import partenaire4 from '../../Images/casa.png';
import partenaire5 from '../../Images/3fpt.png';
import partenaire6 from '../../Images/13.png';
import baraka_vd from '../../Images/baraka_vd.mp4';
import baraka6 from '../../Images/baraka6.jpeg';
import baraka12 from '../../Images/baraka12.jpeg';
import baraka13 from '../../Images/baraka13.jpeg';
import baraka14 from '../../Images/baraka14.jpeg';
import baraka11 from '../../Images/baraka11.jpeg';
import baraka15 from '../../Images/baraka15.jpeg';
import baraka2 from '../../Images/baraka2.jpeg';
import baraka9 from '../../Images/baraka9.jpeg';
import baraka8 from '../../Images/baraka8.jpeg';
import barakadg from '../../Images/baraka-dg.jpeg';
import { Link } from 'react-router-dom';
// import Typewriter from 'typewriter-effect';
import { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import ButtonWashapp from '../../Components/User_Components/Buttons/ButtonWatsapp/ButtonWashapp';

export default function AboutScreen() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
 
  return (
    <div>
      
      <header>
      <NavbarUser />
      </header>

      <main>
        {/**************************** Banniere debut ****************************/}
        <section>
        <div className='section_fixer'>
       <div className=' w-100 ban_about_about_one mt-5 '>
        <Image  src={ban_about} id='ban_about_about_one1' />
       </div>
       <div className='ban_about_about_one2 mt-4 ' style={{marginLeft:'380px', lineHeight:'120px'}}>
        <h1 className='text-white text-center '>
            <strong style={{color:'#FFB703'}}>MY </strong>
            <strong className='text-center' style={{color:'#004573'}}>FEEDBACK360 </strong>
        </h1>
        <h3> Le feedback à 360 degrés est un outil qui couvre la plupart des aspects des compétences comportementales d’un employé ou de son manager</h3>
        <div className=' mt-1' style={{marginLeft:'170px'}}>
        <Button className="btn_about_bottom"> 
          <Link to={'/modeles'} style={{textDecoration:'none', color:'#FFB703'}} id='btn_link_ban_about'> 
          Decouvrer nos modéles</Link>
        </Button>
        </div>
        
       </div>
       
        </div>
        <div>
            <ButtonWashapp/>
        </div>
        </section>
       {/**************************** Banniere fin ****************************/}

      {/**************************** Comment sa marche debut ****************************/}
      <section style={{backgroundColor:'#004573', paddingBottom:'10px',paddingTop:'20px'}}>
        <Underline  text='Comment ça marche ?' color='white'/>

      <div className='bann_about_aboutscreen mt-5'>
                   <div className='ban_left_content_about'>
                        <h3 className='ms-5' style={{marginTop:'50px', color:'#FFB703'}}>Comment fonctionne feedback 360 pro </h3>
                        <p className='ms-5 text-white me-3' style={{textAlign:'justify'}}>
                  L’évaluation à 360 degrés est un outil qui ne doit pas être utilisé à la légère  
                  il demande une organisation rigoureuse et de la disponibilité pour que toutes les parties
                  prenantes puissent s’impliquer. S’il est bien exploité, il peut être riche d’enseignements et
                  de bienfaits. Si vous n’y avez jamais eu recours par le passé, il est donc recommandé de 
                  pleinement dédier une personne à cette mission ou de faire appel à un consultant extérieur. 
                  Tout le processus doit être pensé en amont pour être le plus efficace possible. 
                  Rassurez-vous, nous sommes disposés à vous accompagner dans ce processus.
                  Voici quelques étapes importantes à considérer : 

                        </p>
                        <div style={{marginTop: '50px'}}>
                            <div className='content_grid_about_main'>
                            <div className='d-flex ms-5 '>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Définir la confidentialité</p></div>
                            </div>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703',textAlign:'justify'}}>Préparer le questionnaire</p></div>
                            </div>

                            </div>
                            
                            <div className='content_grid_about_main'>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Procéder à la double évaluation</p></div>
                            </div>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Analyser et comparer les réponses</p></div>
                            </div>

                            </div>
                            <div className='content_grid_about_main'>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Analyser et comparer les réponses</p></div>
                            </div>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Débriefer les résultats</p></div>
                            </div>

                            </div>
                            <div className='content_grid_about_main'>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Communiquer et impliquer les parties prenantes</p></div>
                            </div>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Choisir les assesseurs</p></div>
                            </div>

                            </div>
                            <div className='content_grid_about_main'>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Prévoir une période d’évaluation et de suivi</p></div>
                            </div>
                            <div className='d-flex ms-5'>
                                <div><ButtonDeco backgroundColor='#fff' /></div>
                                <div><p style={{color:'#ffb703', textAlign:'justify'}}> Définir la date butoir</p></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='ban_right_content_about'>
                        <div>
                        <div className='ban_right_image_about_content1 mb-3'><Image src={baraka8} className='ban_right_image_about1' /></div>
                        <div className='ban_right_image_about_content1'><Image src={barakadg} className='ban_right_image_about1' /></div>

                        </div>
                        <div>
                            <div className='ban_right_image_about_content2 mb-3'><Image src={image3} className='ban_right_image_about2' /></div>
                            <div className='ban_right_image_about_content2'><Image src={baraka9} className='ban_right_image_about2' /></div>
                        </div>
                    </div>
      </div>
      </section>
      {/****************************comment sa marche fin****************************/}

     
      {/**************************** Nos objectifs  debut****************************/}
      <section className='mt-5'>
        <Underline text='Pourquoi nous ?' />
        
          {/**************************** first 2 cards****************************/}
          <div className='container contain-main-card-obj'>
            <div className='card-ojectif-main'>
              <h5 className='card-ojectif-main-line-titre'>Feedback360pro favorise l’implication de tous</h5>
            <div className='card-ojectif-main-line'></div>
            <div className='mt-5'><p><strong>L’implication de tous les membres de l’équipe permet d’accélérer la réalisation de l’objectif quotidien.</strong></p></div>
            <div className='content-flex-card-main-check'>
            <div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              
              
            </div>
            <div >
            <div className='content_animation1' >
              <div className='top_content_first_objectif'>
                <FontAwesomeIcon icon={faBriefcase} className='top_content_first_objectif-icon' />
              </div>
              <div className='content_flex_midle_el'>
                  <div className='content_flex_midle_el_first'>
                      <FontAwesomeIcon icon={faFileVideo}  className='top_content_first_objectif-icon' />
                  </div>
                  <div className='content_main_midle_about3'>
                      <div className='content_midle_about3'>
                          <FontAwesomeIcon icon={faQuestion} className='icon_comment_figure'  />
                      </div>
                  </div>
                  <div className='content_flex_midle_el_thirth'>
                      <FontAwesomeIcon icon={faSignsPost} />
                  </div>
              </div>
              <div className='bottom_content_last_objectif'>
              <FontAwesomeIcon icon={faHandshake} className='top_content_first_objectif-icon' />
              </div>
            </div>

            </div>

            </div>
            </div>
            {/* seconde */}
            <div className='card-ojectif-main'>
              <h5 className='card-ojectif-main-line-titre2'>Feedback360pro favorise l’implication de tous</h5>
            <div className='card-ojectif-main-line2'></div>
            <div className='mt-5'><p><strong>L’implication de tous les membres de l’équipe permet d’accélérer la réalisation de l’objectif quotidien.</strong></p></div>
            <div className='content-flex-card-main-check'>
            <div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
              </div>
              
              
            </div>
            <div >
            <div className='content_animation1' >
              <div className='top_content_first_objectif'>
                <FontAwesomeIcon icon={faBriefcase} className='top_content_first_objectif-icon' />
              </div>
              <div className='content_flex_midle_el'>
                  <div className='content_flex_midle_el_first'>
                      <FontAwesomeIcon icon={faFileVideo}  className='top_content_first_objectif-icon' />
                  </div>
                  <div className='content_main_midle_about3'>
                      <div className='content_midle_about3'>
                          <FontAwesomeIcon icon={faQuestion} className='icon_comment_figure'  />
                      </div>
                  </div>
                  <div className='content_flex_midle_el_thirth'>
                      <FontAwesomeIcon icon={faSignsPost} />
                  </div>
              </div>
              <div className='bottom_content_last_objectif'>
              <FontAwesomeIcon icon={faHandshake} className='top_content_first_objectif-icon' />
              </div>
            </div>

            </div>

            </div>
            </div>
          </div>

           {/**************************** second 2 cards****************************/}
          <div className='container mt-4 mb-5 contain-main-card-obj'>
          <div className='card-ojectif-main'>
            <h5 className='card-ojectif-main-line-titre2'>Feedback360pro favorise l’implication de tous</h5>
           <div className='card-ojectif-main-line2'></div>
           <div className='mt-5'><p><strong>L’implication de tous les membres de l’équipe permet d’accélérer la réalisation de l’objectif quotidien.</strong></p></div>
           <div className='content-flex-card-main-check'>
           <div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            
            
           </div>
           <div >
           <div className='content_animation1' >
            <div className='top_content_first_objectif'>
              <FontAwesomeIcon icon={faBriefcase} className='top_content_first_objectif-icon' />
            </div>
            <div className='content_flex_midle_el'>
                <div className='content_flex_midle_el_first'>
                    <FontAwesomeIcon icon={faFileVideo}  className='top_content_first_objectif-icon' />
                </div>
                <div className='content_main_midle_about3'>
                    <div className='content_midle_about3'>
                        <FontAwesomeIcon icon={faQuestion} className='icon_comment_figure'  />
                    </div>
                </div>
                <div className='content_flex_midle_el_thirth'>
                    <FontAwesomeIcon icon={faSignsPost} />
                </div>
            </div>
            <div className='bottom_content_last_objectif'>
            <FontAwesomeIcon icon={faHandshake} className='top_content_first_objectif-icon' />
            </div>
          </div>

           </div>

           </div>
          </div>
          {/* seconde */}
          <div className='card-ojectif-main'>
            <h5 className='card-ojectif-main-line-titre'>Feedback360pro favorise l’implication de tous</h5>
           <div className='card-ojectif-main-line'></div>
           <div className='mt-5'><p><strong>L’implication de tous les membres de l’équipe permet d’accélérer la réalisation de l’objectif quotidien.</strong></p></div>
           <div className='content-flex-card-main-check'>
           <div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div>
            
            
           </div>
           <div >
           <div className='content_animation1' >
            <div className='top_content_first_objectif'>
              <FontAwesomeIcon icon={faBriefcase} className='top_content_first_objectif-icon' />
            </div>
            <div className='content_flex_midle_el'>
                <div className='content_flex_midle_el_first'>
                    <FontAwesomeIcon icon={faFileVideo}  className='top_content_first_objectif-icon' />
                </div>
                <div className='content_main_midle_about3'>
                    <div className='content_midle_about3'>
                        <FontAwesomeIcon icon={faQuestion} className='icon_comment_figure'  />
                    </div>
                </div>
                <div className='content_flex_midle_el_thirth'>
                    <FontAwesomeIcon icon={faSignsPost} />
                </div>
            </div>
            <div className='bottom_content_last_objectif'>
            <FontAwesomeIcon icon={faHandshake} className='top_content_first_objectif-icon' />
            </div>
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
      <Underline text="Ce qu'on dit sur nous!" color='white' />
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              <Image src={ev1} className='content_content_formateur_image' />
            </div>
            <div className='content_content_formateur'>
              {/* <Image src={ev2} className='content_content_formateur_image'/> */}
              <video width="640" height="360" controls className='content_content_formateur_image'>
                <source src={baraka_vd} type="video/mp4" />
              </video>
            </div>
            <div className='content_content_formateur'>
              <Image src={ev3} className='content_content_formateur_image' />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              <Image src={ev1} className='content_content_formateur_image' />
            </div>
            <div className='content_content_formateur'>
              {/* <Image src={ev2} className='content_content_formateur_image'/> */}
              <video width="640" height="360" controls className='content_content_formateur_image'>
                <source src={baraka_vd} type="video/mp4" />
              </video>
            </div>
            <div className='content_content_formateur'>
              <Image src={ev3} className='content_content_formateur_image' />
            </div>
          </div>
        </Carousel.Item>
        {/* Add more Carousel.Items here for additional cards */}
      </Carousel>
    </section>
    
       {/**************************** Recontre avec nos expert  fin****************************/}


       {/**************************** Ils nous font confiance  debut****************************/}
       <section>
        <div className='mt-5 mb-4'>
          <Underline text='Ils nous font confiance'/>
        </div>
        <div className="Section_partenaire">
          <div className="partenaire mb-5">
            <div className="card_partenaire">
              <Image src={partenaire1} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire2} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire3} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire4} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire5} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire6} alt="" className='card-partenaire-img'/>
            </div>
            
            <div className="card_partenaire">
              <Image src={partenaire1} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire2} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire3} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire4} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire5} alt="" className='card-partenaire-img'/>
            </div>
            <div className="card_partenaire">
              <Image src={partenaire6} alt="" className='card-partenaire-img'/>
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
