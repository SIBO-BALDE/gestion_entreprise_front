import React, { useState } from 'react'
import './Login.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
   <div className='wrapper_content_form'>
    <div className="content_login_main_glabal_form">
      <div className="login_container_content_main_middle">
        <h2>Connexion</h2>
        <form>
          <div className="input_container_content_main_middle">
            
            <FontAwesomeIcon icon={faUser} className="icon_login_content_middle mt-2" />
            <input type="text" name="username" placeholder="Nom d'utilisateur" required />
          </div>
          <div className="input_container_content_main_middle">
            <FontAwesomeIcon icon={faLock} className="icon_login_content_middle mt-2" />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Mot de passe" 
              required 
            />
            <span className="password_toggle_login_form" onClick={togglePasswordVisibility}>
              {showPassword ? < FontAwesomeIcon icon={faEyeSlash} /> : < FontAwesomeIcon icon={faEye} />}
            </span>
          </div>
          <input type="submit" value="Se connecter" />
        </form>
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
