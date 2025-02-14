import PropTypes from 'prop-types'; //desestructurar objetos prop


const Header = ({isLoggedIn, user}) => {


    return ( isLoggedIn && user ? (


        <header id='loginHeader' className="header h-10 md:h-14 lg:h-18 flex justify-around items-center">
          <h1 className='ubuntu-bold text-white text-2xl'>
            <p>To-Do App</p>
          </h1>
          <p className='ubuntu-bold text-white text-xl'>Welcome, {user.name} !</p>
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