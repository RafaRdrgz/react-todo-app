import { useTaskList } from '../hooks/todoListHook';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';



const TodoList = () => {


  const { loading, deleteTaskById, updateTaskById, searchTerm, filter, filteredTasks, handleSearchChange, handleFilterChange } = useTaskList();



    return (

      <div>

          <div className="filters mb-4">
            {/* Campo de búsqueda */}
            <input
              type="text"
              placeholder="Buscar tarea..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-2 rounded w-full"
            />

            {/* Filtro por estado */}
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded mt-2 w-full"
            >
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>




          <div className='tasklist'>
            {/* Mostrar mensaje de carga */}
            {loading ? (
              <p>Loading Tasks...</p>
            ) : (
              // Mostrar la lista de tareas si hay tareas
              <>
                {/* Mostrar las tareas filtradas */}
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TodoItem key={task.id} task={task} onDelete={deleteTaskById} onEdit={updateTaskById} />
                  ))
                ) : (
                  <p>No hay tareas para mostrar</p>
                )}
              </>
            )}
          </div>


      </div>
    );

};

TodoList.propTypes = {

    userId: PropTypes.string.isRequired
};
  
  export default TodoList;