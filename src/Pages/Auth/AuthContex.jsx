import React, {createContext, useContext, useEffect, useState} from 'react'
const AuthContext= createContext()

export const AuthProvider = ({ children })=>{

    const [isAuthentificated, setIsAuthenticated]=useState(false)
    const [userRole, setUserRole] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("tokencle");
        const role = localStorage.getItem("rolecle");

    }, [])
    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
      };

      const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
      };
    return (
        <AuthContext.Provider value={{ isAuthentificated, userRole, login,  logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
    export const useAuth = () => useContext(AuthContext);



    
