import PropTypes from 'prop-types';
import { X } from '@phosphor-icons/react';
import { useCreateTaskModal } from '../hooks/createTaskModalHook';
import { useErrorMessage} from '../hooks/showErrorHook';
import ErrorMessage from './ErrorMessage';

const CreateTaskModal = ({addTask, closeModal}) => {


  //Estados para crear usuario
  const {title, description, completed,
         handleChangeTitle, handleChangeDescription, toggleCompleted, resetForm } = useCreateTaskModal();


  //Estados de error
  const { showError, setError, errorMessage } = useErrorMessage();

          
  const handleAddTask = async (e) => {

      e.preventDefault();
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

    <div className="fixed inset-0 flex items-center justify-center">

      {/* Overlay de fondo */}
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>

      {/* Contenedor del modal (contenido) */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
        <button 
          onClick={closeModal} 
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">Add new task</h2>

        <form onSubmit={(e) => handleAddTask(e)} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => handleChangeTitle(e.target.value)}
            className="p-1 border-2 border-gray-300 rounded-lg w-full text-center bg-white"
            required
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => handleChangeDescription(e.target.value)}
            className="p-2 w-full border-2 rounded-lg border-gray-300 text-center bg-white"
          />

        <label className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={completed}
            onChange={() =>toggleCompleted()}
            className='h-6 w-6 rounded-sm checkbox-completed'
        />
        Check as completed
        </label>

        {showError && <ErrorMessage message={errorMessage} />}
          <button 
            type="submit" 
            className="addTaskBtn p-4 border-2 rounded-xl  ubuntu-medium text-lg"
          >
            Add
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