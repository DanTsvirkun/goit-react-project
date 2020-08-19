import React from 'react';
import { connect } from 'react-redux';
import SprintTaskInput from '../SprintTaskInput/SprintTaskInput';
import { deleteTaskOperation } from '../../redux/operations/TasksOperatins';
import css from './SprintTask.module.css';
const SprintTask = ({
  title,
  hoursPlanned,
  hoursWasted,
  index,
  hoursWastedPerDay,
  id,
  tasks,
  deleteTaskOperation,
}) => {
  const deleteTask = () => deleteTaskOperation(id, index);

  return (
    <li className={css['sprint__tasks-item']}>
      <ul className={css['sprint__task-list']}>
        <li className={css['sprint__task-item']}>
          <p className={css['sprint__tasks-name']}>
            {title.length > 40 ? `${title.slice(0, 33)}...` : title}
          </p>
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
          <button
            className={css['sprint__task-delete-btn']}
            onClick={deleteTask}
          ></button>
        </li>
      </ul>
    </li>
  );
};

const mapDispatchToProps = {
  deleteTaskOperation,
};

export default connect(null, mapDispatchToProps)(SprintTask);
