import { useAuth } from './hooks/authHook';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { decodeToken, isTokenValid } from '../utils/tokenFuncs';


//Raíz de la App
const App = () => {

  //Importo el hook de autenticación con todo lo necesario para manejar el login y retornando las funciones y estados necesarios
  const { isLoggedIn, sessionAccessToken, sessionGoogleToken, handleLogin, handleGoogleLogin, handleGoogleLogout, handleLocalRegister, handleLogout } = useAuth();

  //Datos a pasar como props
  let userName = "";
  let userId = "";

  if( isLoggedIn && sessionAccessToken &&isTokenValid(sessionAccessToken)){

    const decodedToken = decodeToken(sessionAccessToken);
    userId = decodedToken.id;
    userName = decodedToken.name.charAt(0).toUpperCase() + decodedToken.name.slice(1);

  }

  //Componentes que se van a renderizar dependiendo de los estados

  const headerComponent = isLoggedIn ? <Header userName={userName} /> : <Header/>; //Por defecto false y null
  const mainContent = isLoggedIn && sessionAccessToken && isTokenValid(sessionAccessToken) ? <Dashboard userId={userId} userName={userName} /> : <Login handleLogin={handleLogin} handleLocalRegister={handleLocalRegister} handleGoogleLogin={handleGoogleLogin} handleGoogleLogout={handleGoogleLogout} />; // Por defecto cadena vacía
  let footerComponent;
  
  if(isLoggedIn && sessionAccessToken && sessionGoogleToken){footerComponent = <Footer handleLogout={handleGoogleLogout} />}
  else if (isLoggedIn && sessionAccessToken && !sessionGoogleToken ){ footerComponent = <Footer handleLogout={handleLogout}/> }
  else{ footerComponent = <Footer/>}


  return (
    <div className="App">

        {headerComponent}

        <main className="main w-screen h-screen py-14 lg:py-20
                         flex flex-col justify-center items-center">
          {mainContent}
          
        </main>

        {footerComponent}


    </div>
  );
};


export default App;