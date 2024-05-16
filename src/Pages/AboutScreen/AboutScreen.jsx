import React from 'react'
import './AboutScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import ButtonDeco from '../../Components/User_Components/Buttons/ButtonDeco'
import ben from '../../Images/Ben.png';
import image1 from '../../Images/image 1.png'
import image2 from '../../Images/image 2.png';
import image3 from '../../Images/image 3.png';
import ban_about from '../../Images/ap_ban3.jpg';
import { Button, Image } from 'react-bootstrap';
import Underline from '../../Components/User_Components/Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faQuestion, faSignsPost } from '@fortawesome/free-solid-svg-icons';
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

export default function AboutScreen() {
  return (
    <div>
      
      <header>
      <NavbarUser />
      </header>

      <main>
        {/**************************** Banniere debut ****************************/}
        <div className='section_fixer'>
       <div className=' w-100 ban_about_about_one mt-5 '>
        <Image  src={ban_about} id='ban_about_about_one1' />
       </div>
       <div className='ban_about_about_one2 mt-4 ' style={{marginLeft:'380px', lineHeight:'120px'}}>
        <h1 className='text-white text-center '>
            <strong style={{color:'#004573'}}>BARAKA </strong>
            <strong className='text-center' style={{color:'#FFB703'}}>GATE </strong>
        </h1>
        <h3> INCARNE  LE MIRACLE ET L'ABONDANCE</h3>
        <div className=' mt-1' style={{marginLeft:'170px'}}>
        <Button className="btn_about_bottom"> 
          <Link to={'/modeles'} style={{textDecoration:'none', color:'#FFB703'}} id='btn_link_ban_about'> Decouvrer nos modéles</Link>
        </Button>
        </div>
        
       </div>
          
        </div>
       {/**************************** Banniere fin ****************************/}

      {/**************************** Comment sa marche debut ****************************/}
      <section style={{backgroundColor:'#004573', paddingBottom:'60px',paddingTop:'20px'}}>
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
                     <div>
                        <div className='d-flex ms-5 '>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Définir la confidentialité</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703',textAlign:'justify'}}>Préparer le questionnaire</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Choisir les assesseurs</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Communiquer et impliquer les parties prenantes</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Définir la date butoir</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Procéder à la double évaluation</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Analyser et comparer les réponses</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Analyser et comparer les réponses</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Débriefer les résultats</p></div>
                        </div>
                        <div className='d-flex ms-5'>
                            <div><ButtonDeco backgroundColor='#fff' /></div>
                            <div><p style={{color:'#ffb703', textAlign:'justify'}}> Prévoir une période d’évaluation et de suivi</p></div>
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
        <div className='objectif_content_flex' >
          <div style={{border:'1px solid green'}}>
          <div >
            <div className='top_content_first_objectif'>
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <div className='content_flex_midle_el'>
                <div className='content_flex_midle_el_first'>
                    <FontAwesomeIcon icon={faFileVideo} />
                </div>
                <div className='content_main_midle_about3'>
                    <div className='content_midle_about3'>
                        <FontAwesomeIcon icon={faQuestion} className='icon_comment_figure' />
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
          <div className='mt-4' >
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
          

          </div>
          <div  >
            <div className="text-container mb-4" >
                <h1 style={{color:'#004573', marginBottom:'30px'}} className='text_design_header'>10 raisons de procéder à un feedback 360 degrés</h1>
                <h6 style={{textAlign:'justify', textAlign:'justify'}}>Voici dix raisons pour lesquelles votre entreprise devrait utiliser le feedback à 360 degrés pour l’évaluation et le développement des employés.</h6>
            </div>
            <div style={{border:'1px solid red'}}>
                <div className='d-flex'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold  content_numero_object1'> 1</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                          <strong style={{color:'#004573'}}>Feedback360pro favorise l’implication de tous</strong><br />
                          L’implication de tous les membres de l’équipe permet d’accélérer 
                          la réalisation de l’objectif quotidien. Il est important de noter 
                          que lorsque les membres de l’équipe sont impliqués dans leur évaluation, 
                          le moral de chaque employé s’en trouve renforcé.</p>
                    </div>
                </div>
                <div className='d-flex mt-4' style={{marginLeft:'200px'}}>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 2</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify', textAlign:'justify'}}>
                          <strong style={{color:'#004573'}}>Feedback360pro est une pilule pour la conscience de soi</strong><br />
                          Il va sans dire que lorsque nous effectuons la même tâche tous les jours pendant de 
                          nombreuses heures, nous commençons parfois à manquer le but de notre effort. Néanmoins, 
                          il s’agit d’un problème universel auquel les employés sont confrontés partout.
                          Le feedback à 360 degrés favorise la connaissance de soi et rappelle aux employés
                           les points forts qu’ils apportent à l’équipe.
 
                             </p>
                    </div>
                </div>
                <div className='d-flex mt-4'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 3</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify', textAlign:'justify'}}>
                          <strong style={{color:'#004573'}}>Feedback360pro renforce la confiance en soi</strong><br />
                          Tout le monde apprécie un coup de pouce dans sa vie quotidienne. L’art d’instaurer la confiance dans l’esprit d’un individu est une chose à laquelle les dirigeants influents devraient s’atteler.
                          Le retour d’information des employés les encourage à penser par eux-mêmes. Exprimer son opinion permet de renforcer la confiance en soi. La confiance reconnue a un impact direct sur l’éthique du travail, les valeurs et la responsabilité des employés sur le lieu de travail.
                          Si vous voulez résoudre des problèmes dans votre bureau, créez des personnes qui ont la confiance nécessaire pour trouver elles-mêmes des solutions. C’est le meilleur premier pas vers la constitution d’une main-d’œuvre libre de penser et innovante.

                            
                            </p>
                    </div>
                </div>
                <div className='d-flex  mt-4' style={{marginLeft:'200px'}}>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 4</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong  style={{color:'#004573'}}>Feedback360pro favorise la transparence</strong><br /> 
                        Il existe un lien direct entre la satisfaction au travail et la productivité. 
                        Lorsque les entreprises ont commencé à s’en rendre compte, elles ont commencé à expérimenter
                         l’expérience des employés.L’effort de transparence présente de nombreux avantages pour les
                          start-ups et les organisations de taille moyenne qui considèrent l’innovation comme une
                           force motrice. La recherche a constamment prouvé que la transparence hiérarchique est 
                           directement liée au niveau de moral et de motivation des employés.

                            
                            </p>
                    </div>
                </div>
                <div className='d-flex mt-4'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 5</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong  style={{color:'#004573'}} >Feedback360pro responsabilise les employés</strong><br /> 
                        Comment donner aux employés les moyens de travailler à leur progrès et à leur développement tout en améliorant la productivité et les résultats de l’organisation ?
                        Le feedback à 360 degrés encourage les employés à penser par eux-mêmes et à évaluer leurs propres performances.
                        Elle leur confie l’autorité de l’évaluation des performances, les encourageant ainsi à se fixer des objectifs personnels qui peuvent également aider l’entreprise.
                            
                      </p>
                    </div>
                </div>
                <div className='d-flex mt-4' style={{marginLeft:'200px'}}>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 6</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong  style={{color:'#004573'}} >Feedback360pro ravive la culture du travail de l’intérieur</strong><br /> 
                        Les valeurs et la culture sont des concepts qui ne peuvent être imposés à une organisation. Elle ne peut qu’être influencée et encouragée pour que sa diffusion soit organique.
                        L’ouverture, l’inclusion, l’attitude positive, l’appréciation des employés et l’encouragement sont quelques-uns des attributs qui décrivent une culture professionnelle saine. Les enquêtes sur la culture d’entreprise favorisent la prise de conscience de soi et font en sorte que les employés se sentent plus responsables de la culture au sein du lieu de travail.

                            
                      </p>
                    </div>
                </div>
                <div className='d-flex mt-4'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 7</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong style={{color:'#004573'}} >Feedback360pro encourage l’auto-développement</strong><br /> 
                        Que ce soit dans la sphère privée ou professionnelle, l’envie de progresser doit venir de l’intérieur.
                        Le feedback à 360 degrés encourage les employés à s’auto-évaluer et à fixer leurs propres objectifs. Ces objectifs sont des facteurs de motivation personnelle essentiels pour que les employés développent les valeurs et les compétences fondamentales du bureau.


                            
                      </p>
                    </div>
                </div>
                <div className='d-flex mt-4' style={{marginLeft:'200px'}}>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 8</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong  style={{color:'#004573'}} >Feedback360pro élimine les préjugés</strong><br /> 
                        Le style traditionnel de retour d’information du haut vers le bas crée un écart de pouvoir entre les employés et les dirigeants. L’une des meilleures qualités de leadership est de promouvoir le respect et la motivation tout en encourageant la libre pensée.
                        Le feedback à 360 degrés est non menaçant et honnête. Les employés n’ont plus l’impression que les opinions personnelles d’un manager faussent l’évaluation de leurs performances.
                                         
                      </p>
                    </div>
                </div>
                <div className='d-flex mt-4'>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 9</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong style={{color:'#004573'}}>Feedback360pro favorise une croissance progressive</strong><br /> 
                        Chaque cycle de feedback à 360 degrés offre aux individus une perspective sur leur interaction avec leurs coéquipiers et, plus important encore, un objectif à atteindre.
                        Un retour d’information régulier à 360 degrés est propice à une croissance progressive. Les employés sont encouragés à penser par eux-mêmes et à créer leurs propres objectifs.
                        Il ne s’agit pas seulement d’impliquer davantage les employés. Vous souhaitez également créer des innovateurs libres d’esprit, capables de prospérer par eux-mêmes et d’apporter de la valeur à l’organisation.


                      </p>
                    </div>
                </div>
                <div className='d-flex mt-4' style={{marginLeft:'200px'}}>
                    <div className='content_numero_object me-2'>
                       <h4 className='mt-2 fw-extrabold content_numero_object1'> 10</h4>
                    </div>
                    <div>
                        <p  style={{textAlign:'justify'}}>
                        <strong  style={{color:'#004573'}} >Feedback360pro favorise la cohésion de l’équipe</strong><br /> 
                        Une équipe qui travaille bien ensemble grandit ensemble. Lorsque les employés ayant un objectif fréquent partagent un retour d’information constructif, cela contribue à créer une unité de travail cohésive avec un niveau d’engagement commun en faveur de la réussite.
                      </p>
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
                {/* <Image src={ev2} className='content_content_formateur_image'/> */}
                <video  width="640" height="360" controls className='content_content_formateur_image'>
                <source src={baraka_vd} type="video/mp4" />
                </video>
                </div>
                <div className='content_content_formateur'>
                <Image src={ev3}  className='content_content_formateur_image'/>
                </div>
            </div>
            <div className='content_images_under_ev'>
                <h5 className='text-center'>Bénéfices de la plateforme Feedback360pro</h5>
            </div>
            <div className='d-flex justify-content-center mt-3 mb-5 container_cards_about_text  container'>
            <div style={{backgroundColor:'#7796ab', display:'flex', justifyContent:'center', padding:'20px', width:'100%'}} >
                <div className='bg-white p-4'>
                    <p style={{textAlign:'justify'}}><strong style={{backgroundColor:'#FFB703'}}>Le feedback à 360 degrés</strong> est un outil qui couvre la plupart des aspects des compétences
                       comportementales d’un employé ou de son manager. <br />
                       Il s’agit d’un système qui favorise la 
                       transparence dans le système de retour d’information et réduit l’animosité, ce qui le rend 
                       extrêmement populaire parmi les organisations. <br />
                       <strong style={{backgroundColor:'#004573', color:'white'}}>Le logiciel feedback 360 pro</strong> est bien plus qu’une
                        plateforme permettant de partager des observations sur les comportements, il a le pouvoir 
                        d’aider à transformer la façon dont une personne dirige l’organisation. Découvrez notre 
                        plateforme de feedback 360 et commencez à transformer le feedback en action et en impact. br
                        <br /> <br /><strong style={{color:'#004573', display:'inline'}}><span><ButtonDeco backgroundColor='#004573' /></span> Contribue à améliorer la connaissance de soi :</strong><br /> Cet outil de retour d’information permet aux 
                        employés de mieux se connaître. Comme il s’agit d’un processus de retour d’information anonyme, 
                        les commentaires honnêtes concernant le comportement d’un employé sont généralement enregistrés. 
                        Les employés peuvent consulter le retour d’information et indiquer leurs domaines d’amélioration..
                       <br /> <br /> <strong style={{color:'#004573'}}>2-Réduit les angles morts :</strong><br /> 
                       Comme son nom l’indique, le feedback à 360 degrés est une méthode de feedback 
                        globale qui permet d ‘ analyser les forces et les faiblesses. réduire les angles morts et augmenter l’efficacité 
                        d’un employé. Ce retour d’information est le bon moyen d’explorer les forces cachées, car il n’est pas 
                        unidirectionnel et aide l’employé à identifier ses forces cachées. talents.
                        <br /> <br /><strong style={{color:'#004573'}}>3-Contribue à renforcer la confiance en soi :</strong><br /> Ce mécanisme de retour d’information permet d’instaurer la
                         confiance et d’améliorer le moral non seulement des employés, mais aussi des dirigeants. Les dirigeants
                          commencent à se sentir mieux dans l’organisation et les personnes qu’ils dirigent lorsque leurs efforts
                           sont remarqués. Il améliore effectivement la capacité de prise de décision des dirigeants car le retour 
                           d’information est généralement constructif..
 
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
            <div className='d-flex justify-content-center mt-3  container_cards_about_text  container '>
            <div style={{backgroundColor:'#7796ab', display:'flex', justifyContent:'center', padding:'20px'}}>
                <div className='bg-white p-4'>
                    <p style={{textAlign:'justify'}}><br />
                    <strong style={{color:'#004573'}}>4-Créer une meilleure culture d’entreprise :</strong><br />
                    Bien que le processus
                     soit anonyme, le retour d’information est fourni directement à l’employé par son supérieur et 
                     ses pairs, et vice versa. 
                      Elle contribue à réduire l’animosité entre les personnes et à 
                      améliorer la culture du lieu de travail..
                     
                      <br /><br /> <strong style={{color:'#004573'}}>5-Favorise une culture de l’égalité au travail : </strong><br />
                     Selon une étude, seuls 46 % des salariés 
                     américains estiment avoir voix au chapitre au travail. Grâce à ce retour d’information, 
                     les employés ont la possibilité de donner un retour d’information à leurs chefs, à leurs
                      responsables ou à leurs pairs. Il insiste sur le fait que les employés ont un droit de 
                      regard égal sur l’évaluation du manager, ce qui favorise une culture de l’égalité sur 
                      le lieu de travail..
                      <br /> <br /><strong style={{color:'#004573'}}>6-Il réduit la rotation des effectifs :</strong><br /> 
                      De nombreuses organisations sont confrontées à la 
                      rotation du personnel. Cela nuit à leur réputation sur le marché, car peu de gens veulent 
                      travailler dans un endroit où les employés sont considérés comme faibles ou sans sécurité 
                      d’emploi. Ce système de retour d’information permet aux employés d’identifier leurs faiblesses
                       et d’y remédier. Il contribue à accroître l’engagement des employés et leur satisfaction globale 
                       au travail..
                       <br /><br /><strong className='mt-4' style={{color:'#004573'}}>7-Il s’agit d’un processus d’amélioration continue :</strong><br /> Une enquête à 360 degrés n’est pas un processus ponctuel, où le retour d’information est donné et oublié. Un cycle de retour d’information régulier permet aux employés et à leurs dirigeants de s’améliorer en permanence.
                      Plateforme feedback 360 pro : Réservez une démonstration


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
