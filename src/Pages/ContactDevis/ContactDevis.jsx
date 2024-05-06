import React from 'react'
import './ContactDevis.css';
import { Button } from 'react-bootstrap';

export default function ContactDevis() {
  return (
    <div>
        <div className="container_devis_form">
        <form action="#" method="post">
            <h2 className='content_title_devis'>Contact Us</h2>

            

            <div className='d-flex justify-around'>
            <div className="input-group">
                <label for="name">Prenom:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className="input-group">
                <label for="text">Nom:</label>
                <input type="text" id="text" name="text" required />
            </div>
            </div>

            <div className='d-flex justify-around'>
            <div className="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="input-group">
                <label for="tel">Télephone:</label>
                <input type="tel" id="tel" name="tel" required />
            </div>

            </div>
            <div className='d-flex justify-around'>
            <div className="input-group">
                <label for="text">Entreprise:</label>
                <input type="text" id="text" name="text" required />
            </div>
            <div className="input-group">
                <label for="text">Poste:</label>
                <input type="text" id="text" name="text" required />
            </div>

            </div>

            <div className="input-group">
                <label for="email">Nombre d'emploie:</label>
                <input type="number" id="number" name="number" required />
            </div>

            <div className="input-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <Button type="submit" classNameName='content_title_devis_button_content'>Demander devis</Button>
        </form>
    </div>
      
    </div>
  )
}
