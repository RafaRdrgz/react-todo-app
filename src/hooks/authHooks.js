import { useState, useEffect } from 'react';
import { loginService, logoutService, refreshTokenService } from '../services/authService';
import { decodeToken } from '../../utils/utils';



// Función para verificar si el JWT ha expirado
const isExpired = (exp) => {
    const currentTime = Date.now() / 1000; // Convertimos a segundos
    return exp < currentTime; // El token ha expirado si su tiempo es menor que el actual
};



// Hook para gestionar el login, logout y la verificación del token JWT
export const useAuth = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  


    useEffect(() => {

      // Verificamos si el token está en el localStorage al cargar la aplicación
      const storedAccessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
  
      if (storedAccessToken) {

        const decodedToken = decodeToken(storedAccessToken);

        if (!isExpired(decodedToken.exp)) {

          setAccessToken(storedAccessToken);
          setIsLoggedIn(true);
        }

      } else if (refreshToken) {

        const newAccessToken = refreshTokenService(refreshToken);

        setAccessToken(newAccessToken);
        setIsLoggedIn(true);
      }

      document.title = 'React To-Do App';

    }, [])



  // Mostrar error de login
  const showLoginError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => setErrorMessage(''), 3000); // El mensaje desaparecerá después de 3 segundos
  };



  // Función para manejar el login
  const handleLogin = async (email, password) => {

    try {

      const newAccessToken = await loginService(email, password);

      setAccessToken(newAccessToken);
      setIsLoggedIn(true);
      setErrorMessage('');

    } catch (error) {
      showLoginError(error.message);
    }
  };


  // Función para manejar el logout
  const handleLogout = async (token) => {
    try {

      await logoutService(token);

      setAccessToken(null)
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return { isLoggedIn, accessToken, errorMessage, handleLogin, handleLogout };
}