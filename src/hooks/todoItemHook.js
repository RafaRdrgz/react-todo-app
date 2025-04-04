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
    const toggleComplete = () => {
 
        const newStatus = !completed;
        setCompleted(newStatus);
        onEdit(task.id, newTitle, newDescription, newStatus);

      };
    
      
    const handleChangeTitle = (newValue) => { setNewTitle(newValue); }


    const handleChangeDescription = (newValue) => { setNewDescription(newValue); }


    const handleEditClick = () => {
        setEditing(true); // Activa el modo de edición
    };
    

    const handleSaveClick = () => {
        onEdit(task.id, newTitle, newDescription); // Llama a la función de edición en el padre
        setEditing(false); // Desactiva el modo de edición
    };
    

    const handleCancelEditClick = () => {
        setEditing(false); // Cancela la edición y vuelve a los datos originales
        setNewTitle(task.title);
        setNewDescription(task.description);
    };


    const handleDeleteClick = () =>{

        onDelete(task.id);
    }


      return { completed, editing, newTitle, newDescription, toggleComplete,
               handleChangeTitle, handleChangeDescription,
               handleEditClick, handleCancelEditClick, handleSaveClick, handleDeleteClick
            
            }

}



export default useTodoItem;