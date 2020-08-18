import React, {
  useState,
  useEffect
} from 'react';
import {
  connect
} from 'react-redux';
import moment from 'moment';
import {} from '../../redux/operations/TasksOperatins';
import {
  hoursWastedPerDay,
  currentIdxDaySelector,
  validHourSelector,
} from '../../redux/selectors/TasksSelectors';
import {
  indexDayAction
} from '../../redux/actions/sprintTasksActions';
import {
  changeTaskSingleHour
} from '../../redux/operations/TasksOperatins';
import css from './SprintTaskInput.module.css';
moment.locale('ru')

// const test = moment('2016-05-03T22:15:01+02:00').add(20, 'days').format('DD.MM.YYYY')


const SprintTaskInput = ({
  hoursWastedPerDay,
  hours,
  taskId,
  changeTaskSingleHour,
  currentIdx,
  validHour,
  indexDayAction,
  indexArray
}) => {
  // console.log(currentIdx);

  // const findCurrentDay = () => {
  //   const currentDate = moment().format('DD.MM.YYYY');
  //   const res = hoursWastedPerDay.findIndex((el, idx) => {
  //     const isCorrectDay = el.currentDay === currentDate;

  //     if (isCorrectDay) {
  //       return el;
  //     }
  //     if (hoursWastedPerDay.length === idx + 1 && !isCorrectDay) {
  //       return hoursWastedPerDay[idx];
  //     }
  //   });
  //   return res;
  // };
  // useEffect(() => {
  //   indexDayAction(findCurrentDay());
  // }, []);

  const handleOnChange = ({
    target: {
      value
    }
  }) => {
    const numValue = Number(value)
    const correctValue = isNaN(numValue);
    if (correctValue) {
      alert('невірне число');
      console.log('NaN');
      return;
    }
    changeTaskSingleHour({
      taskId,
      idx: currentIdx,
      numValue,
      hoursWastedPerDay,
      indexArray
    });
  };
  return ( <
    input className = {
      css['sprints__task-spent']
    }
    type = "text"
    name = "single_hours_wasted"
    value = {
      validHour
    }
    onChange = {
      handleOnChange
    }
    />
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