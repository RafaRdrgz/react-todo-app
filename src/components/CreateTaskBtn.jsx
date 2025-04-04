import { Plus } from "@phosphor-icons/react";
import useCreateTaskModal from "../hooks/createTaskModalHook";
import CreateTaskModal from "./CreateTaskModal";


const CreateTaskBtn = () => {

    const { isOpen, openModal, closeModal } = useCreateTaskModal();
  
    return (
      <>
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
        >
          <Plus size={32} />
        </button>
  
        {isOpen && <CreateTaskModal onClose={closeModal} />}
      </>
    );
  };
  
  export default CreateTaskBtn;