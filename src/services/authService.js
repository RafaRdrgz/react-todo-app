import axios from 'axios'; //Peticiones http

// Función para manejar el login
export const handleLogin = async (email, password) => {
  try {
    // Hacemos la solicitud POST al backend para autenticar al usuario
    const response = await axios.post('http://localhost:5000/login', { email, password });

    // Obtenemos los datos del usuario y el token de la respuesta
    const { userData, token } = response.data;

    // Guardamos el token en el localStorage
    localStorage.setItem('token', token);

    // Devolvemos los datos del usuario
    return userData;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Credenciales inválidas. Intenta nuevamente.');
  }
};

// Función para manejar el logout
export const handleLogout = () => {
  // Limpiamos el localStorage y el estado de la sesión
  localStorage.removeItem('token');
  return null;
};