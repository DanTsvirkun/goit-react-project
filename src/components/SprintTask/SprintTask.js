import React from 'react';
import SprintTaskInput from '../SprintTaskInput/SprintTaskInput';
import css from './SprintTask.module.css';
const SprintTask = ({
  title,
  hoursPlanned,
  hoursWasted,
  index,
  hoursWastedPerDay,
  id,
  tasks,
}) => {
  return (
    <li className={css['sprint__tasks-item']}>
      <ul className={css['sprint__task-list']}>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-name']}> {title} </p>
        </li>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-plan']}> {hoursPlanned} </p>
        </li>
        <li className={css['sprint__task-item']}>
          <SprintTaskInput
            taskId={id}
            indexArray={index}
            hoursWastedPerDay={hoursWastedPerDay}
          />
        </li>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-total']}> {hoursWasted} </p>
        </li>
        <li className={` ${css['sprint__task-item-delete']}`}>
          <button className={css['sprint__task-delete-btn']}> </button>
        </li>
      </ul>
    </li>
  );
};

export default SprintTask;
