import React, { useState } from "react";
import "../styles/CreateGroupModal.css";

const CreateGroupModal = ({ onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [groupNameColor, setGroupNameColor] = useState('');

  let color = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  //    function for creating a new group
  const handleCreateClick = () => {
    //    if groupName is empty, return early and don't create the group
    if (!groupName) return;
    
    if (groupName && groupNameColor) {
      //    create new group object
      const newGroup = { name: groupName, color: groupNameColor };

      //    update groups in localStorage
      const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
      storedGroups.push(newGroup);
      localStorage.setItem("groups", JSON.stringify(storedGroups));

      //    Call onCreateGroup to update the state in MainPage
      onCreateGroup(newGroup);
    }
  };

  return (
    <div className="modalContainer flex dir-col">
        <p className="text-24 font-wt-500 letter-spacing3 margin-tb-10">Create New group</p>
        <div className="flex dir-row align-center m-b-10">
          <p className="text-22 font-wt-500 m-r-30">Group Name</p>
          <div className="groupNameContainer">
            <input type="text" className="groupNameInput flex dir-row align-center text-18 outline-none" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </div>
        </div>
        <div className="flex dir-row align-center m-b-10">
          <p className="text-22 font-wt-500 m-r-30">Choose colour</p>
          <div className="color-btn-container">
            {
              color.map((color) => (
                <button key={color} style={{backgroundColor : color}} className="colorBtn border-none cursor-pointer" onClick={() => setGroupNameColor(color)}></button>
              ))
            }
          </div>
        </div>
        <div className="create-btn-container margin-b-10">
          <button className="createBtn text-white text-18 font-wt-400 letter-spacing-2 border-none cursor-pointer" onClick={handleCreateClick}>Create</button>
        </div>
    </div>
  );
};

export default CreateGroupModal;
