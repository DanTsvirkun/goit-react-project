import React from 'react';
import css from './ModalSidebar.module.css'
import closeBtn from './closeBtn.svg'

const ModalSidebar = ({ children, status, onClose }) => {
  return (
    <div className={css.modal__container}>
      <div className={css.modal__overlay}>
        <div className={css.modal__sidebar}>
          <img className={css.modal__buttonClose} src={closeBtn}/>
          {children}
          <div className={css.modal__buttonWrapper}>
            <button className={css.modal__buttonReady}>Готово</button>
            <button className={css.modal__buttonCanceling}>Відміна</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSidebar;