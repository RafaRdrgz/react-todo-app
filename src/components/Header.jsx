import PropTypes from 'prop-types'; //desestructurar objetos prop


const Header = ({isLoggedIn, user}) => {


    return ( isLoggedIn && user ? (


        <header id='loginHeader' className="header h-10 md:h-14 lg:h-18 flex justify-between items-center">
          <h1 className='ubuntu-bold text-white text-2xl'>
            <a href='./'>To-Do App</a>
          </h1>
          <h1 className='ubuntu-bold text-white text-xl'>Bienvenido, {user.name}</h1>
        </header>

      ) : (

        <header id='loginHeader' className="header h-10 md:h-14 lg:h-18 flex justify-center items-center">
          <h1 className='ubuntu-bold text-white text-2xl'>
            <a href='./'>To-Do App</a>
          </h1>
        </header>

      )

    )
}

Header.propTypes = {

  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
  
};

Header.defaultProps = {
  isLoggedIn: false,
  user: null,
};

export default Header;