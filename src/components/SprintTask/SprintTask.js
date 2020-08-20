import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
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
      {title.length > 40 && (
        <ReactTooltip
          className={css['sprint__task-React-Tooltiop']}
          id={`${id}`}
          type="dark"
          effect="solid"
          place="top"
        >
          {title.length > 40 && <span>{title}</span>}
        </ReactTooltip>
      )}
      <ul className={css['sprint__task-list']}>
        <li className={css['sprint__task-item']}>
          {title.length > 40 ? (
            <p
              data-tip
              data-for={`${id}`}
              data-iscapture="true"
              className={css['sprint__tasks-name']}
            >
              {`${title.slice(0, 33)}...`}
            </p>
          ) : (
            <p className={css['sprint__tasks-name']}>{title}</p>
          )}
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
