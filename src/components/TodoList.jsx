import PropTypes from 'prop-types';
import TodoItem from './TodoItem';



const TodoList = ({ filteredTasks, deleteTaskById, updateTaskById, handleSearchChange, 
                    handleFilterChange, searchTerm, filter, loading }) => {


    return (

      <div>

          <div className="filters mb-4">
            {/* Campo de búsqueda */}
            <input
              type="text"
              placeholder="Buscar tarea..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-2 rounded w-full mb-2"
            />

            {/* Filtro por estado */}
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded mt-2 w-full"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>



          <div className='tasklist'>
            {/* Mostrar mensaje de carga */}
            {loading ? (
              <p className='text-center'>Loading Tasks...</p>
            ) : (
              // Mostrar la lista de tareas si hay tareas
              <>
                {/* Mostrar las tareas filtradas */}
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TodoItem key={task.id} task={task} onDelete={deleteTaskById} onEdit={updateTaskById} />
                  ))
                ) : (
                  <p className='text-center'>No tasks to show</p>
                )}
              </>
            )}
          </div>

      </div>
    );

};

TodoList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  deleteTaskById: PropTypes.func.isRequired,
  updateTaskById: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
  export default TodoList;