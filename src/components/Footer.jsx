
const Footer = (isLoggedIn) => {


    return ( isLoggedIn ? (


        <footer id='footer' className="header h-18 flex justify-between items-center">

        </footer>

      ) : (

        <footer id='footer' className="header h-18 flex justify-center items-center">
          <h1 className='ubuntu-bold text-white text-2xl'>
            <a href='./'>To-Do App</a>
          </h1>
        </footer>

      )

    )

}

export default Footer;