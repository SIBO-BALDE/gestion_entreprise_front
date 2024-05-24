import React from 'react'
import './TarifScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser';
import Footer from '../../Components/User_Components/Footer/Footer';
import Underline from '../../Components/User_Components/Underline/Underline';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ButtonWashapp from '../../Components/User_Components/Buttons/ButtonWatsapp/ButtonWashapp';

export default function TarifScreen() {
  return (
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
      <div className=" container container1 d-flex justify-center mt-5 mb-5">
        <div className="card card-1 content_price_1">
            <h2>Free</h2>
            <h3>0FCFA<span>/mo.</span></h3>
            <p>Pour les debut debutant </p>
            <ul>
            <li className="aval">À 2 utilisateurs</li>
            <li className="aval">5 evaluation/an </li>
            <li className="aval">1 notification</li>
            <li className="unaval">24/7 support</li>
            </ul>
            <Button className="select1"><Link to={'/devis_contact'} style={{textDecoration:'none', color:'white'}}>Essayez gratuitement</Link></Button>
        </div>
        <div className="card card-2 hot-badge content_price_1">
            <h2 style={{color:'#fff'}}>Standard</h2>
            <h3>49FCFA<span>/mo.</span></h3>
            <p>Pour les professionnels</p>
            <ul>
            <li className="aval">À 10 utilisateurs</li>
            <li className="aval">15 evaluation/an</li>
            <li className="aval">10 notification</li>
            <li className="unaval">24/7 support</li>
            </ul>
            <Button className="select1"><Link to={'/devis_contact'} style={{textDecoration:'none', color:'white'}}>Choisi ton plan</Link></Button>
        </div>
        <div className="card card-3 content_price_1">
            <h2>Premium</h2>
            <h3>99FCFA<span>/mo.</span></h3>
            <p>Pour les grands entreprises</p>
            <ul>
            <li className="aval">À 200 utilisateurs</li>
            <li className="aval">40 evaluation/an </li>
            <li className="aval">Illimité</li>
            <li className="aval">24/7 support</li>
            </ul>
            <Button className="select1"><Link to={'/devis_contact'} style={{textDecoration:'none', color:'white'}}>Choisi ton plan</Link></Button>
        </div>
      </div>

    </div>
      <Footer />
    {/* <a className="creator-link" href="https://www.kantorweb.com/" target="_blank">KantorWeb.com</a> */}
    </>
  )
}
