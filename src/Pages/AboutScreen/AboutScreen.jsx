import React, { useRef, useState } from 'react'
import './AboutScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import ButtonDeco from '../../Components/User_Components/Buttons/ButtonDeco'
import ben from '../../Images/Ben.png';
import image1 from '../../Images/image 1.png'
import image2 from '../../Images/image 2.png';
import image3 from '../../Images/image 3.png';
import ban_about from '../../Images/imgban/bantree.jpg';
import { Button, Carousel, Image } from 'react-bootstrap';
import Underline from '../../Components/User_Components/Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBullseye, faCheck, faCrosshairs, faQuestion, faSignsPost, faUser } from '@fortawesome/free-solid-svg-icons';
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
import baraka9 from '../../Images/imgban/carre9.jpg';
import baraka8 from '../../Images/imgban/carre11.jpg';
import barakadg from '../../Images/imgban/carre5.jpg';
import { Link } from 'react-router-dom';
import ButtonWashapp from '../../Components/User_Components/Buttons/ButtonWatsapp/ButtonWashapp';
import { faEllo } from '@fortawesome/free-brands-svg-icons';

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
        {/**************************** Banniere debut *********************************/}
        <section>
        <div className='section_fixer'>
        <div className='ban_about_about_one2' style={{ lineHeight:'120px'}}>
        <h1 className='text-white text-center'>
            <strong style={{color:'#FFB703'}}>MY </strong>
            <strong className='text-center' style={{color:'#004573'}}> FEEDBACK <strong style={{color:'#FFB703'}}>360°</strong> </strong>
        </h1>
        <h3 className='content-cache'>Une solution professionnelle pour évaluer et améliorer les performances de votre équipe.</h3>
        <div className=' mt-1 ' style={{marginLeft:'', display:'flex',justifyContent:'center'}}>
        <Button className="btn_about_bottom"> 
          <Link to={'/modeles'} style={{textDecoration:'none', color:'#FFB703'}} id='btn_link_ban_about'> 
             Decouvrer nos modéles
          </Link>
        </Button>
        </div>
        
       </div>
       <div className=' w-100 ban_about_about_one mt-5 '>
        <Image  src={ban_about} id='ban_about_about_one1' />
       </div>
       
       
        </div>
        <div>
            <ButtonWashapp/>
        </div>
        </section>
       {/**************************** Banniere fin *************************************/}

      {/**************************** Comment sa marche debut ******************************/}

      <section className='bann_about_aboutscreen-section' style={{backgroundColor:'#004573', paddingBottom:'10px',paddingTop:'20px'}}>
        <Underline  text='Comment ça marche ?' color='white'/>
          <div className='bann_about_aboutscreen mt-5'>
                        <div className='ban_left_content_about'>
                            <h3 className='ms-5' style={{marginTop:'50px', color:'#FFB703'}} id='text-contentmain-marche'>Comment fonctionne My feedback 360° </h3>
                            <p className='ms-5 text-white me-3 ' style={{textAlign:'justify'}} id='text-contentmain-marche'>
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
                                <div className='d-flex ms-5 ' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Définir la confidentialité</p></div>
                                </div>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703',textAlign:'justify'}}>Préparer le questionnaire</p></div>
                                </div>

                                </div>
                                
                                <div className='content_grid_about_main'>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Procéder à la double évaluation</p></div>
                                </div>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Analyser et comparer les réponses</p></div>
                                </div>

                                </div>
                                <div className='content_grid_about_main'>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Analyser et comparer les réponses</p></div>
                                </div>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Débriefer les résultats</p></div>
                                </div>

                                </div>
                                <div className='content_grid_about_main'>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Communiquer et impliquer les parties prenantes</p></div>
                                </div>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Choisir les assesseurs</p></div>
                                </div>

                                </div>
                                <div className='content_grid_about_main'>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Prévoir une période d’évaluation et de suivi</p></div>
                                </div>
                                <div className='d-flex ms-5' id='text-contentmain-marche'>
                                    <div><ButtonDeco backgroundColor='#fff' /></div>
                                    <div><p style={{color:'#ffb703', textAlign:'justify'}}> Définir la date butoir</p></div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='ban_right_content_about'>
                            <div className='first-content'>
                            <div className='ban_right_image_about_content1 mb-3'><Image src={baraka8} className='ban_right_image_about1' /></div>
                            <div className='ban_right_image_about_content1'><Image src={barakadg} className='ban_right_image_about1' /></div>

                            </div>
                            <div className='seconde-content'>
                                <div className='ban_right_image_about_content2 mb-3'><Image src={image3} className='ban_right_image_about2' /></div>
                                <div className='ban_right_image_about_content2'><Image src={baraka9} className='ban_right_image_about2' /></div>
                            </div>
                        </div>
          </div>
      </section>

      {/****************************comment sa marche fin***********************************/}

     
      {/**************************** Nos objectifs  debut************************************/}
      <section className='mt-5'>
        <Underline text='Pourquoi nous ?' />
        
          {/**************************** first 2 cards****************************/}
          <div className='container contain-main-card-obj'>
            <div className='card-ojectif-main'>
              <h5 className='card-ojectif-main-line-titre'>My feedback 360° favorise l’implication de tous</h5>
            <div className='card-ojectif-main-line'></div>
            <div className='mt-5'><p><strong>L’implication de tous les membres de l’équipe permet d’accélérer la réalisation de l’objectif quotidien.</strong></p></div>
            <div className='content-flex-card-main-check'>
            <div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}>Il est important de noter que lorsque les membres de l’équipe sont impliqués dans leur évaluation, le moral de chaque employé s’en trouve renforcé.</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}> En tant qu’équipe, nous voulons tous travailler dans un climat amical, actif et déterminé à obtenir de meilleurs résultats.</p></div>
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
                          <FontAwesomeIcon icon={faBullseye} className='icon_comment_figure'  />
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
              <h5 className='card-ojectif-main-line-titre2'>My feedback 360° encourage l’auto-développement</h5>
            <div className='card-ojectif-main-line2'></div>
            <div className='mt-5'><p><strong>Que ce soit dans la sphère privée ou professionnelle, l’envie de progresser doit venir de l’intérieur.</strong></p></div>
            <div className='content-flex-card-main-check'>
            <div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}>Le feedback à 360° degrés encourage les employés à s’auto-évaluer et à fixer leurs propres objectifs.</p></div>
              </div>
              <div className='d-flex  '>
                              <div><ButtonDeco backgroundColor='#004573' /></div>
                              <div><p style={{textAlign:'justify'}}>Ces objectifs sont des facteurs de motivation personnelle essentiels pour que les employés développent les valeurs et les compétences fondamentales du bureau.</p></div>
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
                          <FontAwesomeIcon icon={faUser} className='icon_comment_figure' style={{fontSize:'40px'}}  />
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
            <h5 className='card-ojectif-main-line-titre2'>My feedback 360° renforce la confiance en soi</h5>
           <div className='card-ojectif-main-line2'></div>
           <div className='mt-5'><p><strong>L’art d’instaurer la confiance dans l’esprit d’un individu est une chose à laquelle les dirigeants influents devraient s’atteler.</strong></p></div>
           <div className='content-flex-card-main-check'>
           <div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}>Tout le monde apprécie un coup de pouce dans sa vie quotidienne.</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}>Le retour d’information des employés  les encourage à penser par eux-mêmes.</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}>Exprimer son opinion permet de renforcer la confiance   en soi.</p></div>
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
                        <FontAwesomeIcon icon={faCrosshairs} className='icon_comment_figure'  />
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
            <h5 className='card-ojectif-main-line-titre'>My feedback 360° favorise la transparence</h5>
           <div className='card-ojectif-main-line'></div>
           <div className='mt-5'><p><strong>L’effort de transparence présente de nombreux avantages pour les start-ups et les organisations de taille moyenne qui considèrent l’innovation comme une force motrice.</strong></p></div>
           <div className='content-flex-card-main-check'>
           <div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}>La recherche a constamment prouvé que la transparence hiérarchique est directement liée au niveau de moral et de motivation des employés.</p></div>
            </div>
            <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}>Il existe un lien direct entre la satisfaction au travail et la productivité.</p></div>
            </div>
            {/* <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}>Lorsque les entreprises ont commencé à s’en rendre compte, elles ont commencé à expérimenter l’expérience des employés</p></div>
            </div> */}
            {/* <div className='d-flex  '>
                            <div><ButtonDeco backgroundColor='#004573' /></div>
                            <div><p style={{textAlign:'justify'}}> L’art d’instaurer la confiance dans</p></div>
            </div> */}
            
            
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
                        <FontAwesomeIcon icon={faEllo} className='icon_comment_figure'  />
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
       {/**************************** Nos objectifs  fin***************************************/}

       {/**************************** Recontre avec nos expert debut****************************/}
       <div class="separator"></div>
       <section className='conten_separateur'>
      <Underline text="Ce qu'ils disent de nos solutions" color='white' />
      
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} id='visiblement'>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Sibo Baldé</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>La plateforme My Feedback 360° a véritablement transformé notre manière de recevoir et d'analyser les feedbacks. 
                  Nos équipes sont plus performantes et engagées grâce à des retours constructifs et complets .</p>
                </div>
            </div>
            <div className='content_content_formateur'>
             
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}}/> </div>
                  <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Andre Ndione</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>Depuis que nous utilisons My Feedback 360°, notre organisation a fait un bond en avant. 
                  La vision à 360° nous a permis de mieux comprendre nos forces et nos axes d'amélioration.</p>
                </div>
            </div>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Mariama Wade</h3>
                <p  className='text-white text-center' style={{textAlign:'justify'}}>Avec My Feedback 360°, nous avons pu obtenir des retours détaillés et pertinents qui ont grandement amélioré notre productivité et notre cohésion d'équipe.</p>
                </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}}/> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Glen Leonard</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>Grâce à My Feedback 360°, nous avons pu instaurer une culture de feedback positif et constructif au sein de notre entreprise. 
                  Nos employés se sentent écoutés et valorisés.</p>
                </div>
            </div>
            <div className='content_content_formateur'>
              
               <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>John Williams</h3>
                <p  className='text-white text-center' style={{textAlign:'justify'}}>L'utilisation de My Feedback 360° a permis à notre équipe de mieux se comprendre et de collaborer plus efficacement. C'est une révolution dans notre manière de travailler.</p>
                </div>
            </div>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Isabelle Faye</h3>
                <p  className='text-white text-center' style={{textAlign:'justify'}}>My Feedback 360° nous a offert une perspective nouvelle sur notre fonctionnement interne. Les feedbacks à 360° sont un atout majeur pour notre croissance continue.</p>
                </div>
            </div>
          </div>
        </Carousel.Item>
        
      </Carousel>

      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} id='visiblement-fermer'>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Seynabou Diop</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>La plateforme My Feedback 360° a véritablement transformé notre manière de recevoir et d'analyser les feedbacks. 
                  Nos équipes sont plus performantes et engagées grâce à des retours constructifs et complets .</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Abdoulaye Coulibaly</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>Depuis que nous utilisons My Feedback 360°, notre organisation a fait un bond en avant. La vision à 360° nous a permis de mieux comprendre nos forces et nos axes d'amélioration.</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Fatoumata Koné</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>Grâce à My Feedback 360°, nous avons pu instaurer une culture de feedback positif et constructif au sein de notre entreprise. Nos employés se sentent écoutés et valorisés.</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Jean-Baptiste Lefebvre</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>La plateforme My Feedback 360° est un outil indispensable pour notre développement professionnel. Les retours d'évaluation sont précis et nous aident à nous améliorer constamment.</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Mariam Traoré</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>My Feedback 360° nous a offert une perspective nouvelle sur notre fonctionnement interne. Les feedbacks à 360° sont un atout majeur pour notre croissance continue.</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Aïssatou Ndiaye</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>L'utilisation de My Feedback 360° a permis à notre équipe de mieux se comprendre et de collaborer plus efficacement. C'est une révolution dans notre manière de travailler .</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='content_images_top_ev_flex'>
            <div className='content_content_formateur'>
              
              <div style={{ width:"640", height:"360"}} className='content_content_formateur_image'>
              <div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'10px'}}><FontAwesomeIcon icon={faUser} style={{fontSize:'40px', color:'#FFB703'}} /> </div>
              <h3 className='text-center mt-3' style={{color:'#FFB703'}}>Pierre Dubois</h3>
                <p className='text-white text-center' style={{textAlign:'justify'}}>Avec My Feedback 360°, nous avons pu obtenir des retours détaillés et pertinents qui ont grandement amélioré notre productivité et notre cohésion d'équipe .</p>
                </div>
            </div>
            
          </div>
        </Carousel.Item>
        
        
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
