import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './ForgotPassWord.css'

export default function ForgotPassWord() {
    const [email, setEmail]=useState('')
    const [message, setMessage]=useState('')

    const handleEmailChange =  (e) =>{
        setEmail(e.target.value);
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/password/email',
            {email});
            setMessage(response.data.message)
           
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "message  avec succès!",
            });
            setEmail('')
            
        } catch (error) {
            
        }
    }
  return (
    // <div>
    //     <h2>Saisi ton email</h2>
    //     <Form onSubmit={handleSubmit}>
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control 
    //         type='email'
    //         value={email}
    //         onChange={handleEmailChange}
    //         />
            
    //         <Button type=''>Envoyer</Button>

    //     </Form>

    // </div>
    <div className='wrapper_content_form'>
    <div className="content_login_main_glabal_form">
     
    
      <div className="login_container_content_main_middle2">
      <h4>Saisi ton email</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Label>Email</Form.Label>
            <div className="input_container_content_main_middle" >
            <FontAwesomeIcon icon={faEnvelope} className="icon_login_content_middle1 " />
            <Form.Control 
            style={{marginLeft: '0px'}}
            type='email'
            value={email}
            onChange={handleEmailChange}
            
            />
            </div>
            
            <Button type='submit' className='btn_login_baraka w-100'>Envoyer</Button>

        </Form>
    
       
               
       
        
      </div>
    </div>
     <div className='box_content_login'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    
     </div>
    </div>

  )
}
