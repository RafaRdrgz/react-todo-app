import { API_URL_LOGIN } from './config';
import axios from 'axios'; //Peticiones http desce este fichero


// Función para manejar el login
export const loginService = async (email, password) => {

  try {
    // Hacemos la solicitud POST al backend para autenticar al usuario
    const response = await axios.post(API_URL_LOGIN, { email, password });

    // Obtenemos los datos del usuario y el token de la respuesta
    const { token } = response.data;

    // Guardamos el token en el localStorage
    localStorage.setItem('token', token);

    // Devolvemos los datos del usuario
    return token;

  } catch (error) {
    
    console.error('Error al iniciar sesión:', error.response?.data || error.message);

    // Lanzamos un error más específico dependiendo del código de estado
    if (error.response?.status === 401) {
      throw new Error('Correo o contraseña incorrectos.');
    } else {
      throw new Error('Error al conectar con el servidor. Intenta nuevamente.');
    }
  }

};

// Función para manejar el logout
export const logoutService = () => {
  // Limpiamos el localStorage y el estado de la sesión
  localStorage.removeItem('token');
  return null;
};