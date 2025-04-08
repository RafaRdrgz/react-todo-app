import PropTypes from 'prop-types';
import { X } from '@phosphor-icons/react';
import { useCreateTaskModal } from '../hooks/createTaskModalHook';
import { useErrorHook } from '../hooks/showErrorHook';
import ErrorMessage from './ErrorMessage';

const CreateTaskModal = ({addTask, closeModal}) => {


  //Estados para crear usuario
  const {title, description, completed,
         handleChangeTitle, handleChangeDescription, toggleCompleted, resetForm } = useCreateTaskModal();


  //Estados de error
  const { showError, setError, errorMessage } = useErrorHook();

          
  const handleAddTask = async () => {

      try{

        if (!title.trim()) { throw new Error("Title needed")}
      
        await addTask({ title, description, completed });
        
        closeModal(); // cerrar el modal al crear
        resetForm(); //Limia campos después de cerrar


      } catch(error) {

        setError(error.message);
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

        <form onSubmit={() => handleAddTask()} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => handleChangeTitle(e.target.value)}
            className="border rounded p-2"
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => handleChangeDescription(e.target.value)}
            className="border rounded p-2"
          />

        <label className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={completed}
            onChange={() =>toggleCompleted()}
        />
        Marcar como completada
        </label>

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

  
};


CreateTaskModal.propTypes = {
  addTask: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default CreateTaskModal;