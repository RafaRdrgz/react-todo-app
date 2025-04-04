import PropTypes from 'prop-types';
import { X } from '@phosphor-icons/react';

const CreateTaskModal = ({title, description, completed,
                         handleChangeTitle, handleChangeDescription, toggleCompleted,
                         handleSubmit, closeModal}) => {

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleChangeDescription: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default CreateTaskModal;