import React, { useEffect, useState } from 'react'
import './TarifScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser';
import Footer from '../../Components/User_Components/Footer/Footer';
import Underline from '../../Components/User_Components/Underline/Underline';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ButtonWashapp from '../../Components/User_Components/Buttons/ButtonWatsapp/ButtonWashapp';
import axios from 'axios';
import LoadingBox from '../../Components/LoadingBox/LoadingBox';


export default function TarifScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchUsers = async () => {
    
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        
          const response = await axios.get(
            "http://localhost:8000/api/listes/abonements",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers(response.data.Abonnements);
          console.log(response)
          setLoading(false)
  
          console.log(response ,'liste abonnement');
        
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    useEffect(() => {
      fetchUsers();
    }, []);
  return (
    <div>
        {/* {loading ? (
        <LoadingBox />
         ) : ( */}
        <>
        <NavbarUser />
        <div style={{marginTop:'60px'}}>
        <div className="pricing-banner">
          <h1 className='mb-4 mt-4 text-white'>Choisissez le plan qui vous convient le mieux</h1>
          <h4 className='text-white'>Découvrez nos offres exclusives</h4>
        </div>
        <div style={{height:'10px', width:'100%', backgroundColor:'#FFB703'}}></div>
        <div>
                <ButtonWashapp/>
          </div>
        </div>
        <div className='content_container_price'>
            <Underline text='Les differents plan pour vos business'/>
            <div>
            
              <div className=" container container1  mt-5 mb-5" id='container1'>
             
                <div className="card card-1 content_price_1">
                    <h2>Forfait mensuel</h2>
                    <h3>$30<span></span></h3>
                    
                    <ul>
                    
                    <li>✓Collaborateurs illimités</li>
                    <li>✓Évaluation dynamique  des collaboratives à 360°</li>
                    <li>✓Retroaction instantanée </li>
                    <li>✓Agrégation automatique des résultats </li>
                   <li> ✓Questionnaire d'évaluation personnalisable </li>
                    <li>✓Evaluation Anonyme </li>
                    <li>✓Feedback événement illimité </li>
                    <li>✓Gestion des liens hiérarchique </li>
                    <li>✓Assistance 24h/24</li>
                    
                    </ul>
                    <Button className="select1"><Link to={'/devis_contact'} style={{textDecoration:'none', color:'white'}}>Je choisis ce plan</Link></Button>
                </div>
                
                <div className="card card-2 hot-badge content_price_1">
                    <h2 style={{color:'#fff'}}>Forfait annuel</h2>
                    <h3>$270<span></span></h3>
                    
                    <ul>
                    <li>✓Collaborateurs illimités</li>
                    <li>✓Évaluation dynamique  des collaboratives à 360°</li>
                    <li>✓Retroaction instantanée </li>
                    <li>✓Agrégation automatique des résultats </li>
                   <li> ✓Questionnaire d'évaluation personnalisable </li>
                    <li>✓Evaluation Anonyme </li>
                    <li>✓Feedback événement illimité </li>
                    <li>✓Gestion des liens hiérarchique </li>
                    <li>✓Assistance 24h/24</li>
                    </ul>
                    <Button className="select1"><Link to={'/devis_contact'} style={{textDecoration:'none', color:'white'}}>Je choisis ce plan</Link></Button>
                </div>
                <div className="card card-3 content_price_1">
                    <h2>Forfait à vie</h2>
                    <h3>$600<span></span></h3>
                    
                    <ul>
                    <li>✓Collaborateurs illimités</li>
                    <li>✓Évaluation dynamique  des collaboratives à 360°</li>
                    <li>✓Retroaction instantanée </li>
                    <li>✓Agrégation automatique des résultats </li>
                   <li> ✓Questionnaire d'évaluation personnalisable </li>
                    <li>✓Evaluation Anonyme </li>
                    <li>✓Feedback événement illimité </li>
                    <li>✓Gestion des liens hiérarchique </li>
                    <li>✓Assistance 24h/24</li>
                    </ul>
                    <Button className="select1"><Link to={'/devis_contact'} style={{textDecoration:'none', color:'white'}}>Je choisis ce plan</Link></Button>
                </div>
              </div>
            

            </div>

        </div>
          <Footer />
        {/* <a className="creator-link" href="https://www.kantorweb.com/" target="_blank">KantorWeb.com</a> */}
        </>
        {/* )}  */}
    </div>
  )
}
