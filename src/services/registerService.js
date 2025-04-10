import { API_URL_REGISTER } from './urlConfig';
import { setAccessToken, setRefreshToken } from '../../utils/tokenFuncs';
import axios from 'axios'; //Peticiones http desce este fichero

export const registerLocalService = async(name, email, password) => {
  
    try{
  
      // Hacemos la solicitud POST al backend para autenticar al usuario
      const response = await axios.post(API_URL_REGISTER, {name, email, password, google_id: null, auth_provider: 'local'});
  
      const {accessToken, refreshToken} = response.data;
  
      //console.log(accessToken, refreshToken);

      if (!accessToken || !refreshToken) {
        throw new Error("Tokens no recibidos del servidor");
      }

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
  
      return accessToken;
  
    } catch (error){
  
      console.error('Error al registrar usuario:', error.response?.data || error.message);
  
    }
  
  }