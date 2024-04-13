import React from 'react'
import { Button, Image } from 'react-bootstrap'
import ban1 from '../../../Images/ban-code.png'
import NavbarUser from '../NavbarUser'
import './Home.css';
import Underline from './Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBullseye, faFaceSmile,faUsers } from '@fortawesome/free-solid-svg-icons';
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
      <section style={{paddingTop:'70px', backgroundColor:'#004573'}}>
        <div>
        <div className="conteneur_losange_home">
        <div className="losange "><FontAwesomeIcon icon={faBullseye}  id='icon_font_home_engament' className='icon_onetwo_home'/> </div>
        <div className="losange" id='losange'> <FontAwesomeIcon icon={regularIcons.faGem} id='icon_font_home_engament' className='icon_onetwo_home1' /></div>
        <div className="losange"> <FontAwesomeIcon icon={regularIcons.faPaperPlane} id='icon_font_home_engament' className='icon_onetwo_home' /></div>
    </div>
        </div>
      </section>
      {/*  Nos agagements fin  */}
    </div>
  )
}
