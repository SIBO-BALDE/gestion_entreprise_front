import React from 'react'
import './AboutScreen.css';
import NavbarUser from '../../Components/User_Components/NavbarUser'
import Footer from '../../Components/User_Components/Footer/Footer'
import homme1 from '../../Images/homme1 1.png';
import { Image } from 'react-bootstrap';

export default function AboutScreen() {
  return (
    <div>
      
      <header>
      <NavbarUser />
      </header>

      <main>
      <div className='bann_about_aboutscreen'>
        <div className='ban_left_content_about'>
            <h1>BARAKA GATE</h1>
            <h6>Vous accompagne pour l’évaluation de vos équipe</h6>
        </div>
        <div className='ban_right_content_about'>
            <div className='ban_right_image_about_content1'><Image src={homme1} className='ban_right_image_about1' /></div>
            <div>
                <div className='ban_right_image_about_content2'><Image src={homme1} className='ban_right_image_about2' /></div>
                <div className='ban_right_image_about_content2'><Image src={homme1} className='ban_right_image_about2' /></div>
            </div>
        </div>
      </div>
      
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  )
}
