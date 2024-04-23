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
      <Route path="dashbordAdmin" element={<DashbordAdmin />}></Route>
      <Route path="dashbordUser" element={<DashboardUser />}></Route>
      </Routes>
      </AuthProvider>
     
    </div>
  );
}

export default App;
