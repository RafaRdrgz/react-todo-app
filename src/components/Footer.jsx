import PropTypes from 'prop-types'; //desestructurar objetos prop


const Footer = ( {isLoggedIn, handleLogout}) => {

    return ( isLoggedIn ? (
        
        <footer id='footer' className="header h-8 md:h-12 lg:h-18 flex justify-between items-center">
          <button  className="login-btn p-4 border-2 rounded-xl ubuntu-medium text-lg" onClick={handleLogout}>Logout</button>
        </footer>

      ) : (

        <footer id='footer' className="header h-8 md:h-12 lg:h-18 flex justify-center items-center">
          <h1 className='ubuntu-light text-white text-xs'>
            <a href='./'>Made By R</a>
          </h1>
        </footer>

      )

    )

}


Footer.propTypes = {

  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func
  
};

Footer.defaultProps = {
  isLoggedIn: false,
  handleLogout: null
};

export default Footer;