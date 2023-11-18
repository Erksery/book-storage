import React from "react";
import "./Modal-CSS.css";
import "./Transition-Modal-CSS.css";

function Modal({ children, openRateModal, setOpenRateModal }) {
  return (
    <div
      className={`Modal-container ${openRateModal}`}
      onClick={() => setOpenRateModal(false)}
    >
      <div
        className={`Modal ${openRateModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
