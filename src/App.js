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
import ForgotPassWord from './Components/User_Components/ForgotPassWord/ForgotPassWord';
import EditPassWord from './Components/User_Components/EditPassWord/EditPassWord';
import FormLien from './Components/User_Components/FormLien/FormLien';








function App() {


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
      <Route path="/forgetpassword" element={<ForgotPassWord />} />
      <Route path="/Editpassword" element={<EditPassWord />} />
      <Route path="/eventform/:token" element={<FormLien />} />
     


      {/* </Route> */}

      </Routes>
      </AuthProvider>
     
    </div>
  );
}

export default App;
