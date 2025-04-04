import { useAuth } from './hooks/authHook';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { decodeToken } from '../utils/utils';


//Raíz de la App
const App = () => {

  //Importo el hook de autenticación con todo lo necesario para manejar el login y retornando las funciones y estados necesarios
  const { isLoggedIn, accessToken, errorMessage, handleLogin, handleLogout } = useAuth();

  //Datos a pasar como props
  let userName = "";
  let userId = "";

  if( isLoggedIn && accessToken ){

    const decodedToken = decodeToken(accessToken);
    userId = decodedToken.id;
    userName = decodedToken.name;

  }

  //Componentes que se van a renderizar dependiendo de los estados

  const headerComponent = isLoggedIn ? <Header name={userName} /> : <Header/>; //Por defecto false y null
  const mainContent = isLoggedIn ? <Dashboard id={userId} name={userName} /> : <Login handleLogin={handleLogin} errorMessage = {errorMessage}/>; // Por defecto false y null
  const footerComponent = isLoggedIn ? <Footer handleLogout={handleLogout} /> : <Footer/>; //Por defecto false y null


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