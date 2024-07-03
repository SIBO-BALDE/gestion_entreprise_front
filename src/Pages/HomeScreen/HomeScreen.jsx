import React, { useEffect } from 'react'
import { Button,Image } from 'react-bootstrap'

import NavbarUser from '../../Components/User_Components/NavbarUser'
import './HomeScreen.css';
import dasboard1 from '../../Images/dasboard superadmin.png';
import dasboard2 from '../../Images/dasboard admin.png';
import dasboard3 from '../../Images/dasboard participant.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../Components/User_Components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faHandshake, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Underline from '../../Components/User_Components/Underline/Underline'
import { faBullseye, faChartLine, faUserTie } from '@fortawesome/free-solid-svg-icons';
import ButtonDeco from '../../Components/User_Components/Buttons/ButtonDeco'
import ban2 from '../../Images/dessin.png'
import baraka2 from '../../Images/imgban/ban3.jpg'
import ban1 from '../../Images/ban-code.png'
import ButtonWashapp from '../../Components/User_Components/Buttons/ButtonWatsapp/ButtonWashapp'
import ChiffresCles from '../../Components/User_Components/ChiffresCles/ChiffresCles'




export default function HomeScreen() {
    useEffect(() => {
        AOS.init();
      }, [])

     
  return (
    <div>
      {/*************************** Navbar debut ***************************/}
        <NavbarUser />
      {/*************************** Navbar fin ***************************/}


      {/****************************  banniere debut ****************************/}
         <div className='ban_content_home mt-5 '>
           <Image src={ban1}  className='w-100 ban_image_content_home' /> 
         </div>
         <div id='ban_content_home-text'>
            <h1 className='titre_content_home'>Évaluez et améliorez <br />la performance de vos RH <br /> grâce à My Feedback 360°</h1>
            <p className='mt-3 paragraph_content_home'>
                Posez des questions et prenez des décisions informées grâce au <br />
                leader mondial des solutions de sondages et de formulaires.
            </p>
            <div className='d-flex mt-5 two_btns_home'>
                <div className='w-90'>
                    <Button className='btn_ban_home pt-3 pb-3' id='btn1_ban_home'>
                        <Link to={'/login'} style={{textDecoration:'none', color:'white'}}>Commencer l’evaluation</Link> 
                    </Button>
                </div>
                <div className='ms-4 btn2_ban_home_content2 w-90' id='btn2_ban_home_content2'>
                    <Button className='btn_ban_home pt-3 pb-3' id='btn2_ban_home'>
                        <Link to={'/modeles'} style={{textDecoration:'none', color:'white'}}>Voir les modéles</Link>
                    </Button>
                </div>
            </div>
         </div>
      {/****************************   banniere  fin**************************** */}
       

      {/****************************   buttonwashapp  debut**************************** */}
      <div className='buttonWaptsappp-content-home'>
            <ButtonWashapp/>
      </div>
      {/****************************   buttonwashapp  fin**************************** */}
     

      {/****************************   chiffres clés  debut*************************** */}
     <section>
        <ChiffresCles />
     </section>
      {/****************************  chiffres clés  fin*******************************/}

      {/****************************  qui sommes nous  debut****************************/}
      
      <section className='content_section2_home-main-only'>
        
        <div>
            <Underline  text='Qui sommes-nous ?' color='white'/>
        </div>
        <div className=' mt-5 content-flex-about-home-main' style={{width:'100%'}}>
        
            <div style={{display:'flex',height:'350px',width:'100%'}} id='content-flex-about-home-main-oneline'>
            <div className='d-flex justify-content-between ms-5'style={{marginRight:'17px'}} id='content-flex-about-home-main-oneline2'>
                <div  className='reference1_home me-1 ' style={{marginTop:'56px'}}></div>
                <div  className='reference2_home' style={{marginTop:'30px'}}></div>
            </div>
                <div style={{height:'100%',width:'90%',backgroundColor:'black'}}>
                    <Image src={baraka2} style={{height:'100%' ,width:'100%',opacity:'0.8'}} />
                    
                </div>

            </div>
            <div className='one1' style={{height:'350px'}}>
            <div style={{ height:'100%', width:'100%'}} className='content-text-main-home'>
                <h4 style={{color:'white',fontWeight:'bold',}}>Aimeriez vous renforcer la capicité de vos équipes à travers une évaluation  à 360°?</h4> <br />
                    <h4 style={{color:'white',fontWeight:'bold',}}><span style={{color:'#FFB703'}}>MY FEEDBACK <span className='text-white'>360°</span></span> est la solution</h4>
                    <p style={{color:'white', textAlign:'justify'}} className='mt-5'>MYFEEDBACK <span style={{color:'#FFB703'}}>360°</span> offre une plateforme d'évaluation en ligne novatrice pour 
                       les entreprises désireuses de favoriser un environnement de travail
                       collaboratif et axé sur l'amélioration continue. Grâce à son expertise 
                       dans le domaine de l'évaluation des équipes, Byfeeding propose une solution 
                       personnalisée et flexible adaptée aux besoins spécifiques de chaque entreprise.
                    </p>
                    <Button className='w-90 mt-2'id='btn_about_home_middle' 
                        style={{width:'100%', backgroundColor:'#FFB703', border:'none',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                        <Link to={'/about'} style={{textDecoration:'none', color:'#004573'}}>Voir plus</Link>
                    </Button>
            </div>
            </div>
        </div>
      </section>
      {/****************************  qui sommes nous  fin*******************************/}

      {/****************************  comment sa marche  debut****************************/}
      <section style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', paddingTop:'20px', paddingBottom:'30px'}}>
       <div>
          <div>
            <Underline  text='Comment fonctionne my feedback 360°?'/>
          </div>
          <div style={{display:'flex', justifyContent:'center',height:'400px'}} className='CommentFonctionne-content'>
            <Image src={ban2} style={{margin:'0 50px', width:'600px',height:'100%' }} data-aos="fade-left"  className='CommentFonctionne-content-img'/>
          </div>
          <div>
            <h6 className='text-center'>Laisser nous vous guider pas à pas sur les differentes parties de comment marche l’évalution 360°</h6>
          </div>
          <div className='d-flex justify-content-center '> 
            <Button id='btn_about_homes2'>
                <a href='#tone'style={{textDecoration:'none', color:'white'}} id='discover'>Decouvrir</a>
            </Button>
        </div>
       </div>
      </section>
      {/****************************  comment sa marche fin ****************************/}


      {/****************************  Nos agagements debut*******************************/}

      <section style={{paddingTop:'50px', backgroundColor:'#004573',paddingBottom:'90px'}}>
        <Underline  text='Nos engagments' color='white'/>
        <div className='container' style={{marginTop:'70px'}}>
                <div className='d-flex justify-center losange-content-main' id='losange-content-main'>
                <div className="losange ">
                  <FontAwesomeIcon icon={faBullseye}  id='icon_font_home_engament' className='icon_onetwo_home'/> 
                </div>
                <div className="losange" id='losange'> 
                    <FontAwesomeIcon icon={faGem} id='icon_font_home_engament' className='icon_onetwo_home1' />
                </div>
                <div className="losange"> 
                    <FontAwesomeIcon icon={faPaperPlane} id='icon_font_home_engament' className='icon_onetwo_home' />
                </div>

                </div>
               
                <div className='losange-content-main2'>
                <div className='content_midle_home_correct' >
                <div className='mt-5 d-flex '>
                            <div>
                                <ButtonDeco />
                            </div>
                        
                        <div><h5 className='' ><strong style={{color:'#FFB703'}}>Notre vision</strong></h5></div>
                </div>

                <div className='mt-4' style={{borderLeft:'3px solid #FFB703', height:'240px'}} id='content_midle_home_correct-content'>
                    <p className='me-3 ms-3 text-white' 
                        style={{textAlign:'justify'}}>Chez 
                        <strong style={{color:'#FFFF', marginBottom:'25px'}}>
                            <span style={{color:'#FFB703'}}>  MY FEEDBACK  </span>
                                360°
                         </strong><br />
                               
                                Notre vision est de révolutionner la façon dont les 
                                entreprises évaluent et développent leurs équipes. 
                                Nous aspirons à devenir le leader mondial en fournissant 
                                une plateforme en ligne innovante et intuitive, permettant 
                                à chaque entreprise de réaliser des évaluations 360° complètes 
                                et efficaces. 


                      </p>
                </div>
                </div>
                <div className='content_midle_home_correct' >
                <div className='mt-5 d-flex'>
                            <div>
                                <ButtonDeco />
                            </div>
                        
                        <div><h5 className='' ><strong style={{color:'#FFB703'}}>Nos valeurs</strong></h5></div>
                </div>
                <div className='mt-4' style={{borderLeft:'3px solid #FFB703', height:'240px', marginBottom:'25px' }} id='content_midle_home_correct-content'>
                    <p className='me-3 ms-3 text-white' style={{textAlign:'justify'}}>Chez  
                        <strong style={{color:'#FFFF'}}>
                        <span style={{color:'#FFB703'}}>  MY FEEDBACK</span> 360°</strong> <br />
                        Nos valeurs sont bien plus qu'une
                        simple déclaration.Elles sont le 
                        fondement de tout ce que nous 
                        faisons et guident chaque aspect 
                        de notre entreprise.                      
                      </p>
                      <div>
                        <div className='d-flex ms-3'>
                            <div className='d-flex'>
                            <div>
                            <ButtonDeco />
                            </div>
                            <div>
                                <p  className='text-white'>Intégrité</p>
                            </div>

                            </div>
                            <div className='d-flex ms-4'>
                            <div>
                            <ButtonDeco />
                            </div>
                            <div>
                                <p  className='text-white'>Responsablité</p>
                            </div>

                            </div>

                        </div>
                        <div className='d-flex ms-3'>
                            <div className='d-flex'>
                            <div>
                            <ButtonDeco />
                            </div>
                            <div>
                                <p  className='text-white'>Exélence</p>
                            </div>

                            </div>
                            <div className='d-flex ms-4'>
                            <ButtonDeco />
                            <div>
                                <p className='text-white'>Innovation</p>
                            </div>

                            </div>

                        </div>
                        

                      </div>
                </div>
                </div>
                <div className='content_midle_home_correct' >
                <div className='mt-5 d-flex   '>
                            <div>
                            <ButtonDeco />
                            </div>
                        
                        <div style={{textAlign:'left'}}><h5 className='' ><strong style={{color:'#FFB703'}}>Notre mission</strong></h5></div>
                </div>
                <div className='mt-4' style={{borderLeft:'3px solid #FFB703', height:'240px'}} id='content_midle_home_correct-content'>
                    <p className='ms-3 text-white ' style={{textAlign:'justify'}}>Chez 
                        <strong style={{color:'#FFFF' , marginBottom:'25px'}} >
                            <span style={{color:'#FFB703'}}>  MY FEEDBACK</span > 360°
                        </strong> <br />
                        Notre mission est de fournir aux entreprises du monde entier les outils 
                        et les ressources nécessaires pour optimiser la performance de leurs équipes.
                         Nous nous engageons à offrir une plateforme en ligne conviviale et innovante
                          qui permet à chaque organisation de réaliser des évaluations 360° approfondies
                           et de recevoir des feedbacks constructifs.
                      
                      </p>
                </div>
                </div>
                </div>
        </div>

               
            
      </section>

      {/****************************  Nos agagements fin  *********************************/}

      {/****************************  modéles d'évaluation debut ****************************/}
      {/* data-aos="fade-left" */}

       <section className='pt-4 pb-4'>
        <div>
          <div><Underline text='Quelques uns de nos modéles' /></div>
        </div>
        <div className='d-flex justify-content-center mt-5 gap-4 content-modeles-evaluation'>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'320px', height:'250px', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px'}} >
                <div><FontAwesomeIcon  icon={faHandshake} style={{fontSize:'60px', color:'#FFB703'}}  /></div>
                <div>
                    <h6 style={{fontWeight:'bold'}}  className='mt-2 mb-2'><Link to={'/tarif'} style={{textDecoration:'none', color:'black'}}>Evaluation 360 degrés</Link></h6>
                    <p style={{textAlign:'justify'}}>Évaluez et améliorez l’expérience de vos 
                        collaborateurs grâce à notre modèle de
                        sondage gratuit 
                        sur...</p>
                </div>
            </div>

            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'320px', height:'250px', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px'}} >
                <div><FontAwesomeIcon  icon={faChartLine} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold'}}  className='mt-2 mb-2'>Performances des employés</h6>
                    <p style={{textAlign:'justify'}}>Découvrez notre modèle de sondage sur
                        les performances des employés, certifié
                        par des experts. Simples...</p>
                </div>
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'320px', height:'250px', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                
                <div><FontAwesomeIcon  icon={faUserTie} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold'}}  className='mt-2 mb-2'>Sondage Employee Net Promoter Score (eNPS)</h6>
                    <p style={{textAlign:'justify'}}>Recueillez du feedback sur l’expérience et 
                        la satisfaction de vos employés avec le 
                        sondage Employee...</p>
                </div>
                <div 
                    style={{float:'left', marginTop:'30px', position: 'absolute', right:'10px'}}>
                    <Button style={{color:'black', backgroundColor:'#FFFF',border:'2px solid #FFB703'}}>
                        <Link to={'/modeles'} style={{textDecoration:'none', color:'black'}} >Voir plus</Link> 
                    </Button>
                </div>
            </div>
            
        </div>
        
       </section>
      {/****************************  modéles d'évaluation fin  ****************************/}


      {/**************************** expliquation modéles d'évaluation debut  ****************************/}
      <div>
      {/* <section style={{backgroundColor:'#ebf0f4', marginTop:'80px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}} id='tone'>
        <div id="" className='container'>
        <div>
          <div><Underline text="Les fonctionnalités de l'évaluation 360°" /></div>
        </div>
        <div className="experience pt-100 pb-100" >
		   <div className="container">
			<div className="row">
				<div className="col-xl-8 mx-auto text-center">
				</div>
			</div>
			<div className="row">
               <div className="col-xl-12">
                  <ul className="timeline-list">
                    
                     <li>
                        <div className="timeline_content" id='content1' data-aos="fade-right">
                          
                           <h4 style={{textAlign:'justify'}}> Évaluation Multi-Source</h4>
                           <p style={{textAlign:'justify'}}>L'admin peut creer et gérez des évaluations au sein de l'application. Les employés peuvent s'évaluer mutuellement en tant que collègues, supérieurs ou subalternes.Assurez une évaluation complète et impartiale des performances des employés à partir de diverses perspectives.</p>
                           
                        </div>
                     </li>
                    
                     <li>
                        <div className="timeline_content" data-aos="fade-left">
                        <Image  src={dasboard1} className='timeline-img'id='contentimg-timeline' />
                        </div>
                     </li>
                    
                     <li>
                        <div className="timeline_content" data-aos="fade-right">
                        <Image  src={dasboard2} className='timeline-img'id='contentimg-timeline' />
                        </div>
                     </li>
                    
                     <li>
                        <div className="timeline_content" id='timeline_content' data-aos="fade-left">
                        
                           <h4 style={{textAlign:'justify'}}>Gestion des Événements</h4>
                           <p style={{textAlign:'justify'}}>Créez et gérez des événements au sein de l'application.À la fin de chaque événement, envoyez des liens de questionnaires aux participants pour recueillir leurs feedbacks.Analysez les réponses pour obtenir des insights précieux sur l'événement et les performances des participants.</p>
                        </div>
                     </li>
                     
                      <li>
                        <div className="timeline_content" id='content1' data-aos="fade-right">
                          
                           <h4 style={{textAlign:'justify'}}>Tableau de Bord Administrateur</h4>
                           <p style={{textAlign:'justify'}}>L'administrateur peut visualiser toutes les évaluations et les événements dans son tableau de bord.Accédez à une vue globale et détaillée des performances des employés et des activités des événements pour une gestion efficace.</p>
                           
                        </div>
                     </li>
                     <li>
                       
                        <div className="timeline_content" data-aos="fade-right">
                        <Image  src={dasboard3} className='timeline-img'id='contentimg-timeline' />
                        </div>
                     </li>
                     
                  </ul>
               </div>
      </div>
		 </div>
	    </div>
        </div>
      </section> */}
      </div>

      
      {/****************************  explication modéles d'évaluation fin  ****************************/}

      {/****************************  Notre équipe  début **************************************/}
     
      {/*  <section>
        <div className='contenthome1'>
                <Underline text='Notre équipe' />
                <div className='section_content_team'>
                <div className='contenttemoignagehome'>
                
                <div  className='cardtemoinhome'>
                    <div className='cardtemoinhome1'>
                    <Image src={baraka6} className='cardtemoinhome1img' />
                    </div>
                        <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Gaïus YOKOSSID</h6>
                            <p className='text-center text-light paratextcontenthome'>M. Baraka</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                        </div>
                </div>
                <div  className='cardtemoinhome'>
                    <div className='cardtemoinhome1'>
                    <Image src={baraka13} className='cardtemoinhome1img' />
                    </div>
                        <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Carine KOKODE</h6>
                            <p className='text-center text-light paratextcontenthome'>Miss Success</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                        </div>
                </div>
                <div  className='cardtemoinhome'>
                    <div className='cardtemoinhome1'>
                    <Image src={baraka12} className='cardtemoinhome1img' />
                    </div>
                        <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Isaac WODE</h6>
                            <p className='text-center text-light paratextcontenthome'>M. Joy</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                        </div>
                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka15} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Souadou DIALLO</h6>
                            <p className='text-center text-light paratextcontenthome'>Miss Linguere</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>

                

<div  className='cardtemoinhome'>
                    <div className='cardtemoinhome1'>
                    <Image src={baraka6} className='cardtemoinhome1img' />
                    </div>
                        <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Gaïus YOKOSSID</h6>
                            <p className='text-center text-light paratextcontenthome'>M. Baraka</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                        </div>
                </div>
                <div  className='cardtemoinhome'>
                    <div className='cardtemoinhome1'>
                    <Image src={baraka13} className='cardtemoinhome1img' />
                    </div>
                        <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Carine KOKODE</h6>
                            <p className='text-center text-light paratextcontenthome'>Miss Success</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                        </div>
                </div>
                <div  className='cardtemoinhome'>
                    <div className='cardtemoinhome1'>
                    <Image src={baraka12} className='cardtemoinhome1img' />
                    </div>
                        <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Isaac WODE</h6>
                            <p className='text-center text-light paratextcontenthome'>M. Joy</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                        </div>
                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka15} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Souadou DIALLO</h6>
                            <p className='text-center text-light paratextcontenthome'>Miss Linguere</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>
                <div  className='cardtemoinhome'>
                <div className='cardtemoinhome1'>
                    <Image src={baraka14} className='cardtemoinhome1img' />
                </div>
                <div className='cardtemoinhome2'>
                            <h6 className='text-center title-temoinhome text-light'>Jolin CADET</h6>
                            <p className='text-center text-light paratextcontenthome'>Mister Smart</p>
                            <div className='d-flex justify-content-center pb-5'>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faFacebookF} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faTwitter} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faInstagram} className='' /></div>
                                <div className='cardtemoinsociau'><FontAwesomeIcon icon={faLinkedinIn} className='' /></div>
                            </div>
                </div>

                </div>

                
                
                
        
                </div>

                </div>
                
        </div>
      </section> */}
      {/****************************  Notre équipe  fin ****************************/}

      {/****************************  Footer ****************************/}
      <Footer />
      {/*  Footer */}


    </div>
  )
}
