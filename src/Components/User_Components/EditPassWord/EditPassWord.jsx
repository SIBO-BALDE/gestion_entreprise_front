import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditPassWord.css';

export default function EditPassWord() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const navigate =useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        const emailFromUrl = queryParams.get('email');
        
        console.log('Token:', tokenFromUrl);
        console.log('Email:', emailFromUrl);
        
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [location]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ token, email, password, password_confirmation: passwordConfirmation });
        
        if (!token || !email) {
            Swal.fire('Error', 'Token and email are required.', 'error');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8000/api/password/reset', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            // setMessage(response.data.message);
            Swal.fire('Success', response.data.message, 'success');
            navigate('/login')
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                setErrors(error.response.data.errors || {});
                Swal.fire('Error', 'There was an error resetting your password. Please try again.', 'error');
            } else {
                setMessage('Une erreur s\'est produite. Veuillez réessayer.');
                Swal.fire('Error', 'Une erreur s\'est produite. Veuillez réessayer.', 'error');
            }
        }
    }

    return (
        // <div>
        //     <h2>Saisissez votre nouveau mot de passe</h2>
        //     <Form onSubmit={handleSubmit}>
        //         <Form.Group>
        //             <Form.Label>Mot de passe</Form.Label>
        //             <Form.Control 
        //                 type='password'
        //                 value={password}
        //                 onChange={handlePasswordChange}
        //                 required
        //             />
        //         </Form.Group>
        //         <Form.Group>
        //             <Form.Label>Confirmation du mot de passe</Form.Label>
        //             <Form.Control 
        //                 type='password'
        //                 value={passwordConfirmation}
        //                 onChange={handlePasswordConfirmationChange}
        //                 required
        //             />
        //         </Form.Group>
        //         <Button type='submit'>Réinitialiser le mot de passe</Button>
        //     </Form>
        //     {message && <p>{message}</p>}
        //     {Object.keys(errors).length > 0 && (
        //         <ul>
        //             {Object.keys(errors).map((key, index) => (
        //                 <li key={index}>{errors[key].join(', ')}</li>
        //             ))}
        //         </ul>
        //     )}
        // </div>

<div className='wrapper_content_form'>
<div className="content_login_main_glabal_form">
 

  <div className="login_container_content_main_middle">

    <h4 style={{marginTop:'30px'}}>Nouveau mot de passe</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Mot de passe</Form.Label>
                    <div className="input_container_content_main_middle">
                    <FontAwesomeIcon icon={faLock} className="icon_login_content_middle mt-1" />
                    <Form.Control 
                         type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                     <span className="password_toggle_login_form2" onClick={togglePasswordVisibility}>
                    {showPassword ? < FontAwesomeIcon icon={faEyeSlash} /> : < FontAwesomeIcon icon={faEye} />}
                    </span>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirmation du mot de passe</Form.Label>
                    <div className="input_container_content_main_middle">
                    <FontAwesomeIcon icon={faLock} className="icon_login_content_middle mt-1" />
                    <Form.Control 
                         type={showPassword ? "text" : "password"} 
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                        required
                    />
                    <span className="password_toggle_login_form2" onClick={togglePasswordVisibility}>
                    {showPassword ? < FontAwesomeIcon icon={faEyeSlash} /> : < FontAwesomeIcon icon={faEye} />}
                    </span>
                    </div>
                </Form.Group>
                <Button type='submit' className='btn_login_baraka'>Réinitialiser le mot de passe</Button>
            </Form>
            {/* {message && <p>{message}</p>} */}
            {/* {Object.keys(errors).length > 0 && (
                <ul>
                    {Object.keys(errors).map((key, index) => (
                        <li key={index}>{errors[key].join(', ')}</li>
                    ))}
                </ul>
            )} */}
   
    
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

    );
}
