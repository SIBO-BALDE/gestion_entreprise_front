import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutScreen from './Pages/AboutScreen/AboutScreen';
import ContactScreen from './Pages/ContactScreen/ContactScreen';
import HomeScreen from './Pages/HomeScreen/HomeScreen';
import ModeleScreen from './Pages/ModeleScreen/ModeleScreen';
import Login from './Pages/Auth/Login';
import DashbordAdmin from './Pages/Dashboards/DashboardAdmin/DashboardAdmin';
import DashboardUser from './Pages/Dashboards/DashboardUser/DashboardUser';
import { AuthProvider } from './Pages/Auth/AuthContex';
import ProtectedRoutes from './Pages/Utils/ProtectedRoutes';
import GestionMessageDetail from './Pages/CRUD/GestionMessage/GestionMessageDetail';
import PageError from './Pages/PageError/PageError';
import Slides from './Components/User_Components/Slides/Slides';
import TarifScreen from './Pages/TarifScreen/TarifScreen';
import ContactDevis from './Pages/ContactDevis/ContactDevis';
import axios from 'axios';
import { useEffect } from 'react';
import GestionDevisDetail from './Pages/CRUD/GestionDevis/GsetionDevisDetail';
import DashboardSuperAdmin from './Pages/Dashboards/DashboardSuperAdmin/DashboardSuperAdmin';








function App() {

  // const refreshAccessToken = async () => {
  //   const token = localStorage.getItem("tokencle");
  //   if (!token) {
  //     console.error("Token absent !");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8000/api/refresh',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     const newAccessToken = response.data.access_token;
  
  //     localStorage.setItem("tokencle", newAccessToken);
  
  //     console.log("Token rafraîchi avec succès !");
  //   } catch (error) {
  //     console.error("Erreur lors du rafraîchissement du token :", error);
  //   }
  // };
  
  // const checkTokenExpiration = () => {
  //   const accessToken = localStorage.getItem("tokencle");
  //   if (!accessToken) {
  //     console.error("Token absent !");
  //     return;
  //   }
  
  //   const { exp } = jwtDecode(accessToken); // Assure-toi d'avoir jwt-decode installé
  
  //   // Convertir la date d'expiration du token en secondes
  //   const expirationTimeInSeconds = exp - Date.now() / 1000;
  
  //   // Si le token expire dans moins de 5 minutes, rafraîchis-le
  //   if (expirationTimeInSeconds < 300) {
  //     refreshAccessToken();
  //   }
  // };
  
  // // Vérifie périodiquement l'expiration du token
  // const tokenRefreshInterval = setInterval(checkTokenExpiration, 60000); 
  
  // // Assure-toi d'arrêter le rafraîchissement automatique lorsque le composant est démonté
  // return () => clearInterval(tokenRefreshInterval); 
  



  return (
    <div >
      <AuthProvider>
      <Routes>
      <Route path="/" element={<HomeScreen />}></Route>
      <Route path="about" element={<AboutScreen />}></Route>
      <Route path="modeles" element={<ModeleScreen />}></Route>
      <Route path="contact" element={<ContactScreen />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="error" element={<PageError />}></Route>
      {/* <Route path="slide" element={<Slides />}></Route> */}
      <Route path="tarif" element={<TarifScreen />}></Route>
      <Route path="devis_contact" element={<ContactDevis />}></Route>
      
      {/* <Route  element={<ProtectedRoutes />}> */}
      <Route path="dashbordAdmin" element={<DashbordAdmin />}></Route>
      <Route path="dashbordSuperAdmin" element={<DashboardSuperAdmin />}></Route>
      <Route path="dashbordUser" element={<DashboardUser />}></Route>
      <Route path="/messagedetail/:id" element={<GestionMessageDetail />} />
      <Route path="/abonnementdetail/:id" element={<GestionDevisDetail />} />
     


      {/* </Route> */}

      </Routes>
      </AuthProvider>
     
    </div>
  );
}

export default App;
