import React from 'react';
import css from './ModalSidebar.module.css'

const ModalSidebar = ({ children, status, onClose }) => {
  return (
    <div className={css.modal__container}>
      <div className={css.modal__overlay}>
        <div className={css.modal__sidebar}>
          {children}
          <button>Готово</button>
          <button>Відміна</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSidebar;