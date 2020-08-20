import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import WeekDays from 'moment-business-days';
import moment from 'moment';
import {} from '../../redux/operations/TasksOperatins';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  hoursWastedPerDay,
  currentIdxDaySelector,
  validHourSelector,
} from '../../redux/selectors/TasksSelectors';
import { indexDayAction } from '../../redux/actions/sprintTasksActions';
import { changeTaskSingleHour } from '../../redux/operations/TasksOperatins';
import css from './SprintTaskInput.module.css';

const HoursWasted = withStyles({
  root: {
    '& .MuiInputBase-root': {
      color: ' #181c27',
      paddingTop: '2px',
      paddingBottom: '2px',
    },
    '&.MuiInputBase-input': {},
    '& .MuiInputBase-root.Mui-error': {
      marginBottom: '0px',
    },
    '& label.Mui-focused': {
      color: '#181c2799',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#181c2799',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      marginBottom: '0px',
      fontFamily: 'Montserrat',
      color: 'red',
      fontSize: '10px',
      position: 'absolute',
      top: '-18px',
      right: '-24px',
      width: '140px',
    },
    '& > *': {
      width: ' 100%',
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '22px',
      outline: 'none',
    },
  },
})(TextField);

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
  const [inputValue, setInputValue] = useState(validHour);

  useEffect(() => {
    console.log('setValue');

    setInputValue(validHour);
  }, [validHour]);
  const validation = value => {
    const num = Number(value);

    if (value.length > 1 && value[0] === '0') {
      setNoValid('введіть число більше 0');
      return false;
    }

    if (num < 0) {
      setNoValid('введіть число більше 0');
      return false;
    }
    if (isNaN(num)) {
      setNoValid('введіть число');
      return false;
    }

    if (num.toString().length > 2) {
      setNoValid('Занадто велика цифра');
      return false;
    }
    setNoValid('');
    return true;
  };

  const handleOnChange = ({ target: { value } }) => {
    const isValid = validation(value);
    setInputValue(value);
    const numValue = value;
    if (isValid) {
      changeTaskSingleHour({
        taskId,
        idx: currentIdx,
        numValue,
        hoursWastedPerDay,
        indexArray,
        isValid,
      });
    }
  };
  return (
    <HoursWasted
      id="custom-css-standard-input"
      name="single_hours_wasted"
      value={inputValue}
      onChange={handleOnChange}
      error={noValid ? true : undefined}
      helperText={noValid}
      margin="none"
    />
  );
};

// <input
//   className={css['sprints__task-spent']}
//   type="text"
//   name="single_hours_wasted"
//   value={inputValue}
//   onChange={handleOnChange}
//   maxLength="2"
// />;
// {
//   noValid && (
//     <div className={css['sprints__task-spent--validation']}>{noValid}</div>
//   );
// }

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
