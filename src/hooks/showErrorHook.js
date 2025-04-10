import { useState, useEffect } from 'react';


export const useErrorMessage = () => {


    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    // Efecto para manejar el mensaje de error cuando cambia
    useEffect(() => {
        
        if (errorMessage) {
            timedErrorMessage();
        }

    }, [errorMessage]); // Se ejecuta cuando errorMessage cambia


    const setError = (message) => {
        setErrorMessage(message); // Cambiar el mensaje de error
      };

    
    const timedErrorMessage = () =>{

        setShowError(true); // Mostrar el error

        setTimeout(()=>{setShowError(false); setError('');},2000)
        

    }

    return { showError, setError, errorMessage }
}