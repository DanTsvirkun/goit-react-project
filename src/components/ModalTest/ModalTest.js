import React, { Component } from 'react';
import css from './ModalTest.module.css';
export default class ModalTest extends Component {
  state = {};
  render() {
    return (
      <div className={css.modal}>
        <div className={css['modal-content']}>
          <span className={css.close}>& times; </span>
          {this.props.children}
        </div>
      </div>
    );
  }
}
