import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
moment.locale('ru');

// const test = moment('2016-05-03T22:15:01+02:00').add(20, 'days').format('DD.MM.YYYY')

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
    if (!num) {
      console.log('введіть число');
      return 0;
    }
    const correctValue = isNaN(num);
    if (correctValue) {
      console.log('NaN');
      return 0;
    }
    if (num.toString().length > 7) {
      console.log('жаль, но люди так долго не живут');
      return;
    }
    if (num < 0) {
      // alert('введіть число більше 0');
      console.log('введіть число більше 0');
      setNoValid('введіть число більше 0');
      return 0;
    }

    return num;
  };

  const handleOnChange = ({ target: { value } }) => {
    console.log(value);
    const numValue = validation(value);
    console.log(numValue);

    changeTaskSingleHour({
      taskId,
      idx: currentIdx,
      numValue,
      hoursWastedPerDay,
      indexArray,
    });
  };
  return (
    <>
      <input
        className={css['sprints__task-spent']}
        type="text"
        name="single_hours_wasted"
        value={validHour}
        onChange={handleOnChange}
        title="Используйте числовой формат"
      />
    </>
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
