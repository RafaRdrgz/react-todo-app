import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import { useRegisterModal } from '../hooks/registerModalHook';
import { useErrorMessage } from '../hooks/showErrorHook';
import { X } from '@phosphor-icons/react';


export const RegisterModal = ({ handleLocalRegister, closeRegisterModal }) => {


  //Estados de error
  const { showError, setError, errorMessage } = useErrorMessage();
  const { registerName, registerEmail, registerPassword,
          handleChangeRegisterName, handleChangeRegisterEmail, handleChangeRegisterPassword} = useRegisterModal();


  const handleRegisterSubmit = async (e) => {
    try {
      e.preventDefault();
      await handleLocalRegister(registerName, registerEmail, registerPassword);
    } catch (error) {
      setError(error.message); // Manejamos el error aquí, localmente
    }
  };
    
    return (

        <div className="fixed inset-0 flex items-center justify-center">

          {/* Overlay de fondo */}
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>

          {/* Contenedor del modal (contenido) */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button 
              onClick={() => closeRegisterModal()} 
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
    
            <h2 className="text-lg font-bold mb-4 text-center">Register new user</h2>
    
            <form onSubmit={(e) => handleRegisterSubmit(e)} className="flex flex-col gap-4">


            <input
                type="text"
                placeholder="Name"
                value={registerName}
                onChange={(e) => handleChangeRegisterName(e.target.value)}
                className="border-2 border-gray-300 rounded-lg w-full text-center bg-white"
                required
              />

              <input
                type="text"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => handleChangeRegisterEmail(e.target.value)}
                className="border-2 border-gray-300 rounded-lg w-full text-center bg-white"
                required
              />
              
              <input
                type="password"
                placeholder="password"
                value={registerPassword}
                onChange={(e) => handleChangeRegisterPassword(e.target.value)}
                className="border-2 border-gray-300 rounded-lg w-full text-center bg-white"
                required
              />

              {showError && <ErrorMessage message={errorMessage} />}
  
              <button 
                type="submit" 
                className="submitRegisterBtn p-4 border-2 rounded-xl  ubuntu-medium text-lg"
              >
                Register
              </button>
            </form>
          </div>
        </div>
    
      );


    
}


RegisterModal.propTypes = {
  handleLocalRegister: PropTypes.func.isRequired,
  closeRegisterModal: PropTypes.func.isRequired,
};

export default RegisterModal;