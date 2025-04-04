import { useState } from 'react';

export const useCreateTaskModal = (addTask) => {

  const [isModalOpen, setIsOpen] = useState(false);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ completed, setCompleted ] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask({ title, description, completed });

    closeModal(); // cerrar el modal al crear
    resetForm(); //Limia campos después de cerrar

  };



  return { isModalOpen, openModal, closeModal, toggleModal, title, description,
           completed, handleChangeTitle, handleChangeDescription, toggleCompleted, handleSubmit };

};


