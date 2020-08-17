import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {} from '../../redux/operations/TasksOperatins';
import { hoursWastedPerDay } from '../../redux/selectors/TasksSelectors';
import css from './SprintTaskInput.module.css';
const currentDate = moment().format('ll');
const SprintTaskInput = ({ hoursWastedPerDay, hourse }) => {
  //   console.log(hoursWastedPerDay);
  //   console.log(hourse);

  const findCurrentDay = () => {
    const res = hoursWastedPerDay.find((el, idx) => {
      const isCorrectDay = el.currentDay === currentDate;

      if (isCorrectDay) {
        return el;
      }
      if (hoursWastedPerDay.length === idx + 1 && !isCorrectDay) {
        return hoursWastedPerDay[idx];
      }
    });
    return res.singleHoursWasted;
  };

  const handleOnChange = ({ target: { value } }) => {
    console.log(value);
  };
  return (
    <input
      className={css['sprints__task-spent']}
      type="text"
      name="single_hours_wasted"
      value={findCurrentDay()}
      onChange={handleOnChange}
    />
  );
};

const mapStateToProps = state => ({
  //   hourse: hoursWastedPerDay(state),
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SprintTaskInput);
