import React from "react";
import css from "./ModalSidebar.module.css";
import closeBtn from "./closeBtn.svg";
import { CSSTransition } from "react-transition-group";
import overlayTransition from "./transitions/Overlay.module.css";
import modalTransition from "./transitions/Modal.module.css";

const ModalSidebar = ({ children, onSubmit, status, onClose }) => {
  const ready = (e = null) => {
    // onClose();
    onSubmit(e);
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
            <div onClick={onClose} className={css.modal__overlay}></div>
          </CSSTransition>

          <div className={css.modal__sidebar}>
            <img
              onClick={onClose}
              className={css.modal__buttonClose}
              src={closeBtn}
              alt="modal close icon"
            />
<<<<<<< HEAD
=======

>>>>>>> ccb15a1d6cfd3efcc48a178117839e6ecb095797
            {children}

            <div className={css.modal__buttonWrapper}>
              <button onClick={ready} className={css.modal__buttonReady}>
                Готово
              </button>
              <button onClick={onClose} className={css.modal__buttonCanceling}>
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
