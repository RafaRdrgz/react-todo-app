import jwtDecode from 'jwt-decode';


//Decodificar un token
export const decodeToken = (token) => {

    const decoded = jwtDecode(token);

    return decoded;
}


//Establecer accessToken
export const setAccessToken = (token) => {


    localStorage.setItem('accessToken', token);

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