import React, { useState } from 'react'
import "../styles/mainpage.css";
import mainpageImg from "../assets/main-page-img.png";
import plusIcon from "../assets/plusIcon.svg";
import lockIcon from "../assets/lock.svg";
import CreateGroupModal from '../components/CreateGroupModal';

const MainPage = () => {
    const [modalStatus, setModalStatus] = useState(false);

    const handleCreateGroup = () => {
        setModalStatus(true);
    }

  return (
    <div className='mainpage-container grid grid-col-3'>
      {/*       Notes Making Section            */}
        <div className='notes-making-section position-relative'>
            <p className='text-center text-32 letter-spacing-2 font-wt-500'>Pocket Notes</p>
            <button className='plusIcon-container flex dir-row justify-center align-center position-fixed cursor-pointer' onClick={handleCreateGroup}>
                <img src={plusIcon} alt='plus-icon' className='plusIcon' />
            </button>
        </div>
        {/*     Notes Section                   */}
        <div className='notes-section flex dir-col'>
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
        {/*             Modal Container          */}
        {
            modalStatus && (
                <div className='modalViewContainer'>
                    <CreateGroupModal />
                </div>
            ) 
        }
    </div>
  )
}

export default MainPage
