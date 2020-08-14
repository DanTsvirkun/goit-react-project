import React from 'react';
import css from './SprintTask.module.css';
const SprintTask = ({ title }) => {
  return (
    <li className={css['sprint__tasks-item']}>
      <ul className={css['sprint__task-list']}>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-name']}>{title}</p>
        </li>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-plan']}>8</p>
        </li>
        <li className={css['sprint__task-item']}>
          <label>
            <input
              className={css['sprints__task-spent']}
              type="text"
              placeholder="0"
              value={'6'}
            />
          </label>
        </li>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-total']}>0</p>
        </li>
        <li className={` ${css['sprint__task-item-delete']}`}>
          <button className={css['sprint__task-delete-btn']}></button>
        </li>
      </ul>
    </li>
  );
};

export default SprintTask;
