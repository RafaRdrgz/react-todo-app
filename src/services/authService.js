import { API_URL_LOGIN, API_URL_LOGOUT, API_URL_REFRESH } from './urlConfig';
import { decodeToken } from '../../utils/utils';
import axios from 'axios'; //Peticiones http desce este fichero


// Función para manejar el login
export const loginService = async (email, password) => {

  try {

    // Hacemos la solicitud POST al backend para autenticar al usuario
    const response = await axios.post(API_URL_LOGIN, { email, password });

    // Obtenemos los datos del usuario y el token de la respuesta
    const { accessToken , refreshToken } = response.data;

    // Guardamos el token en el localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    //console.log('Tokens guardados:', localStorage.getItem('accessToken'), localStorage.getItem('refreshToken'));

    // Devolvemos el accessToken
    return accessToken;

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


//Función para cerrar sesión
export const logoutService = async (accessToken) => {

  try {

      //console.log('Token enviado en logout:', accessToken);

      if (!accessToken) {
        throw new Error('No token available');
      }

      const decodedToken = decodeToken(accessToken); // Obtiene el token del localStorage
      const userId = decodedToken.id; //extraigo el id del usuario a hacer logout

      const logoutResponse = await axios.post( API_URL_LOGOUT,
                          { userId }, // Enviar el ID del usuario en el cuerpo
                          {
                            headers: {
                              'Content-Type': 'application/json',
                               'Authorization': `Bearer ${accessToken}`, // Enviar el token en los headers
                            },
                          }
        );

        const logoutMessage = logoutResponse.data.message;

        //console.log('Respuesta del backend:', logoutMessage);

        return logoutMessage;


  } catch (error) {

    console.error('Error al cerrar sesión:', error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo en el frontend

  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

}


// Función para refrescar el token cuando expira
export const refreshTokenService = async (refreshToken) => {

  if (!refreshToken) {
    console.error('No refresh token provided');
    return null;
  }

  try {

    const response = await axios.post(API_URL_REFRESH, { refreshToken });
    const { newAccessToken } = response.data;

    if (newAccessToken) {

      // Guardamos el nuevo access token en el localStorage
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;

    } else {

      console.error('No new access token received from backend');
      return null;
    }

  } catch (error) {

    console.error('Error al refrescar el token:', error.response?.data || error.message);
    return null;

  }

};