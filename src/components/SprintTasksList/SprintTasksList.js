import React from 'react';
import css from './SprintTasksList.module.css';
const SprintTasksList = () => {
  return (
    <div className={css.wrapper}>
      <ul className={css['sprint__tasks-list']}>
        <li className={css['sprint__tasks-item']}>
          <ul className={css['sprint__task-list']}>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-name']}>
                KN-1 Configure project
              </p>
            </li>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-plan']}>8</p>{' '}
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
          </ul>
        </li>
        <li className={css['sprint__tasks-item']}>
          <ul className={css['sprint__task-list']}>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-name']}>
                KN-3 Create Button Component
              </p>
            </li>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-plan']}>8</p>{' '}
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
          </ul>
        </li>
        <li className={css['sprint__tasks-item']}>
          <ul className={css['sprint__task-list']}>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-name']}>
                KN-3 Create Button Component
              </p>
            </li>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-plan']}>8</p>{' '}
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
          </ul>
        </li>
        <li className={css['sprint__tasks-item']}>
          <ul className={css['sprint__task-list']}>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-name']}>
                KN-3 Create Button Component
              </p>
            </li>
            <li className={css['sprint__task-item']}>
              <p className={css['sprint__tasks-plan']}>8</p>{' '}
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
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SprintTasksList;
