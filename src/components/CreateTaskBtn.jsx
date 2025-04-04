import PropTypes from "prop-types";
import { PlusCircle } from "@phosphor-icons/react";
import { useCreateTaskModal } from "../hooks/createTaskModalHook";
import CreateTaskModal from "./CreateTaskModal";


const CreateTaskBtn = ({addTask}) => {

      const { isModalOpen, openModal, title, description, completed,
        handleChangeTitle, handleChangeDescription, toggleCompleted,
        handleSubmit, closeModal } = useCreateTaskModal(addTask);
  
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
                  title={title}
                  description={description}
                  completed={completed}
                  handleChangeTitle={handleChangeTitle}
                  handleChangeDescription={handleChangeDescription}
                  toggleCompleted={toggleCompleted}
                  handleSubmit={handleSubmit}
                  closeModal={closeModal}
                />)
              }
      </>
    );

};
CreateTaskBtn.propTypes = {
    addTask: PropTypes.func.isRequired,
};

  export default CreateTaskBtn;