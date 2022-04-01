import React from 'react';

export const BadgeModal = ({ isOpen, toggle }) => {
  return (
    <div className='badge-modal-background'>
      <div className='badge-modal-content'>
        <span
          className='close-badge-modal'
          onClick={() => {
            toggle();
          }}
        >
          &times;
        </span>
        <h2 className='modal-text'>
          Congrats on completing your goal! You've earned a new badge.
        </h2>
      </div>
    </div>
  );
};
