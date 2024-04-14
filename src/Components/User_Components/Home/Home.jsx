import React from 'react'
import { Button, Image } from 'react-bootstrap'
import ban1 from '../../../Images/ban-code.png'
import NavbarUser from '../NavbarUser'
import './Home.css';
import Underline from './Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBullseye, faChartLine, faCheck, faFaceSmile,faHandshake,faUserTie,faUsers } from '@fortawesome/free-solid-svg-icons';
import ban2 from '../../../Images/dessin.png';
import ban3 from '../../../Images/Rectangle2.png';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';


export default function Home() {
  return (
    <div>
      {/* Navbar debut */}
        <NavbarUser />
      {/* Navbar fin */}


      {/*  banniere debut */}
         <div className='ban_content_home'>
           <Image src={ban1}  className='w-100 ban_image_content_home' /> 
         </div>
         <div id='ban_content_home-text'>
            <h1 className='titre_content_home'>Créez des sondages <br /> en ligne gratuits, en <br /> quelques minutes</h1>
            <p className='mt-3 paragraph_content_home'>
                Posez des questions et prenez des décisions informées grâce au <br />
                leader mondial des solutions de sondages et de formulaires.
            </p>
            <div className='d-flex mt-5'>
                <div>
                    <Button className='btn_ban_home pt-3 pb-3' id='btn1_ban_home'>Commencer l’evaluation</Button>
                </div>
                <div className='ms-4'>
                    <Button className='btn_ban_home pt-3 pb-3' id='btn2_ban_home'>Voir les modéles</Button>
                </div>
            </div>
         </div>
      {/*  banniere  fin*/}


      {/*  chiffres clés  debut*/}
      <section style={{paddingTop:'20px', paddingBottom:'30px'}}>
        <div>
            <Underline  text='Quelques chiffres clés'/>
        </div>
        <div className='d-flex justify-content-center'> 
         <div className ='me-5 '>
            <div className='content_main_chiffre1'>
                <FontAwesomeIcon  icon={faBuilding } className='content_main_icon_home'/>
            </div>
            <div>
                <h1 className='content_blue_home'>2000+</h1>
                <p>Entreprises formé</p>
            </div>

         </div>
         <div className>
            <div className='content_main_chiffre1'>
                <FontAwesomeIcon  icon={faUsers } className='content_main_icon_home'/>
            </div>
            <div>
                <h1 className='content_orange_home'>1000+</h1>
                <p>Employés évalué</p>
            </div>

         </div>
         <div className='ms-5 '>
            <div className='content_main_chiffre1'>
                <FontAwesomeIcon  icon={faFaceSmile } className='content_main_icon_home'/>
            </div>
            <div>
                <h1 className='content_blue_home'>5000+</h1>
                <p>Resultats de satisfaction</p>
            </div>

         </div>
         
        </div>
      </section>
      {/*  chiffres clés  fin*/}

      {/*  qui sommes nout  debut*/}
      <section className='content_section2_home '>
        
        <div>
            <Underline  text='Qui sommes-nous ?' color='white'/>
        </div>
        <div className='d-flex justify-content-center mt-5' style={{width:'96%'}}>
        <div className='d-flex justify-content-between ms-5'style={{marginLeft:'150px', marginRight:'17px'}}>
            <diiv  className='reference1_home me-1 ' style={{marginTop:'56px'}}></diiv>
            <div  className='reference2_home' style={{marginTop:'30px'}}></div>
        </div>
            <div style={{height:'300px',width:'100%'}}>
                <Image src={ban3} style={{height:'100%' ,width:'100%'}} />
            </div>
            <div style={{marginLeft:'30px', height:'300px', width:'100%'}}>
                <h3 style={{color:'white',fontWeight:'bold'}}>Vous aimerez faire une evalution de vos équipes? <br />
                    Byfeeding est la solution</h3>
                    <p style={{color:'white'}} className='mt-4'>Byfeeding offre une plateforme d'évaluation en ligne novatrice pour 
                       les entreprises désireuses de favoriser un environnement de travail
                       collaboratif et axé sur l'amélioration continue. Grâce à son expertise 
                       dans le domaine de l'évaluation des équipes, Byfeeding propose une solution 
                       personnalisée et flexible adaptée aux besoins spécifiques de chaque entreprise.
                    </p>
                    <Button className='w-90'id='btn_about_home_middle' 
                    style={{width:'99%', backgroundColor:'#FFB703', border:'none',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>Voir plus</Button>
            </div>
        </div>
      </section>
      {/*  qui sommes nous  fin*/}

      {/*  ccomment sa marche  debut*/}
      <section style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', paddingTop:'20px', paddingBottom:'30px'}}>
       <div>
          <div>
            <Underline  text='Comment ça marche ?'/>
          </div>
          <div style={{display:'flex', justifyContent:'center',height:'400px'}}>
            <Image src={ban2} style={{margin:'0 50px', width:'600px',height:'100%' }} />
          </div>
          <div>
            <h6 className='text-center'>Laisser nous vous guider pas à pas sur les differentes parties de Comment marche l’évalution en ligne</h6>
          </div>
          <div className='d-flex justify-content-center '> <Button id='btn_about_homes2'>Decouvrir</Button></div>
       </div>
      </section>
      {/*  comment sa marche fin */}


      {/*  Nos agagements debut*/}
      <section style={{paddingTop:'50px', backgroundColor:'#004573'}}>
        <Underline  text='Nos engagment' color='white'/>
        <div className='' style={{marginTop:'70px'}}>
            <div className="conteneur_losange_home">

                <div>
                <div className="losange ">
                  <FontAwesomeIcon icon={faBullseye}  id='icon_font_home_engament' className='icon_onetwo_home'/> 
                </div>
                <div className='mt-5 d-flex justify-content-center  '>
                            <div className='bg-white d-flex justify-content-center align-items-center mt-2 me-1' style={{width:'15px', height:'15px',borderRadius:'50%'}}>
                                <div style={{width:'10px', height:'10px',borderRadius:'50%', backgroundColor:'#FFB703'}}></div>
                            </div>
                        
                        <div><h5 className='' ><strong style={{color:'#FFB703'}}>Notre vision</strong></h5></div>
                </div>
                <div className='mt-4' style={{borderLeft:'3px solid #FFB703'}}>
                    <p className='me-3 pe-4 '>Chez <strong style={{color:'#FFFF'}}>
                        <span style={{color:'#FFB703'}}>  BARAKA</span> GATE</strong><br />
                         Notre vision est de révolutionner la <br />
                          façon dont les entreprises évaluent <br />
                           et développent leurs équipes. Nous <br />
                            aspirons à devenir le leader mondial <br /> en 
                            fournissant une plateforme en <br /> ligne 
                            innovante et intuitive,<br /> permettant 
                            à chaque.
                      
                      </p>
                </div>
                </div>

                <div>
                <div className="losange" id='losange'> 
                    <FontAwesomeIcon icon={regularIcons.faGem} id='icon_font_home_engament' className='icon_onetwo_home1' />
                </div>
                <div className='mt-5 d-flex justify-content-center  '>
                            <div className='bg-white d-flex justify-content-center align-items-center mt-2 me-1' style={{width:'15px', height:'15px',borderRadius:'50%'}}>
                                <div style={{width:'10px', height:'10px',borderRadius:'50%', backgroundColor:'#FFB703'}}></div>
                            </div>
                        
                        <div><h5 className='' ><strong style={{color:'#FFB703'}}>Nos valeurs</strong></h5></div>
                </div>
                <div className='mt-4' style={{borderLeft:'3px solid #FFB703'}}>
                    <p className='me-3'>Chez  
                        <strong style={{color:'#FFFF'}}>
                        <span style={{color:'#FFB703'}}>  BARAKA</span> GATE</strong> <br />
                        Nos valeurs sont bien plus qu'une <br />
                        simple déclaration.Elles sont le <br /> 
                        fondement de tout ce que nous<br /> 
                        faisons et guident chaque aspect <br /> 
                        de notre entreprise.                      
                      </p>
                </div>
                </div>

                <div>
                <div className="losange"> 
                    <FontAwesomeIcon icon={regularIcons.faPaperPlane} id='icon_font_home_engament' className='icon_onetwo_home' />
                </div>
                <div className='mt-5 d-flex justify-content-center  '>
                            <div className='bg-white d-flex justify-content-center align-items-center mt-2 me-1' style={{width:'15px', height:'15px',borderRadius:'50%'}}>
                                <div style={{width:'10px', height:'10px',borderRadius:'50%', backgroundColor:'#FFB703'}}></div>
                            </div>
                        
                        <div><h5 className='' ><strong style={{color:'#FFB703'}}>Notre mission</strong></h5></div>
                </div>
                <div className='mt-4' style={{borderLeft:'3px solid #FFB703'}}>
                    <p>Chez 
                        <strong style={{color:'#FFFF'}}><span style={{color:'#FFB703'}}>  BARAKA</span > GATE</strong> <br />
                      Notre mission est de fournir aux entreprises <br />
                       du monde entier les outils et les ressources <br />
                       nécessairespour optimiser la performance de <br />
                        leurs équipes.Nous nous engageons à offrir <br />
                        une plateforme en ligne conviviale et <br />
                        innovante qui permet à chaque.
                      
                      </p>
                </div>
                </div>
            </div>
        </div>
      </section>
      {/*  Nos agagements fin  */}

      {/*  modéles d'évaluation debut */}
       <section className='pt-4 pb-4'>
        <div>
          <div><Underline text='Quelques uns de nos modéles d’évaluation' /></div>
        </div>
        <div className='d-flex justify-content-center mt-5 gap-4 '>
            <div className='pt-2 pb-2 pe-3 ps-3' style={{width:'320px', height:'250px', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px'}}>
                <div><FontAwesomeIcon  icon={faHandshake} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold'}}  className='mt-2 mb-2'>Sondage sur l’engagement des employés</h6>
                    <p>Évaluez et améliorez l’expérience de vos <br />
                        collaborateurs grâce à notre modèle de
                        sondage gratuit 
                        sur...</p>
                </div>
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3' style={{width:'320px', height:'250px', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px'}}>
                <div><FontAwesomeIcon  icon={faChartLine} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold'}}  className='mt-2 mb-2'>Performances des employés</h6>
                    <p>Découvrez notre modèle de sondage sur
                        les performances des employés, certifié
                        par des experts. Simples...</p>
                </div>
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3' style={{width:'320px', height:'250px', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}}>
                <div><FontAwesomeIcon  icon={faUserTie} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold'}}  className='mt-2 mb-2'>Sondage Employee Net Promoter Score (eNPS)</h6>
                    <p>Recueillez du feedback sur l’expérience et 
                        la satisfaction de vos employés avec le 
                        sondage Employee...</p>
                </div>
                <div 
                    style={{float:'left', marginTop:'30px', position: 'absolute', right:'10px'}}>
                    <Button style={{color:'black', backgroundColor:'#FFFF',border:'2px solid #FFB703'}}>Voir plus</Button>
                </div>
            </div>
            
        </div>
        
       </section>
      {/*  modéles d'évaluation fin  */}
    </div>
  )
}
