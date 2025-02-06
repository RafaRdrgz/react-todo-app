import { useState } from 'react';
import { useEffect } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
//import TodoList from './components/TodoList';



//import TodoList from './components/TodoList';
//import TodoForm from './components/TodoForm';

const App = () => {

//Estados necesarios para el login
  const [isLoggedIn, setIsLoggedIn] = useState(false); //booleanos para setear si el usuario está logueado y para preguntar si hay algun usuario logueado
  const [user, setUser] = useState(null); //Estados para manejar los datos del usuario y para establecer un usuario como logueado

  // Función que maneja el login
  const handleLogin = (userData) => {
    setUser(userData);        // Guardamos los datos del usuario
    setIsLoggedIn(true);       // Marcamos que el usuario está logueado
  };

  // Función que maneja el logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    document.title = "React To-Do App"; // Cambia el título de la pestaña
  }, []);

  return (
    <div className="App">

      <Header isLoggedIn={isLoggedIn} user={user}/>

      {isLoggedIn ? (

        
          <div>
            {/* 
              <TodoList />
              <TodoForm />
            */}
          </div>

        ) : (

          <Login onLogin={handleLogin} />
          
        )
      
      }


      <Footer isLoggedIn={isLoggedIn}/>
    </div>
  );
};

export default App;



/**
 * Explicación de este código:
 * 
 * --- ESTADOS --- 
 * 
 *    Estado isLoggedIn: 
      Almacena si el usuario está logueado o no. Si es true, se muestra la lista de tareas y el formulario de tareas. 
      Si es false, muestra la pantalla de login.

      Estado user: Guarda los datos del usuario que inicia sesión (en este caso, solo el correo electrónico y la contraseña)

    --- FUNCIONES ---

      Función handleLogin: Esta función se llama cuando el usuario se loguea correctamente.
                           Cambia el estado de isLoggedIn a true y guarda los datos del usuario.


      Función handleLogout: Permite al usuario cerrar sesión. Restablece isLoggedIn a false y borra los datos del usuario.


    --- Condicional ---

      Condicional isLoggedIn ? (...) : (...): Usamos esta estructura condicional para mostrar el formulario de login si el usuario no está logueado,
      o mostrar la lista de tareas y el formulario si está logueado.
 * 
 * 
 */