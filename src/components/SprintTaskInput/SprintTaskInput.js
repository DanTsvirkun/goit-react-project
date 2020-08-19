import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import WeekDays from 'moment-business-days';
import moment from 'moment';
import {} from '../../redux/operations/TasksOperatins';
import {
  hoursWastedPerDay,
  currentIdxDaySelector,
  validHourSelector,
} from '../../redux/selectors/TasksSelectors';
import { indexDayAction } from '../../redux/actions/sprintTasksActions';
import { changeTaskSingleHour } from '../../redux/operations/TasksOperatins';
import css from './SprintTaskInput.module.css';

const SprintTaskInput = ({
  hoursWastedPerDay,
  hours,
  taskId,
  changeTaskSingleHour,
  currentIdx,
  validHour,
  indexDayAction,
  indexArray,
}) => {
  const [noValid, setNoValid] = useState('');
  const validation = value => {
    const num = Number(value);

    if (num <= 0) {
      setNoValid('введіть число більше 0');
      return false;
    }
    if (!num) {
      setNoValid('введіть число');
      return false;
    }

    if (num.toString().length > 6) {
      setNoValid('Занадто велика цифра');
      return false;
    }
    setNoValid('');
    return true;
  };

  const handleOnChange = ({ target: { value } }) => {
    const isValid = validation(value);

    const numValue = value;
    changeTaskSingleHour({
      taskId,
      idx: currentIdx,
      numValue,
      hoursWastedPerDay,
      indexArray,
      isValid,
    });
  };
  return (
    <label className={css['sprints__task-spent-label']}>
      <input
        className={css['sprints__task-spent']}
        type="text"
        name="single_hours_wasted"
        value={validHour}
        onChange={handleOnChange}
        maxLength="7"
      />
      {noValid && (
        <div className={css['sprints__task-spent--validation']}>{noValid} </div>
      )}
    </label>
  );
};

const mapStateToProps = (state, props) => {
  return {
    currentIdx: currentIdxDaySelector(state),
    validHour: validHourSelector(state, props.hoursWastedPerDay),
  };
};

const mapDispatchToProps = {
  changeTaskSingleHour: changeTaskSingleHour,
  indexDayAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(SprintTaskInput);
