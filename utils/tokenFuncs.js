import { jwtDecode } from 'jwt-decode';


//Decodificar un token
export const decodeToken = (token) => {

    const decoded = jwtDecode(token);

    return decoded;
}


//Establecer accessToken
export const setAccessToken = (token) => {


    localStorage.setItem('accessToken', token);

}

export const getAccessToken = () => {

   const accessToken = localStorage.getItem('accessToken');
   return accessToken;
}


export const getRefreshToken = () => {

    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
 }

//Establecer refreshToken
export const setRefreshToken = (token) => {


    localStorage.setItem('refreshToken', token);

}


//Eliminar access y refresh Tokens
export const removeTokens = () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

}