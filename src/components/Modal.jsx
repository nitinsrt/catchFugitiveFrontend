import React from "react";
import "../component-css/modal.css";

const Modal = ({ isOpen, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1 className="modalHeading">Rules !</h1>
        <ul>
          <li>Enter the name of 3 cops</li>
          <li>Select the city for each cops</li>
          <li>Select the vehicle your cop will be taking</li>
          <li>
            Then on clicking the results button, the game will tell if anyone of
            the cop was able to catch the theif or not
          </li>
        </ul>
        <div className="close" >
            <button className="closeButton" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
