import PropTypes from 'prop-types';


const ErrorMessage = ({ message }) => {

    if (!message) return null; // Si no hay mensaje, no renderiza nada.
  
    return (
      <div className="bg-red-500 text-white mt-4 p-2 rounded mb-4">
        {message}
      </div>
    );
  };
  

export default ErrorMessage;


ErrorMessage.propTypes = {
    message: PropTypes.string
};