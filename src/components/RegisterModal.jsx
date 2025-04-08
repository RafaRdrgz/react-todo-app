import PropTypes from 'prop-types';
import { X } from '@phosphor-icons/react';


export const RegisterModal = ({ handleRegister, registerEmail, registerPassword,
                                handleChangeRegisterEmail, handleChangeRegisterPassword,
                                closeRegisterModal }) => {


  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    handleRegister(registerEmail, registerPassword); // Llamamos a handleLogin con los datos del formulario
  };
    
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button 
              onClick={closeRegisterModal} 
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
    
            <h2 className="text-lg font-bold mb-4 text-center">Crear nueva tarea</h2>
    
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">

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