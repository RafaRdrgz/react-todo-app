import { useState, useEffect } from 'react';
import { getTaskList, deleteTask, updateTask  } from '../services/taskListService';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
  


const TodoList = () => {


    const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");  // Estado para la búsqueda
    const [filter, setFilter] = useState("all");  // Estado para el filtro (completado o pendiente)



  // Obtener tareas del backend al montar el componente
  useEffect(() => {

    const getTasks = async () => {
      try {
        setLoading(true);
        const taskList = await getTaskList(); // Llamar al servicio para obtener las tareas
        setTasks(taskList); // Actualizar el estado con las tareas obtenidas

      } catch (error) {

        console.error('Error fetching tasks:', error);

      } finally {
        setLoading(false); // Cambiar el estado de carga a false cuando se complete la solicitud
      }
    };

    getTasks();

  }); // Solo se ejecuta cuando el userId cambia





  const handleDelete = async (taskId) => {

    try {

      await deleteTask(taskId); // Llamada al backend
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)); // Actualizar estado local

    } catch (error) {

      console.error('Error al eliminar tarea:', error);

    }
  };


  //Editar una tarea
  const handleEdit = async (taskId, newTitle, newDescription, completed) => {

    try {

      //Se actualiza en la base de datos
      const updatedTask = await updateTask(taskId, {
        title: newTitle,
        description: newDescription,
        completed: completed
      });
  
      // Actualiza el estado local de tareas con la tarea modificada
      setTasks((prevTasks) =>

        prevTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )

      );

    } catch (error) {

      console.error('Error al editar tarea:', error);
    }
  };


    // Filtrar tareas según el searchTerm y el filtro de estado
    const filteredTasks = tasks.filter((task) => {
      
        // Filtro por búsqueda en el título
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
          
        // Filtro por estado: "all", "completed" o "pending"
        const matchesFilter = filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed);
          
        return matchesSearch && matchesFilter;

    });


    //Cmbiar el término de búsqueda
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    //Cambiar el filtro de búsqueda
    const handleFilterChange = (e) => {
      setFilter(e.target.value);
    };

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
                    <TodoItem key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
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