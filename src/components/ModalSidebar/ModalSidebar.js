import React, { useEffect, useState } from "react";
import css from "./ModalSidebar.module.css";
import closeBtn from "./closeBtn.svg";
import { CSSTransition } from "react-transition-group";
import overlayTransition from "./transitions/Overlay.module.css";
import modalTransition from "./transitions/Modal.module.css";

const ModalSidebar = ({ children, onSubmit, status, onClose }) => {
  useEffect(() => {
    status && addListener();
  }, [status]);

  const handleKeyDown = (e) => {
    if (e.code === "Escape" && status === true) {
      closeWindow();
    } else if (e.code === "Space") {
      removeListener();
    }
  };

  const ready = (e = null) => {
    onSubmit(e);
  };

  const closeWindow = async () => {
    removeListener();
    onClose();
  };

  const addListener = () => {
    window.addEventListener("keydown", handleKeyDown);
  };

  const removeListener = () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

  return (
    <CSSTransition
      in={status}
      timeout={400}
      classNames={modalTransition}
      unmountOnExit
    >
      {(stage) => (
        <div className={css.modal__container}>
          <CSSTransition
            in={stage === "entered"}
            timeout={200}
            classNames={overlayTransition}
            mountOnEnter
            unmountOnExit
          >
            <div onClick={closeWindow} className={css.modal__overlay}></div>
          </CSSTransition>

          <div className={css.modal__sidebar}>
            <img
              onClick={closeWindow}
              className={css.modal__buttonClose}
              src={closeBtn}
              alt="modal close icon"
            />
            {children}

            <div className={css.modal__buttonWrapper}>
              <button onClick={ready} className={css.modal__buttonReady}>
                Готово
              </button>
              <button
                onClick={closeWindow}
                className={css.modal__buttonCanceling}
              >
                Відміна
              </button>
            </div>
          </div>
        </div>
      )}
    </CSSTransition>
  );
};

export default ModalSidebar;
