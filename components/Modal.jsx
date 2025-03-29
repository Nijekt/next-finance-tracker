import React from "react";

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      style={{ transform: isOpen ? "translateX(0%)" : "translateX(-200%)" }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500"
    >
      <div className="container max-w-2xl mx-auto h-[90vh] bg-slate-800 py-6 px-4 rounded-2xl ">
        <button
          onClick={() => setIsOpen(false)}
          className="w-10 h-10 bg-slate-600 rounded-full"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
