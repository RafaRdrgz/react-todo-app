import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from "react";
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { loginService, logoutService, refreshTokenService } from './services/authService';


const App = () => {

//Estados necesarios para el login
  const [isLoggedIn, setIsLoggedIn] = useState(false); //booleanos para setear si el usuario está logueado y para preguntar si hay algun usuario logueado
  const [user, setUser] = useState(null); //Estados para manejar los datos del usuario y para establecer un usuario como logueado
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error


  //Se ejecuta cuando carga la aplicación y trata de ver si hay alguna sesión iniciada previamente
  useEffect(() => {

    // Verificamos si el token está en el localStorage al cargar la aplicación
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    //console.log("Access Token:", localStorage.getItem('accessToken'));
    //console.log("Refresh Token:", localStorage.getItem('refreshToken'));


    if (accessToken) {

      const decodedToken = jwtDecode(accessToken);

      if(!isExpired(decodedToken.exp)){ // si el token existe y no ha expirado, establezco los datos del usuario

        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          name: decodedToken.name,
        });

        setIsLoggedIn(true); //iniciamos sesión

      }

    } else if (refreshToken){ //Si no hay accessToken pero el refresh existe

      const newAccessToken = refreshTokenService(refreshToken);
      const decodedToken = jwtDecode(newAccessToken);

      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
      });

      setIsLoggedIn(true); //iniciamos sesión

    } // si no se cumple nada, los estados quedan en null y false.

    document.title = "React To-Do App"; // Cambia el título de la pestaña
  }, []);



//Función para ver si el JWT ha expirado

const isExpired = (exp) => {

    const currentTime = Date.now() / 1000; //convierto a segundos

    if(exp < currentTime) { return true } // el token ha expirado

    return false;

 }


 const showLoginError = (errorMessage) => {

    setErrorMessage(errorMessage); // Establecemos el mensaje de error
    setTimeout(() => setErrorMessage(''), 3000); // El mensaje desaparecerá después de 3 segundos
 }


  // Función que maneja el login
  const handleLogin = async (email, password) => {
    try {
      const accessToken = await loginService(email, password); // Usamos la función del servicio
      const decodedToken = jwtDecode(accessToken);
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
      }); // Guardamos los datos del usuario
      setIsLoggedIn(true); // Marcamos al usuario como logueado
      setErrorMessage(""); // Limpio el mensaje de error
    } catch (error) {

      showLoginError(error.message);
    }
  };



// Función que maneja el logout
const handleLogout = async () => {
  try {
  
    const logoutMessage = await logoutService(user.id); // Envía la solicitud de logout al backend

    console.log(logoutMessage);
    
    setUser(null); // Limpia el usuario
    setIsLoggedIn(false); // Cambia el estado de sesión

  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};


  //Componentes que se van a renderizar dependiendo de los estados

  const headerComponent = <Header isLoggedIn={isLoggedIn} user={user} />; //Por defecto false y null
  const mainContent = isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} user={user} /> : <Login handleLogin={handleLogin} errorMessage = {errorMessage}  />; // Por defecto false y null
  const footerComponent = <Footer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />; //Por defecto false y null


  return (
    <div className="App">
      <div className='contenedor flex flex-col min-h-screen'>


        {headerComponent}

        <main className="main flex-1 flex flex-col justify-center items-center py-6 md:py-8 lg:py-10 xl:py-12 px-4 md:px-8 lg:px-12 xl:px-16">
          {mainContent}
        </main>

        {footerComponent}

      </div>
    </div>
  );
};


export default App;