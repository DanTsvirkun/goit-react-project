import React, { useEffect, useState } from 'react';
import css from './ModalSidebar.module.css'
import closeBtn from './closeBtn.svg'
import { useDispatch, useSelector } from 'react-redux'
import { modalOff } from '../../redux/actions/modalAction';
import { CSSTransition } from "react-transition-group";
import overlayTransition from './transitions/Overlay.module.css'


const ModalSidebar = ({ children, stage }) => {
  const dispatch = useDispatch()

  const toggleOff = () => {
    dispatch(modalOff(false))
  }

  return (
    <div className={css.modal__container}>
      <CSSTransition in={stage === "entered"} timeout={200} classNames={overlayTransition} mountOnEnter unmountOnExit>
        <div onClick={toggleOff} className={css.modal__overlay}></div>
      </CSSTransition>

      <div className={css.modal__sidebar}>
        <img onClick={toggleOff} className={css.modal__buttonClose} src={closeBtn} alt="modal close icon" />
        {children}
        <div className={css.modal__buttonWrapper}>
          <button onClick={toggleOff} className={css.modal__buttonReady}>Готово</button>
          <button onClick={toggleOff} className={css.modal__buttonCanceling}>Відміна</button>
        </div>
      </div>

    </div>
  );
};

export default ModalSidebar;