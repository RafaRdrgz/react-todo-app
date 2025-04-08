import PropTypes from "prop-types";
import { PlusCircle } from "@phosphor-icons/react";
import CreateTaskModal from "./CreateTaskModal";
import { useModal } from '../hooks/modalHook';


const CreateTaskBtn = ({addTask}) => {


      //Estados para el modal
      const { isModalOpen, openModal, closeModal } = useModal();


    return (
      <>
        <button
          onClick={openModal}
          className="createTaskBtn fixed bottom-6 right-6 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
        >
          <PlusCircle size={32} />
        </button>
  
              {/* Mostrar el modal solo cuando isModalOpen es true */}
              {isModalOpen && (
                <CreateTaskModal
                  addTask={addTask}
                  closeModal={closeModal}
                />)
              }
      </>
    );

};
CreateTaskBtn.propTypes = {
    addTask: PropTypes.func.isRequired
};

  export default CreateTaskBtn;