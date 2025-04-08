import { useState } from 'react';
import { registerService } from '../services/registerService';


export const useRegisterModal = () =>{

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);
    const toggleRegisterModal = () => setIsRegisterModalOpen((prev) => !prev);

    const handleChangeRegisterEmail = (newValue) => { setRegisterEmail(newValue); }

    const handleChangeRegisterPassword = (newValue) => { setRegisterPassword(newValue); }


    const resetRegisterForm = () => {
        setRegisterEmail('');
        setRegisterPassword('');
      };



      return {
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,
        toggleRegisterModal,
        registerEmail,
        registerPassword,
        handleChangeRegisterEmail,
        handleChangeRegisterPassword,
        resetRegisterForm
      };

}


