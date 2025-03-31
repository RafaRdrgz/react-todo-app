import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

// Simulación de tareas obtenidas de la base de datos
const fakeTasks = [
    {
      id: "1",
      userId: "123456789", // Debe coincidir con el ID del usuario fake
      title: "Comprar leche",
      description: "Ir al supermercado y comprar un litro de leche.",
      completed: false,
      createdAt: "2024-02-08",
    },
    {
      id: "2",
      userId: "123456789",
      title: "Hacer ejercicio",
      description: "Correr 30 minutos en el parque.",
      completed: false,
      createdAt: "2024-02-07",
    },
    {
      id: "3",
      userId: "123456789",
      title: "Terminar el reporte",
      description: "Finalizar el informe mensual y enviarlo por correo.",
      completed: true,
      createdAt: "2024-02-06",
    },
    {
      id: "4",
      userId: "123456789",
      title: "Llamar al dentista",
      description: "Agendar una cita para la revisión dental.",
      completed: false,
      createdAt: "2024-02-05",
    },
    {
      id: "5",
      userId: "123456789",
      title: "Leer un libro",
      description: "Avanzar al menos 50 páginas del libro actual.",
      completed: true,
      createdAt: "2024-02-04",
    },
];
  


const TodoList = ({ user }) => {
    const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");  // Estado para la búsqueda
    const [filter, setFilter] = useState("all");  // Estado para el filtro (completado o pendiente)



    // Simula la carga de datos como si vinieran del backend
    useEffect(() => {
        
        setTimeout(() => {
          const userTasks = fakeTasks.filter(task => task.userId === user.id);
          setTasks(userTasks);
          setLoading(false);
        }, 2000); // Simula un delay de 2 segundos
      }, [user.id]);

    /** Carga de datos desde el backend
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            // Simulación de una petición a la base de datos (puedes cambiar esto por una API real)
            const response = await fetch(`https://api.example.com/tasks?userId=${user.id}`);
            const data = await response.json();

            setTasks(data); // Guardar tareas en el estado

          } catch (error) {

            console.error("Error al obtener tareas:", error);

          } finally { setLoading(false);    }
        };


    
        fetchTasks();
      }, [user.id]); // Se ejecuta cuando cambia el user.id
        */

      //Editar una tarea
      const handleEdit = (id, newTitle, newDescription) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id
              ? { ...task, title: newTitle, description: newDescription }
              : task
          )
        );
      };

    //Eliminar una tarea
    const handleDelete = (taskId) => {
        //Filtra todas las tareas y se queda con aquellas que no tienen el id proporcionado, eliminándola del frontend
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
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

    user: PropTypes.shape({

      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      picture: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      
    }).isRequired,
};
  
  export default TodoList;