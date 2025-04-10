import { useState, useEffect } from 'react';



//hook para manejar estado de cada item
const useTodoItem = (task, onDelete, onEdit) => {

    
    const [completed, setCompleted] = useState(task.completed);
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);


    //Establezco los valores cuando se construye el componente y cada vez que cambia task
    useEffect(() => {
        setNewTitle(task.title);
        setNewDescription(task.description);
        setCompleted(task.completed);
      }, [task]);



//Cambia de completado a no completado y viceversa
    const toggleComplete = async () => {
 
        const newStatus = !completed;
        setCompleted(newStatus);
        await onEdit(task.id, { title: newTitle, description: newDescription, completed: newStatus});

      };
    
      
    const handleChangeTitle = (newValue) => { setNewTitle(newValue); }


    const handleChangeDescription = (newValue) => { setNewDescription(newValue); }


    const handleEditClick = () => {
        setEditing(true); // Activa el modo de edición
    };
    

    const handleSaveClick = async () => {
        await onEdit(task.id, { title: newTitle, description: newDescription, completed: completed}); // Llama a la función de edición en el padre
        setEditing(false); // Desactiva el modo de edición
    };
    

    const handleCancelEditClick = () => {
        setEditing(false); // Cancela la edición y vuelve a los datos originales
        setNewTitle(task.title);
        setNewDescription(task.description);
    };


    const handleDeleteClick = async() =>{

        await onDelete(task.id);
    }


      return { completed, editing, newTitle, newDescription, toggleComplete,
               handleChangeTitle, handleChangeDescription,
               handleEditClick, handleCancelEditClick, handleSaveClick, handleDeleteClick
            
            }

}



export default useTodoItem;