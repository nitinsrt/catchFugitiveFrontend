import React, { useState } from "react";
import "../component-css/LandingPage.css";
import Modal from "./Modal";
import CopChoices from "./CopChoices";

const LandingPage = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const openModal = () => {
    setisModalOpen(true);
  };
  const onClose = () => {
    setisModalOpen(false);
  };

  const handleGameStart = () => {
    setisGameStarted(true);
  };

  const [isGameStarted, setisGameStarted] = useState(false);
  return (
    <div className="landingPage">
      <video autoPlay muted loop id="myVideo">
        <source src="vid_back.mp4" type="video/mp4" />
      </video>
      {!isGameStarted && (
        <div className="content">
          <h1 className="heading">Criminal Escape Artist Game</h1>
          <div className="buttonContainer">
            <button className="howToPlay" onClick={handleGameStart}>
              Play
            </button>
            <button className="howToPlay" onClick={openModal}>
              How to Play
            </button>
          </div>
          {isModalOpen && <Modal isOpen={isModalOpen} onClose={onClose} />}
        </div>
      )}
      {isGameStarted && (
        <div className="content">
          <CopChoices />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
