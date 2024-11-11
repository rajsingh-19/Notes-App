import React, { useState } from 'react'
import "../styles/Notes.css";
import backArrow from "../assets/backArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

const Notes = ({ group, getInitials, notes, addNote}) => {
    const [noteText, setNoteText] = useState('');
    const [arrowColor, setArrowColor] = useState(false);

    //          function for note writing
    const handleNoteText = (e) => {
        const text = e.target.value;
        setNoteText(text);
        setArrowColor(text.length > 0);
    };

    //          function for note writing into the notes card and formatting of date and time
    const handleButtonClick = () => {
        if (noteText.trim()) {
            //          format for date
            const date = new Date();
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            //          format for time
            const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
            const formattedTime = new Date().toLocaleTimeString('en-US', timeOptions); 

            //      adding the note using addNote prop function
            addNote({ text: noteText, formattedDate, formattedTime });
            setNoteText('');
            setArrowColor(false);
        }
    };

    //          function for enter key and clearing the text area
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && arrowColor) {
            e.preventDefault();
            handleButtonClick();
        }
    };

    //          function for going back to the group name list container in mobile device screens
    const handleBackBtn = () => {

    };

  return (
    <div className='notes-container flex dir-col'>
        {/*                 Notes name heading              */}
        {
            group && (
                <div className='notesNameContainer flex dir-row align-center'>
                    <button className='hide backArrowContainer flex dir-row justify-center align-center bg-transparent cursor-pointer border-none'onClick={handleBackBtn}>
                        <img src={backArrow} alt="back arrow" className='backArrowImg' />
                    </button>
                    <div className='circleGroupContainer font-wt-500  text-20 flex dir-row justify-center align-center m-lr-10' style={{ backgroundColor: group.color }}>{getInitials(group?.name)}</div>
                    <div className='notesName font-wt-500 text-20'>{group?.name}</div>
                </div>
            )
        }
        {/*                 Notes card                       */}
        <div>
            <ul className='notesCardContainer flex dir-col align-center list-style-none'>
                {notes.map((note, index) => (
                    <li key={index} className='notesCard position-relative m-b-30'>
                        <div className='notesContent font-wt-400'>{note.text}</div>
                        <div className='dateTimeContainer position-absolute letter-spacing-2 flex dir-row justify-center align-center'>
                            <span className='text-14'>{note.formattedDate}</span>
                            <span className="circleSeparator m-lr-10"></span> 
                            <span className='text-14'>{note.formattedTime}</span>
                        </div>                        
                    </li>
                ))}
            </ul>
        </div>
        {/*                 Writing textarea container        */}
        <div className='writingNotesContainer'>
            <textarea type="text" value={noteText} placeholder='Enter your text here...........' className='writingInput text-18 font-wt-400 outline-none' onChange={handleNoteText} onKeyDown={handleKeyPress} />
            <button className={`cursor-pointer rightArrowBtn ${arrowColor ? 'active' : ''}`} onClick={handleButtonClick}>
                <img src={rightArrow} alt="right arrow" className='rightArrowImg' />
            </button>
        </div>
    </div>
  )
}

export default Notes;
