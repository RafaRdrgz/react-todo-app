import { useState } from 'react';
import { useEffect } from "react";
import PropTypes from 'prop-types'; //desestructurar objetos prop


const Login = ( { handleLogin, errorMessage } ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password); // Llamamos a handleLogin con los datos del formulario
  };


  /* Sign in with google */

  useEffect(() => {

    // Esperar a que Google cargue antes de usarlo
    const initializeGoogleLogin = () => {

      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "TU_CLIENT_ID_AQUÍ", // Reemplázalo cuando tengas uno
          callback: (response) => console.log("ID Token de Google:", response.credential),
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-login-button"),
          { theme: "filled_black", size: "large", text: "signin_with", locale: "en" }
        );
      }
    };

    // Verificar si Google ya está disponible
    if (window.google) {
          initializeGoogleLogin();
        } else {
          // Esperar a que se cargue el script
          window.addEventListener("load", initializeGoogleLogin);
          return () => window.removeEventListener("load", initializeGoogleLogin);
        }
      }, []);

  
  //Se mostrará si hay mensaje de error
  const showErrorMessage = errorMessage ? `<div className="bg-red-500 text-white mt-4 p-2 rounded mb-4">${errorMessage}</div>` : "";

  return (

      <div className='login flex flex-col rounded-xl shadow-lg py-4 md:py-12 lg:py-16 px-8 md:px-16 lg:px-20'>

          <h2 className='ubuntu-bold text-xl text-center mb-8'>Login:</h2>

          <form className='login-form flex flex-col' onSubmit={handleSubmit}>

              <div className='login-inputs mb-8 flex flex-col justify-center items-center'>

                  <div className='login-input flex mb-4 md:mb-6'>

                    <label htmlFor="email" className="ubuntu-regular text-regular p-0 md:p-2 ml-6 w-32 flex items-center">
                      <i className="ph ph-at mr-2 text-2xl"></i>
                      Email:
                    </label>

                    <input
                      className='flex-1 p-0 md:p-2 text-center border-1 rounded-lg'
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                    />
                    
                  </div>

                  <div className='login-input flex'>

                    <label htmlFor="password" className="ubuntu-regular text-regular p-0 md:p-2 ml-6 w-32 flex items-center">
                      <i className="ph ph-password mr-2 text-2xl"></i>
                      Password:
                    
                    </label>

                    <input
                      className='flex-1 p-0 md:p-2 text-center border-1 rounded-lg'
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                    />

                  </div>

                  {/* Mostrar el mensaje de error solo si existe */}
                  {
                    showErrorMessage
                  }


              </div>

              <div className='login-inpu flex justify-center items-center mb-4 md:mb-6'>
                <button  className="login-btn p-4 border-2 rounded-xl  ubuntu-medium text-lg"type="submit">Login</button>
              </div>

              <h2 className='ubuntu-bold text-xl text-center mb-4 md:mb-6'>Or:</h2>

              
              <div id="google-login-button" className="g_id_signin"></div>

            { /**
              <script>
                function handleCredentialResponse(response) {

                    console.log("ID Token de Google: " + response.credential)
                    // Aquí podrías manejar la respuesta más adelante en tu backend con Node.js
                }
              </script>
               */
            }

            
          </form>

      </div>

  );
};

Login.propTypes = {

  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default Login;