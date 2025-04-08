import { useState } from 'react';


export const useRegisterModal = () =>{

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [registerName, setRegisterName]= useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);
    const toggleRegisterModal = () => setIsRegisterModalOpen((prev) => !prev);


    const handleChangeRegisterName  = (newValue) => { setRegisterName(newValue); }
    const handleChangeRegisterEmail = (newValue) => { setRegisterEmail(newValue); }

    const handleChangeRegisterPassword = (newValue) => { setRegisterPassword(newValue); }


    const resetRegisterForm = () => {
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');
      };



      return {
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,
        toggleRegisterModal,
        registerName,
        registerEmail,
        registerPassword,
        handleChangeRegisterName,
        handleChangeRegisterEmail,
        handleChangeRegisterPassword,
        resetRegisterForm
      };

}


