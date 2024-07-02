
import React, { useEffect, useRef } from 'react';
import './ChiffresCles.css';
import Underline from '../Underline/Underline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

function ChiffresCles() {
  const numberElementsRef = useRef([]);
  const sectionRef = useRef(null);

  // Fonction pour incrémenter les chiffres
  function startCounting() {
    numberElementsRef.current.forEach((element, index) => {
      const targetNumber = parseInt(element.textContent);
      let currentNumber = 0;
      const counter = setInterval(() => {
        currentNumber += Math.ceil(targetNumber / 100); // Vitesse d'incrémentation
        if (currentNumber >= targetNumber) {
          clearInterval(counter);
          currentNumber = targetNumber;
        }
        element.textContent = currentNumber;
      }, 50); // Temps entre chaque incrémentation, en millisecondes
    });
  }

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Commencez à incrémenter les chiffres lorsque la section est visible
          startCounting();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    sectionObserver.observe(sectionRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ paddingTop: '20px', paddingBottom: '30px' }}>
      <div>
        <Underline text='Quelques chiffres clés' />
      </div>
      <div className='w-100 mt-5 mb-5 chiffre-flex-medias' id='chiffre-flex-medias'>
        <div className=' chiffre-flex-medias-content' id='chiffre-flex-medias-content'>
          <div className='content_main_chiffre1' >
            <FontAwesomeIcon icon={faUsers} className='content_main_icon_home' />
          </div>
          <div className='mt-4'>
            <h1 className='content_blue_home' ref={el => numberElementsRef.current[0] = el}>+2000</h1>
            <p>Employés <br /> évalués</p>
          </div>
        </div>
        <div className=' chiffre-flex-medias-content' id='chiffre-flex-medias-content'>
          <div className='content_main_chiffre1' >
            <FontAwesomeIcon icon={faBuilding} className='content_main_icon_home' />
          </div>
          <div className='mt-4'>
            <h1 className='content_orange_home' ref={el => numberElementsRef.current[1] = el}>1000+</h1>
            <p>Entreprise <br /> partenaires</p>
          </div>
        </div>
        <div className=' chiffre-flex-medias-content' id='chiffre-flex-medias-content'>
          <div className='content_main_chiffre1'>
            <FontAwesomeIcon icon={faFaceSmile} className='content_main_icon_home' />
          </div>
          <div className='mt-4'>
            <h1 className='content_blue_home'  ref={el => numberElementsRef.current[2] = el}>5000+</h1>
            <p>Resultats de <br /> satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChiffresCles;

