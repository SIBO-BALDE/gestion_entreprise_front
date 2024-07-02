import React, { useEffect } from 'react'
import './ModeleScreen.css';
import { Button, Image } from 'react-bootstrap';
import ban_about from '../../Images/imgban/ban3.jpg';
import logo from '../../Images/logo.png';
import NavbarUser from '../../Components/User_Components/NavbarUser';
import Footer from '../../Components/User_Components/Footer/Footer';
import Underline from '../../Components/User_Components/Underline/Underline';
import Pagination from '../../Components/User_Components/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faChartLine, faDna, faPeopleGroup, faUserGroup, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import ButtonWashapp from '../../Components/User_Components/Buttons/ButtonWatsapp/ButtonWashapp';

export default function ModeleScreen() {
    useEffect(() => {
        AOS.init();
      }, [])
  return (
    <div>
      <header >
        <div>
            <NavbarUser />
        </div>
        <div className='ban_modele_modele_one'>
        <Image  src={ban_about} id='ban_modele_modele_one_img' />
       </div>
       <div className='ban_modele_modele_one_text'>
       <h1 className='text-center' >La plateforme My Feedback 360° : votre miroir à 360° pour booster la performance de vos équipes.
       </h1>
       {/* <p className='text-center'>Une solution professionnelle pour évaluer et améliorer les performances de votre équipe.</p> */}
       {/* <div class="loading_content_modele">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> */}
        {/* <div className="loader"></div> */}
       </div>
       <div>
            <ButtonWashapp/>
      </div>
     </header>
     <main>
     <Underline  text='Nos differents modéles'/>
     {/*************************** modele card debut ***************************/}
   
     {/**************************** deuxieme partie card ****************************/}
   
     <div className='card_modele_home_content_main_modele  mt-5 gap-4 container mb-5 '>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                <div><FontAwesomeIcon  icon={faDna} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 
                    style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                        <Link to={'/tarif'} style={{textDecoration:'none', color:'black'}}>Evaluation 360 degrés</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Évaluez et améliorez l’expérience de vos
                    collaborateurs grâce à notre modèle de
                    sondage gratuit 
                    sur...</p>
                </div>
                
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px'}} >
                <div><FontAwesomeIcon  icon={faHandshake} style={{fontSize:'60px', color:'#FFB703'}}  /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                         <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Sondage sur l’engagement des employés</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Évaluez et améliorez l’expérience de vos 
                        collaborateurs grâce à notre modèle de
                        sondage gratuit 
                        sur...</p>
                </div>
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px'}} >
                <div><FontAwesomeIcon  icon={faChartLine} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                        <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Performances des employés</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Découvrez notre modèle de sondage sur
                        les performances des employés, certifié
                        par des experts. Simples...</p>
                </div>
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                <div><FontAwesomeIcon  icon={faUsers} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                        <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Sondage Employee Net Promoter Score (eNPS)</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Recueillez du feedback sur l’expérience et 
                        la satisfaction de vos employés avec le 
                        sondage Employee...</p>
                </div>
                
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                <div><FontAwesomeIcon  icon={faComment} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                    <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Feedbacks post évenement</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Decouvrer l’attente des participants pour vos prochains évenements......</p>
                </div>
                
            </div>
            
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                <div><FontAwesomeIcon  icon={faUserTie} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                    <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Modéle d’évaluation des responsables</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Découvrezcomment demander à vos employés de donner des feedbacks sur leur responsable...</p>
                </div>
                
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                <div><FontAwesomeIcon  icon={faPeopleGroup} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                    <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Modéle de sondage sur la cohésion de l’équipe</Link>
                    </h6>
                    <p style={{textAlign:'justify'}}>Avec ce modéle vous pouvez mesurer le degré de cohésion
                 de vos équipes pour plus de performance dans le travail en équipe...</p>
                </div>
                
            </div>
            <div className='pt-2 pb-2 pe-3 ps-3 card_modele_home' style={{width:'auto', height:'auto', borderTop:'3px solid #FFB703', 
               boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:'25px', position:'relative'}} >
                <div><FontAwesomeIcon  icon={faUserGroup} style={{fontSize:'60px', color:'#FFB703'}} /></div>
                <div>
                    <h6 style={{fontWeight:'bold', textAlign:'justify'}}  className='mt-3 mb-2'>
                    <Link to={'/error'} style={{textDecoration:'none', color:'black'}}>Modéle d’évaluation des performances collaborateur</Link>
                    
                    </h6>
                    <p style={{textAlign:'justify'}}>Ce cercle vertueux  d’évaluation est la clés pour améliorer la culture d’entreprise l’éfficacité des équipes...</p>
                </div>
                
            </div>
            
     </div>


     {/* nouveau */}
     
     {/*************************** modele card fin ***************************/}
   
     {/*************************** modele card fin ***************************/}
     {/*************************** modele card fin ***************************/}
       {/* <div className='mt-5'>
       <Pagination />
       </div> */}
     </main>
     <footer>
        <Footer />
     </footer>


      
    </div>
  )
}
