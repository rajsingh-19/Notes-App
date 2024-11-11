import React, { useState, useEffect } from 'react'
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
    const [groupNotes, setGroupNotes] = useState({});
    const [showNotesContainer, setShowNotesContainer] = useState(true);

    //      load data from local storage on mount
    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        const storedGroupNotes = JSON.parse(localStorage.getItem("groupNotes")) || {};
        setGroups(storedGroups);
        setGroupNotes(storedGroupNotes);
    }, []);

    //      update local storage whenever groups or groupNotes change
    useEffect(() => {
        // Save updated groups and groupNotes in localStorage
        if (groups.length > 0) {
            localStorage.setItem("groups", JSON.stringify(groups));
        }
        if (Object.keys(groupNotes).length > 0) {
            localStorage.setItem("groupNotes", JSON.stringify(groupNotes));
        }
    }, [groups, groupNotes]);

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
        //      update groups and initialize an empty note list for the new group in groupNotes4
        const newGroups = [...groups, group];
        setGroups(newGroups);
        // Add an empty notes array for the new group
        const newGroupNotes = ({ ...groupNotes, [newGroups.length - 1]: [] });
        setGroupNotes(newGroupNotes);       // update groupNotes state
        setModalStatus(false);              // close the modal after adding the group

        // Update localStorage with the new groups and groupNotes
        localStorage.setItem("groups", JSON.stringify(newGroups));
        localStorage.setItem("groupNotes", JSON.stringify(newGroupNotes));
    }

    //      function for choosing any group and its corresponding notes
    const handleNotesGroup = (index) => {
        //      set selectedGroupIndex and showNotes to display the correct notes
        setSelectedGroupIndex(index);
        setShowNotes(true);
    }

    //      function to update notes of a specific group
    const updateGroupNotes = (index, newNote) => {
        //      update the notes for the selected group in groupNotes state
        const updatedGroupNotes = {...groupNotes,[index]: [...(groupNotes[index] || []), newNote]};
        setGroupNotes(updatedGroupNotes); // Single state update
    };

    //      function to get initials for the nameCircle
    const getInitials = (name) => {
        if (!name) return ""; // Handle undefined or null name
        const words = name.trim().split(" ");
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }
        return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join("");
    };

    // Handle back button click for small screens
    const handleBackBtn = () => {
        setShowNotesContainer(true); // Show the group list again
        setShowNotes(false); // Hide the notes container
    };

  return (
    <div className='mainpage-container flex dir-row'>
      {/*       Notes Making Section            */}
        {
             showNotesContainer && (
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
             )
        }
        {/*     Notes Section                   */}
        <div className={`notes-section ${showNotes ? 'visible' : ''}`}>
        {
            showNotes ? <Notes group={groups[selectedGroupIndex]} getInitials={getInitials} notes={groupNotes[selectedGroupIndex] || []} addNote={(newNote) => updateGroupNotes(selectedGroupIndex, newNote)} handleBackBtn={handleBackBtn} /> : 
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
