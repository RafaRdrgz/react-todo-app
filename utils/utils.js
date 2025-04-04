import jwtDecode from 'jwt-decode';


//Decodificar un token
export const decodeToken = (token) => {

    const decoded = jwtDecode(token);

    return decoded;
}


