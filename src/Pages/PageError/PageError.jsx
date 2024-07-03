import React from 'react'
import './PageError.css';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import error1 from './../../Images/ErrorImage1.jpeg'
import error3 from './../../Images/Logo_bleu-removebg-preview.png'
import { Typewriter } from 'react-simple-typewriter'


export default function PageError() {
  const handleType = (count) => {
    console.log(count)
  }
  const handleDone = () => {
    console.log(`Done after 5 loops!`)
  }
  const handleType2 = (counttwo) => {
    console.log(counttwo)
  }
  const handleDone2 = () => {
    console.log(`Done after 5 loops!`)
  }
  return (
    
    <div className="error-container">
      <div className='erreor-content-main'>
        <Image src={error1} className='image-erreor-content' />
      </div>
      <div className="error-desc" style={{backgroundColor:'#004573', paddingLeft:'20px',  paddingRight:'20px'}}>
        <div >
          <div style={{height:'420px'}} id='logo-error-main'>
            <Image src={error3} className=''style={{height:'100%'}} />
          </div>
          <div>
              <h2 style={{color:'#FFB703',fontWeight:'bold'}}>
              <span style={{  fontWeight: 'bold' }}>
                        
                        <Typewriter
                          words={['Bienvenue! à MY FEEDBACK 360°']}
                          loop={true}
                          cursor
                          cursorStyle='_'
                          typeSpeed={70}
                          deleteSpeed={50}
                          delaySpeed={1000}
                          onLoopDone={handleDone}
                          onType={handleType}
                        />
              </span>
                </h2>
              <p style={{ color:'#fff',textAlign:'justify'}}>
                {/* Ce modéle  */}
               Nos ingénieurs travaillent activement sur la mise au point de ce
              modèle .Il n'est pas encore  prêts, mais ne désespérez pas! Nous vous 
              tiendrons informés dès qu'ils seront opérationnels. Merci de votre soutien!
              Merci de patienter on vous feras savoir dés qu'il sera opérationnel.
              </p>
              <p style={{ color:'#fff'}}><Link to={'/'} style={{textDecoration:'none', color:'#FFB703', fontWeight:'bolder'}}>Cliquer ici </Link>
              pour revenir à la page d'accueil</p>
          </div>

        </div>
      </div>
      

    </div>

    

  )
}
