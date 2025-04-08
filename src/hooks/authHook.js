import { useState, useEffect } from 'react';
import { loginService, registerLocalService, logoutService, refreshTokenService } from '../services/authService';
import { getAccessToken, getRefreshToken, setAccessToken ,decodeToken } from '../../utils/tokenFuncs';



// Función para verificar si el JWT ha expirado
const isExpired = (exp) => {
    const currentTime = Date.now() / 1000; // Convertimos a segundos
    return exp < currentTime; // El token ha expirado si su tiempo es menor que el actual
};



// Hook para gestionar estados de ususrio, login, logout y la verificación del token JWT
export const useAuth = () => {
    

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionAccessToken, setSessionAccessToken] = useState(null);


  useEffect(() => { onLoadLogin()}, []);



  //Intenta loguear al usuario al cargar la aplicación
  const onLoadLogin = () => {

      // Verificamos si el token está en el localStorage al cargar la aplicación
      const storedAccessToken = getAccessToken();
      const storedRefreshToken = getRefreshToken();

      if (storedAccessToken) {

        const decodedToken = decodeToken(storedAccessToken);

        if (!isExpired(decodedToken.exp)) {

          setAccessToken(storedAccessToken);
          setSessionAccessToken(storedAccessToken);
          setIsLoggedIn(true);
        }

      } else if (storedRefreshToken) {

        const newAccessToken = refreshTokenService(storedRefreshToken);

        setAccessToken(newAccessToken);
        setSessionAccessToken(newAccessToken);
        setIsLoggedIn(true);
      }

      document.title = 'React To-Do App';

  }



  // Función para manejar el login
  const handleLogin = async (email, password) => {

      const newAccessToken = await loginService(email, password);

      setSessionAccessToken(newAccessToken);
      setIsLoggedIn(true);

  };


  // Función para manejar el registro
  const handleLocalRegister = async (name, email, password) => {

      const newAccessToken = await registerLocalService(name, email, password);

      setSessionAccessToken(newAccessToken);
      setIsLoggedIn(true);

  };

  // Función para manejar el logout
  const handleLogout = async (token) => {

      await logoutService(token);
      setSessionAccessToken(null)
      setIsLoggedIn(false);

  };


  return { isLoggedIn, sessionAccessToken, handleLogin, handleLocalRegister, handleLogout };

} 