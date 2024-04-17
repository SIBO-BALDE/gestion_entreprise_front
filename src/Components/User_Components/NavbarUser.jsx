import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavbarUser() {
  return (
    <div className='navbar_glabal_content'>
        {/**************************** Navbar component debut ****************************/}
        
        <Navbar expand="lg" className="navbar_body" style={{backgroundColor:'#fff', boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px',}}>
          <Container fluid>
           <Navbar.Brand href="#">LOGO</Navbar.Brand>
           <Navbar.Toggle aria-controls="navbarScroll" />
           <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto  my-lg-0 navbarcontent" style={{marginLeft:'350px'}}>
            <Nav.Link href="#action1" id='link_navbar_menu' style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px' }}>Accueil</Nav.Link>
            <Nav.Link href="#action2" id='link_navbar_menu' style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px'}}>Modéles</Nav.Link> 
            <Nav.Link href="#action2" id='link_navbar_menu' style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px'}}>A propos</Nav.Link> 
            <Nav.Link href="#action2" id='link_navbar_menu' style={{fontWeight:'500px', color:'#004573' , marginLeft:'30px'}}>Contacter</Nav.Link> 
          </Nav>

          <Button  style={{marginRight:'80px', backgroundColor:'#004573', border:'none'}}>Connexion</Button>
           </Navbar.Collapse>
          </Container>
        </Navbar>

        {/**************************** Navbar component  fin****************************/}
      
    </div>
  )
}
