import React, { useState } from 'react'
import "../styles/mainpage.css";
import mainpageImg from "../assets/main-page-img.png";
import plusIcon from "../assets/plusIcon.svg";
import lockIcon from "../assets/lock.svg";
import CreateGroupModal from '../components/CreateGroupModal';
import Notes from "../components/Notes";

const MainPage = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [groups, setGroups] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

    //      function for opening the modal
    const handleCreateGroup = () => {
        setModalStatus(true);
    }
    //      function for closing the modal
    const handleCloseModal = (e) => {
        if(e.target.classList.contains('modalViewContainer')) {
            setModalStatus(false);
        }
    }
    //      function for adding a new group
    const addNewGroup = (group) => {
        setGroups([...groups, group]);
        setModalStatus(false); // Close the modal after adding the group
    }
    //      function for choosing any group and its corresponding notes
    const handleNotesGroup = (index) => {
        setSelectedGroupIndex(index);
        setShowNotes(true);
    }
    // Function to get initials for the nameCircle
    const getInitials = (name) => {
        if (!name) return ""; // Handle undefined or null name
        const words = name.trim().split(" ");
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }
        return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join("");
    };

  return (
    <div className='mainpage-container flex dir-row'>
      {/*       Notes Making Section            */}
        <div className='notes-name-section position-relative'>
            <p className='text-center text-32 letter-spacing-2 font-wt-500 m-b-30'>Pocket Notes</p>
            <ul className='groupNameListContainer'>
                {groups.map((group, index) => (
                    <li key={index} className='groupNameList flex dir-row align-center cursor-pointer m-b-5' style={{backgroundColor: index === selectedGroupIndex ? '#2F2F2F2B' : 'transparent',}} onClick={() => handleNotesGroup(index)}>
                        <div className='nameCircle text-20 font-wt-500 flex dir-row justify-center align-center m-lr-10' style={{ backgroundColor: group.color }}>{getInitials(group.name)}</div>
                        <div className='groupName text-20 font-wt-500'>{group.name}</div>
                    </li>
                ))}
            </ul>
            <button className='plusIcon-container flex dir-row justify-center align-center position-fixed cursor-pointer' onClick={handleCreateGroup}>
                <img src={plusIcon} alt='plus-icon' className='plusIcon' />
            </button>
        </div>
        {/*     Notes Section                   */}
        <div className='notes-section'>
        {
            showNotes ? <Notes group={groups[selectedGroupIndex]} getInitials={getInitials} /> : 
            <div className='flex dir-col'>
                <div className='bgImgContainer flex dir-row justify-center'>
                    <img src={mainpageImg} alt="main page background-image" className='bgImg' />
                </div>
                <div className='flex dir-col align-center'>
                        <p className='font-wt-700 text-40 letter-spacing-2'>Pocket Notes</p>
                    <div className='notes-description'>
                        <p className='text-20 font-wt-500 letter-spacing-2'>Send and receive messages without keeping your phone online.</p>
                        <p className='text-20 font-wt-500 letter-spacing-2'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                    </div>
                    <div className='lockIcon-container flex dir-row justify-center align-center'>
                        <img src={lockIcon} alt='plus-icon' className='lockIcon' />
                        <p className='text-18 font-wt-400 letter-spacing-2'>end-to-end encrypted</p>
                    </div>
                </div>
            </div>
        }
        </div>
        {/*             Modal Container          */}
        {
            modalStatus && (
                <div className='modalViewContainer' onClick={handleCloseModal}>
                    <CreateGroupModal  onCreateGroup={addNewGroup}/>
                </div>
            ) 
        }
    </div>
  )
}

export default MainPage;
