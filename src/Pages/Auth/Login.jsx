import React, { useState } from 'react'
import './Login.css';
import { Button, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { emailPattern } from "../Regex/Regex";
import { passwordPattern } from "../Regex/Regex";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from '../Auth/AuthContex'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Images/Logo blanc.jpg'



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // import {useNavigation} from '@babel/generator'
  const navigate = useNavigate();
  const { login } = useAuth();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation des checksamps
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  
  });
  
  const [successeds, setSuccesseds] = useState({
    email: "",
    password: "",
  });
  const [validationStatus, setValidationStatus] = useState(false);

  // function validation
  const validateField = (name, value) => {
    let errorMessage = "";
    let successMessage = "";
  
    if (name === "email") {
      if (!value.trim()) {
        errorMessage = "L'email est obligatoire";
      } else if (!emailPattern.test(email)) {
        errorMessage = "L'email  invalide";
      } else {
        successMessage = "L'adresse est valide";
      }
    }
    else if (name === "password") {
      if (!value.trim()) {
        errorMessage = "Le mot de passe est obligatoire";
      } else if (value.trim().length < 7) {
        errorMessage = "Le mot de passe doit contenir au moins 8 chaines de caracteres";
      } else {
        successMessage = "Le mot de passe est valide";
      }
    }
    
  
  
  
    // Mettez à jour le state en utilisant le nom du champ actuel
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    setSuccesseds((prevSuccess) => ({
      ...prevSuccess,
      [name]: successMessage,
    }));
  
    const isValid = Object.values(errors).every((error) => !error);
    setValidationStatus(isValid);
  };



// function pour la connexion
  // const Handlelogin = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("tokencle");
  
  //   // Vérification si les champs sont vides
  //   if (!email || !password) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops!",
  //       text: "Les champs ne peuvent pas être vides!",
  //     });
  //     return;
  //   }
  
  //   // Vérification du format de l'email
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailPattern.test(email)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops!",
  //       text: "Le format de l'email n'est pas valide!",
  //     });
  //     return;
  //   }
  
  //   // Vérification de la longueur du mot de passe
  //   if (password.length < 8) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops!",
  //       text: "Le mot de passe doit comporter au moins 8 caractères!",
  //     });
  //     return;
  //   }
  
  //   const credentials = {
  //     email,
  //     password,
  //   };
  
  //   try {
  //     // const apiUrl = 'https://myfeedbaks360s.kevacom.com';
  //     const response = await axios.post('https://api.com.myfeedback360.com/api/login', credentials, 
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
   
      
  //     console.log(credentials, 'credentials');
  //     console.log(response, 'response');
  
  //     if (response.data.status === 402) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops!",
  //         text: "Ce compte a été bloqué!",
  //       });
  //       return;
  //     }
  
  //     if (response.status === 200) {
  //       const data = response.data;
  //       const tokenauth = data.token;
  //       const userRole = response.data.roles[0];
  
  //       console.log(tokenauth, 'cest le token');
  //       console.log(userRole, 'cest le role');
  //       localStorage.setItem("tokencle", tokenauth);
  //       localStorage.setItem("rolecle", userRole);
  //       login(userRole);
  
  //       if (userRole === "Admin") {
  //         navigate("/dashbordAdmin");
  //       } else if (userRole === "SuperAdmin") {
  //         navigate("/dashbordSuperAdmin");
  //       } else {
  //         navigate("/dashbordUser");
  //       }
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops!",
  //       text: "Ce compte n'existe pas!",
  //     });
  //     console.log(error);
  //   }
  // };

  const Handlelogin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("tokencle");

    // Vérification si les champs sont vides
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Les champs ne peuvent pas être vides!",
      });
      return;
    }

    // Vérification du format de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Le format de l'email n'est pas valide!",
      });
      return;
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Le mot de passe doit comporter au moins 8 caractères!",
      });
      return;
    }

    const credentials = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://api.myfeedback360.com/api/login",
        credentials,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );

      console.log(credentials, "credentials");
      console.log(response, "response");

      if (response.data.status === 402) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Ce compte a été bloqué!",
        });
        return;
      }

      if (response.status === 200) {
        const data = response.data;
        const tokenauth = data.token;
        const userRole = response.data.roles[0];

        console.log(tokenauth, "cest le token");
        console.log(userRole, "cest le role");
        localStorage.setItem("tokencle", tokenauth);
        localStorage.setItem("rolecle", userRole);
        login(userRole);

        if (userRole === "Admin") {
          navigate("/dashbordAdmin");
        } else if (userRole === "SuperAdmin") {
          navigate("/dashbordSuperAdmin");
        } else {
          navigate("/dashbordUser");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Ce compte n'existe pas!",
      });
      console.log(error);
    }
  };



  return (
   <div className='wrapper_content_form'>
    <div className="content_login_main_glabal_form">
     

      <div className="login_container_content_main_middle">
      <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
        <Link to={'/'}><Image src={logo} style={{width:'130px', height:'90px' , marginRight:'50px'}} /></Link>
      </div>
        <h2 style={{marginTop:'30px'}}>Connexion</h2>
        <form >
          
          <div className="input_container_content_main_middle">
            
            <FontAwesomeIcon icon={faEnvelope} className="icon_login_content_middle mt-2" style={{color:'#004573'}} />
            <input type="text" name="email" placeholder="Nom d'utilisateur" required 
             onChange={(e) =>{
              setEmail(e.target.value)
              validateField("email", e.target.value);
            }}
            />
            
          </div>
          <div className="input_container_content_main_middle">
            <FontAwesomeIcon icon={faLock} className="icon_login_content_middle mt-2"  style={{color:'#004573'}}/>
            <input 
              type={showPassword ? "text" : "password"} 
              onChange={(e) =>{
                setPassword(e.target.value)
                validateField("password", e.target.value);
              }}
              name="password" 
              placeholder="Mot de passe" 
              required 
            />
            <span className="password_toggle_login_form" onClick={togglePasswordVisibility} style={{color:'#004573'}}>
              {showPassword ? < FontAwesomeIcon icon={faEyeSlash} /> : < FontAwesomeIcon icon={faEye} />}
            </span>
          </div>
             
              <div >
                <Link to={'/forgetpassword'} style={{textDecoration:'none', color:'#004573', float:'right', marginRight:'30px'}}> Mot de passe oublier?</Link>
              </div>
          
          <Button className='btn_login_baraka' onClick={Handlelogin}>Se connecter</Button>
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
