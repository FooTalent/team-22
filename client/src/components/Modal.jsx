import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, title, children, modalSize }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#444] bg-opacity-15 flex justify-center items-center z-50">
      <div className={`bg-white flex flex-col gap-4 shadow-modal ${modalSize === 'small' ? 'w-5/12 p-10 rounded-3xl' : 'w-1/2 py-6 px-8 rounded-lg'} text-card`}>
        {
          title
            ? <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-Purple hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>
            : <></>
        }

        {children}
      </div>
    </div>
  );
};

export default Modal;