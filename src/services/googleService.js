import { API_GOOGLE_AUTH } from './urlConfig';
import {setAccessToken, setRefreshToken, removeTokens } from '../../utils/tokenFuncs';
import { decodeToken } from '../../utils/tokenFuncs';
import axios from 'axios'; //Peticiones http desce este fichero


export const googleLoginService = async (googleToken) => {

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


  export const googleLogoutService = async (googleToken) => {


    try{
      google.accounts.id.disableAutoSelect();

      const decodedToken = decodeToken(googleToken); // Decodifica el token de Google
      const googleUserId = decodedToken.sub; // Obtén el ID del usuario de Google
    
      google.accounts.id.revoke(googleUserId, () => { console.log("Revoked Google session");});

    }catch(error){

      console.log("Error on google logout:", error);
      throw new Error("Error al cerrar sesión de Google");

    } finally {

      removeTokens();
    }
  };