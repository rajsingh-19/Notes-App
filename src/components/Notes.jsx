import React from 'react'
import "../styles/Notes.css";
import rightArrow from "../assets/rightArrow.svg";

const Notes = () => {
  return (
    <div className='notes-container flex dir-col'>
        <div className='notesNameContainer flex dir-row'>
            <div className='circleGroupContainer font-wt-500'>MN</div>
            <div className='notesName font-wt-500'>My Notes</div>
        </div>
        <div>
            <ul>
                <li className='notesCard font-wt-400'>
                    <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quas, esse laboriosam sed, eum quisquam accusamus odio eaque, aliquid illum ex cumque repudiandae laudantium similique.
                    </div>
                    <div>
                        <span>Date</span>
                        <span>Time</span>
                    </div>
                </li>
            </ul>
        </div>
        <div className='writingNotesContainer position-relative'>
            <textarea type="text" placeholder='Enter your text here...........' className='writingInput outline-none' />
            <button className='rightArrowBtn'>
                <img src={rightArrow} alt="right arrow" className='rightArrowImg' />
            </button>
        </div>
    </div>
  )
}
export default Notes;
