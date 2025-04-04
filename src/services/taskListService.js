import { API_URL_TASKS, API_URL_NEW_TASK, API_URL_DELETE_TASK, API_URL_UPDATE_TASK } from './urlConfig';
import { getAccessToken } from '../../utils/tokenFuncs';
import axios from 'axios'; //Peticiones http desce este fichero


// Obtener tareas de un usuario
export const getTaskList = async () => {

    try {

      const accessToken = getAccessToken();
      const response = await axios.get(API_URL_TASKS, {
        
            headers: {
            'Authorization': `Bearer ${accessToken}` // Pasar el token en el header
            }

      });
      return response.data; // Retorna la lista de tareas

    } catch (error) {

        
      console.error('Error al obtener las tareas:', error);
      throw error; // Lanza el error para manejarlo en el componente

    }
  };



  // Crear una nueva tarea
export const createTask = async (title, description, completed = false) => {


    try {
      const accessToken = getAccessToken();
  
      const response = await axios.post(
        API_URL_NEW_TASK,
        {
          title,
          description,
          completed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
  
      return response.data; //Devuelvo la tarea creada
  
    } catch (error) {

      console.error('Error al crear la tarea:', error.response?.data || error.message);
      throw error;

    }
  };


// Eliminar una tarea
export const deleteTask = async (taskId) => {
    try {

      const accessToken = getAccessToken();
  
      const response = await axios.delete(`${API_URL_DELETE_TASK}/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      return response.data; // Puede ser un mensaje de éxito o la tarea eliminada
  
    } catch (error) {
      console.error('Error al eliminar la tarea:', error.response?.data || error.message);
      throw error;
    }

};


// Actualizar una tarea
export const updateTask = async (taskId, updatedTaskData) => {
    try {
      const accessToken = getAccessToken();
  
      const response = await axios.put(`${API_URL_UPDATE_TASK}/${taskId}`, updatedTaskData, {

        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },

      });
  
      return response.data; // Retorna la tarea actualizada
  
    } catch (error) {
      console.error('Error al actualizar la tarea:', error.response?.data || error.message);
      throw error;
    }
    
};