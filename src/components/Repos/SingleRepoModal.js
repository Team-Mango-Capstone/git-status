import React from 'react';
import '../../css/SingleRepoModal.css';

function SingleRepoModal({
  setOpenModal,
  deleteRepo,
  buttonClicked,
  archiveRepo,
}) {
  function clickHandler() {
    if (buttonClicked === 'Delete') {
      deleteRepo();
    } else {
      archiveRepo();
    }
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className='title'>
          <h1>WARNING!</h1>
        </div>
        <div className='body'>
          <p>
            THIS ACTION IS ONLY REVERSIBLE ON THE GITHUB WEBSITE. <br />
            <br />
            ARE YOU SURE YOU WANT TO CONTINUE?
          </p>
        </div>
        <div className='single-repo-modal-btns'>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className='cancelBtn'
          >
            Cancel
          </button>
          <button onClick={clickHandler} className='continueBtn'>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleRepoModal;
