import React from "react";
import ReactDom from "react-dom";

function Modal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className='overlay' onClick={onClose} />
      <div className='modal'>
        <button className='button-modal' onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
