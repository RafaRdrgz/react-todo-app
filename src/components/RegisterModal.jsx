import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import { useRegisterModal } from '../hooks/registerModalHook';
import { useErrorMessage } from '../hooks/showErrorHook';
import { X } from '@phosphor-icons/react';


export const RegisterModal = ({ handleLocalRegister, closeModal }) => {


  //Estados de error
  const { showError, setError, errorMessage } = useErrorMessage();
  const { registerName, registerEmail, registerPassword,
          handleChangeRegisterName, handleChangeRegisterEmail, handleChangeRegisterPassword} = useRegisterModal();


  const handleLocalRegisterSubmit = async () => {
    try {
      await handleLocalRegister(registerName, registerEmail, registerPassword);
    } catch (error) {
      setError(error.message); // Manejamos el error aquí, localmente
    }
  };
    
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
    
            <h2 className="text-lg font-bold mb-4 text-center">Crear nueva tarea</h2>
    
            <form onSubmit={() => handleLocalRegisterSubmit()} className="flex flex-col gap-4">


            <input
                type="text"
                placeholder="Email"
                value={registerName}
                onChange={(e) => handleChangeRegisterName(e.target.value)}
                className="border rounded p-2"
                required
              />

              <input
                type="text"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => handleChangeRegisterEmail(e.target.value)}
                className="border rounded p-2"
                required
              />
              
              <input
                type="password"
                placeholder="Título"
                value={registerPassword}
                onChange={(e) => handleChangeRegisterPassword(e.target.value)}
                className="border rounded p-2"
                required
              />

              {showError && <ErrorMessage message={errorMessage} />}
  
              <button 
                type="submit" 
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Crear
              </button>
            </form>
          </div>
        </div>
    
      );


    
}


RegisterModal.propTypes = {
  handleLocalRegister: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};