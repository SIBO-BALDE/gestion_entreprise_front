import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import './NavbarUser.css';
import { Image } from 'react-bootstrap';
import logo from '../../Images/logo.png';


export default function NavbarUser() {
   // État pour suivre le lien actif
   const [linkActive, setLinkActive] = useState('');
   const [linkButtonActive, setLinkButtonActive] = useState('');
   // Dans cet exemple, useLocation de React Router est utilisé pour obtenir 
   //l'objet de localisation qui contient des informations sur l'URL actuelle

   const location = useLocation();
  const locationBtn = useLocation();

  useEffect(() => {
    // Mise à jour de l'état lorsque l'emplacement (route) change
    setLinkActive(location.pathname);
  }, [location]);


  useEffect(() => {
    // Mise à jour de l'état lorsque l'emplacement (route) change
    setLinkButtonActive(locationBtn.pathname);
  }, [locationBtn]);
  return (
    <div className='navbar_glabal_content'>
        {/**************************** Navbar component debut ****************************/}
        
        <Navbar expand="lg" className="navbar_body" style={{backgroundColor:'#fff', boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px',}}>
          <Container fluid>
           <Navbar.Brand href="/">
            <Image src={logo}  className='logo_conntent_navbar'/>
           </Navbar.Brand>
           <Navbar.Toggle aria-controls="navbarScroll" />
           <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto  my-lg-0 navbarcontent" style={{marginLeft:'350px'}}>
            <Link to={"/"} id='link_navbar_menu'  style={{fontWeight:'500px', color:'#004573', borderBottom: linkActive === '/' ? '3px solid #FFB703' : 'none'}}>Accueil</Link>
            <Link to={"/modeles"} id='link_navbar_menu'  style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px', borderBottom: linkActive === '/modeles' ? '3px solid #FFB703' : 'none'}}>Modéles</Link> 
            <Link to={"/about"} id='link_navbar_menu' style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px', borderBottom: linkActive === '/about' ? '3px solid #FFB703' : 'none'}}>A propos</Link> 
            <Link to={"/contact"} id='link_navbar_menu' style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px', borderBottom: linkActive === '/contact' ? '3px solid #FFB703' : 'none'}}>Contact</Link> 
          </Nav>

          <Button  style={{marginRight:'80px', backgroundColor:'#004573', border:'none'}}>
            <Link to={'/login'} style={{textDecoration:'none', color:'white'}}>Connexion</Link>
          </Button>
           </Navbar.Collapse>
          </Container>
        </Navbar>

        {/**************************** Navbar component  fin****************************/}
      
    </div>
  )
}
