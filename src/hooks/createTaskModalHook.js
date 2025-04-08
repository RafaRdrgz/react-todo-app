import { useState } from 'react';

export const useCreateTaskModal = () => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted ] = useState(false);

  const handleChangeTitle = (newValue) => { setTitle(newValue); }

  const handleChangeDescription = (newValue) => { setDescription(newValue); }

  const toggleCompleted = () => {
 
    const newStatus = !completed;
    setCompleted(newStatus);

  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
  };



  return { title, description, completed, handleChangeTitle, handleChangeDescription, toggleCompleted, resetForm};

};


