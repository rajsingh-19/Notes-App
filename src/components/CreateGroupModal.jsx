import React from "react";
import "../styles/CreateGroupModal.css";

const CreateGroupModal = () => {
  return (
    <div className="modalContainer flex dir-col">
        <p className="text-22 font-wt-500 letter-spacing3">Create New group</p>
        <div className="flex dir-row">
          <p className="text-20 font-wt-500">Group Name</p>
          <div>
            <input type="text" />
          </div>
        </div>
        <div className="flex dir-row">
          <p className="text-20 font-wt-500">Choose colour</p>
          <div>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
          </div>
        </div>
        <div className="create-btn-container">
          <button className="createBtn text-white text-16 font-wt-400 letter-spacing-2 border-none cursor-pointer">Create</button>
        </div>
    </div>
  );
};

export default CreateGroupModal;
