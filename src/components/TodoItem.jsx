import { Trash, PencilSimple, FloppyDisk, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import useTodoItem from "../hooks/todoItemHook";

const TodoItem = ({ task, onDelete, onEdit }) => {

 const { completed, editing, newTitle, newDescription, 
         handleChangeTitle, handleChangeDescription,
         toggleComplete, handleEditClick, handleCancelEditClick, 
         handleSaveClick, handleDeleteClick
        
        } = useTodoItem(task, onDelete, onEdit);


  return (
    <div className={`todo-item flex flex-col justify-center p-4 my-2 md:my-4 rounded-lg shadow-md ${completed ? 'completed' : 'pending'}`}>
      <h4 className="flex justify-around align-center mb-3 space-x-4">
        <input
        type="checkbox"
        checked={completed}
        onChange={toggleComplete}
        className={`h-6 w-6 ${completed ? 'checkbox-completed' : 'checkbox-pending'}`}
        />

        {editing ? (
          <div className="flex-1">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => handleChangeTitle(e.target.value)}
              className="border-b-2 border-gray-300 rounded-lg w-full text-center bg-white"
            />
          </div>
        ) : (
          <span className="flex-1 text-center ubuntu-medium">{task.title}</span>
        )}
         
      </h4>
      <div className="task-info text-center p-3 rounded-lg mb-3">
      {editing ? (
        <textarea
          value={newDescription}
          onChange={(e) => handleChangeDescription(e.target.value)}
          className="mb-3 p-2 w-full border-2 border-gray-300"
        />
      ) : (<>
          <p className="ubuntu-light mb-1">{task.description}</p>
          <p className="date ubuntu-light text-sm">Creado: {new Date(task.createdAt).toLocaleDateString()}</p>
          </>
      )}
      </div>
      <div className="buttons flex justify-between items-center">
            <button disabled
                    className={`px-3 py-1 rounded-sm ${completed ? "btn-completed" : "btn-pending"}`}
            >
                {completed ? "Completada" : "Pendiente"}
            </button>

            <div className="actions flex space-x-2">
                  {editing ? (
                  <>
                    <button
                      className="save px-3 py-1 mr-2 rounded-sm text-xl hover:rounded-3xl"
                      onClick={handleSaveClick}
                    >
                      <FloppyDisk size={24} />
                    </button>
                    <button
                      className="cancel px-3 py-1 rounded-sm text-xl hover:rounded-3xl"
                      onClick={handleCancelEditClick}
                    >
                      <X size={24} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit px-3 py-1 mr-2 rounded-sm text-xl hover:rounded-3xl"
                      onClick={handleEditClick}
                    >
                      <PencilSimple size={24} />
                    </button>
                    <button
                      className="delete px-3 py-1 rounded-sm text-xl hover:rounded-3xl"
                      onClick={handleDeleteClick}
                    >
                      <Trash size={24} />
                    </button>
                  </>
                )}
            </div>
        </div>
    </div>
  );
};

TodoItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TodoItem;
