import PropTypes from 'prop-types'; //desestructurar objetos prop


const Footer = ( {handleLogout}) => {

    return ( handleLogout ? 
      
      (
      
       <footer id='footer' className="footer fixed bottom-0 left-0 w-full p-2 h-100% md:h-12 lg:h-18 flex justify-center items-center">
          <button  className="login-btn p-2 border-2 rounded-xl ubuntu-medium text-lg" onClick={handleLogout}>Logout</button>
       </footer>

      ) : (

        <footer id='footer' className="footer fixed bottom-0 left-0 w-full h-8 md:h-12 lg:h-18 flex justify-center items-center">
          <h1 className='ubuntu-light text-white text-xs'>
            <a href='./'>Made By R</a>
          </h1>
        </footer>

      )

    );

}


Footer.propTypes = {

  handleLogout: PropTypes.func
  
};

Footer.defaultProps = {

  handleLogout: null
};

export default Footer;