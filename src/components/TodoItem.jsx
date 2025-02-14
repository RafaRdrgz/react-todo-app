import { useState } from "react";
import PropTypes from "prop-types";

const TodoItem = ({ task, onDelete }) => {

  const [completed, setCompleted] = useState(task.completed);

  const toggleComplete = () => {
    setCompleted(!completed);
  };

  return (
    <div className={`todo-item flex flex-col justify-center p-4 my-2 md:my-4 rounded-lg shadow-md ${completed ? 'completed' : 'pending'}`}>
      <h4 className="flex justify-around align-center mb-3">
        <input
        type="checkbox"
        checked={completed}
        onChange={toggleComplete}
        className={`h-6 w-6 ${completed ? 'checkbox-completed' : 'checkbox-pending'}`}
        />

        <span className="flex-1 text-center ubuntu-medium">{task.title}</span>
         
      </h4>
      <div className="task-info text-center p-3 rounded-lg mb-3">
            <p className="ubuntu-light mb-1">{task.description}</p>
            <p className="date ubuntu-light text-sm">Creado: {task.createdAt}</p>


      </div>
      <div className="buttons flex justify-around align-center">
            <button disabled
                    className={`px-3 py-1 mx-auto block rounded-sm ${completed ? "btn-completed" : "btn-pending"}`}
                    onClick={toggleComplete}
            >
                {completed ? "Completada" : "Pendiente"}
            </button>
            <button className="delete px-3 py-1 mx-auto rounded-sm text-xl hover:rounded-3xl"
                    onClick={() => onDelete(task.id)}
            >
                <i className="ph ph-trash"></i>
            </button>
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
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;
