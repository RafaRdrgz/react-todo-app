import { API_GOOGLE_AUTH } from './urlConfig';
import {setAccessToken, setRefreshToken } from '../../utils/tokenFuncs';
import axios from 'axios'; //Peticiones http desce este fichero


export const googleService = async (googleToken) => {
    try {
      const response = await axios.post(API_GOOGLE_AUTH, {
        token: googleToken,
      });
  
      const { accessToken, refreshToken } = response.data;

      if (!accessToken || !refreshToken) {
        throw new Error("Tokens no recibidos del servidor");
      }
  
      setAccessToken(accessToken);
      setRefreshToken(refreshToken); // si tu backend lo manda
  
      return accessToken;
  
    } catch (error) {
      console.error("Error en googleService:", error);
      throw new Error("Error al iniciar sesión con Google");
    }
  };