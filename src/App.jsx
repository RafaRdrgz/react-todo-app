import { useState } from 'react';
import { useEffect } from "react";
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { handleLogin as loginService, handleLogout as logoutService } from './services/authService';


const App = () => {

//Estados necesarios para el login
  const [isLoggedIn, setIsLoggedIn] = useState(false); //booleanos para setear si el usuario está logueado y para preguntar si hay algun usuario logueado
  const [user, setUser] = useState(null); //Estados para manejar los datos del usuario y para establecer un usuario como logueado


  // Función que maneja el login
  const handleLogin = async (email, password) => {
    try {
      const userData = await loginService(email, password); // Usamos la función del servicio
      setUser(userData); // Guardamos los datos del usuario
      setIsLoggedIn(true); // Marcamos al usuario como logueado
    } catch (error) {
      alert(error.message);
    }
  };

// Función que maneja el logout
const handleLogout = () => {
  setUser(logoutService()); // Limpiamos el estado de usuario
  setIsLoggedIn(false);
 };


  useEffect(() => {

    // Verificamos si el token está en el localStorage al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); //En caso de que si, iniciamos sesión
    }

    document.title = "React To-Do App"; // Cambia el título de la pestaña
  }, []);

  //Componentes que se van a renderizar
  const headerComponent = <Header isLoggedIn={isLoggedIn} user={user} />; //Por defecto false y null
  const mainContent = isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} user={user} /> : <Login handleLogin={handleLogin} />; // Por defecto false y null
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