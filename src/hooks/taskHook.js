import { useState, useEffect } from 'react';
import { getTaskList, createTask, deleteTask, updateTask } from '../services/taskListService'; // Servicios de tareas



//hook para manejar estado de tareas
const useTaskList = () => {


    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener tareas cuando el userId cambia
    useEffect(() => {


      const taskList = async () => {

        setLoading(true);

        try {

          const taskList = await getTaskList();
          setTasks(taskList);

        } catch (error) {

          console.error('Error getting task list:', error);

        } finally {
          setLoading(false);
        }

      };
  
      taskList();

    },[]); //Solo se ejecuta al montar el componente
  

    // Función para agregar una nueva tarea
    const addTask = async (newTaskData) => {

      try {

        const {title, description, completed } = newTaskData;

        const newTask = await createTask(title,description,completed);
        setTasks((prevTasks) => [ ... prevTasks, newTask ]); // Añadir la nueva tarea al estado

      } catch (error) {

        console.error('Error adding task:', error);
        
      }

    };



    // Función para eliminar una tarea por id
    const deleteTaskById = async (taskId) => {
        
        try {

        await deleteTask(taskId); // Eliminar tarea del backend
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Actualizar estado local

        } catch (error) {

        console.error('Error deleting task:', error);

        }

    };

    // Función para actualizar una tarea
    const updateTaskById = async (taskId, updatedTaskData) => {
        try {
        const updatedTask = await updateTask(taskId, updatedTaskData); // Actualizar tarea en el backend
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? updatedTask : task)) // Actualizar estado local
        );
        } catch (error) {
        console.error('Error updating task:', error);
        }
    };

    return { tasks, loading, addTask, deleteTaskById, updateTaskById };
  };
  
  export default useTaskList;