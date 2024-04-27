import React, {createContext, useContext, useEffect, useState} from 'react'
const AuthContext= createContext()

export const AuthProvider = ({ children })=>{

    const [isAuthentificated, setIsAuthenticated]=useState(false)
    const [userRole, setUserRole] = useState(null);
    const [UserToken, setUserToken] = useState(null);

    useEffect(()=>{
      const storedToken = localStorage.getItem("tokencle");
      const storedRole = localStorage.getItem("rolecle");

      if (!storedToken || !storedRole) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setUserRole(storedRole);
        setUserToken(storedToken); // Stockez le token dans le state
      }
    }, []);

    const login = (role, authToken) => {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserToken(authToken); // Stockez le token lors de la connexion
    };
  

    const logout = () => {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserToken(null); // Supprimez le token lors de la déconnexion
    };
    return (
        <AuthContext.Provider value={{ isAuthentificated, userRole, UserToken, login,  logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
    export const useAuth = () => useContext(AuthContext);



    
