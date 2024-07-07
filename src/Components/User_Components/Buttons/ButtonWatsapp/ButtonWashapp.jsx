import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './ButtonWashapp.css';
import { Tooltip } from 'react-tooltip';
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";

export default function ButtonWashapp() {

    const handleClickWatshappButton = async () => {
        let phoneNumber = 778854482;
        Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "De vouloir communiquer avec l'admin?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#004573',
          cancelButtonColor: '#f00020',
          confirmButtonText: "Oui, j'accepte!",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
          }
        });
    };

    return (
        <div>
            <Button className="whatsapp-button" onClick={handleClickWatshappButton}>
                <a 
                    data-tooltip-id="my-tooltip-multiline" 
                    data-tooltip-html="Besoin de plus d'information ?<br />Cliquez sur le button pour nous contacter">
                    <FontAwesomeIcon icon={faWhatsapp} className='icon-whattsapp' />
                </a>
                <Tooltip id="my-tooltip-multiline" 
                    style={{ backgroundColor: "#25D366", color: "#fff", fontSize: '15px', fontWeight: 'bold' }}
                />
            </Button>
        </div>
    );
}
