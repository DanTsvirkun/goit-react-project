import React, { useState } from 'react';
import moment from 'moment';
import css from './SprintAddTaskForm.module.css';
import ModalTest from '../ModalTest/ModalTest';
const SprintAddTaskForm = ({ duration = 40 }) => {
  const [taskItem, setTaskItem] = useState({
    title: '',
    hoursPlanned: '',
  });
  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    setTaskItem(state => ({
      ...state,
      [name]: value,
    }));
  };
  const durationSprint = () => {
    let sprintDay = [];
    for (let i = 0; i < duration; i++) {
      sprintDay.push({
        currentDay: moment().add(i, 'days').format('ll'),
        singleHoursWasted: 0,
      });
    }
    fnTest(sprintDay);
    return sprintDay;
  };
  const fnTest = sprintDay => {
    const res = sprintDay.findIndex(item => {
      console.log(item.currentDay);
      return item.currentDay === 'Aug 18, 2020';
    });
    console.log(res);
    // console.log(
    //   moment().add(sprintDay[0].currentDay, res).calendar().format('LL'),
    // );
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { title, hoursPlanned } = taskItem;
    // console.log(moment().add(10, 'days').format('ll'));
    // console.log(moment().format('ll'));

    const correctValue = isNaN(hoursPlanned);
    if (correctValue) {
      console.log('NaN');
      return;
    }
    const task = {
      title,
      hoursPlanned,
      hoursWasted: 0,
      hoursWastedPerDay: durationSprint(),
    };

    console.log(task);
  };
  return (
    <ModalTest>
      <div className={css['sprint__form-wrapper']}>
        <form className={css['sprint__form']} onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={taskItem.title}
              name="title"
              onChange={handleChangeInput}
              minLength="3"
              required
            />
          </label>
          <label>
            Number
            <input
              type="text"
              value={taskItem.hoursPlanned}
              name="hoursPlanned"
              onChange={handleChangeInput}
              required
            />
          </label>
          <button> add Task </button>
        </form>
      </div>
    </ModalTest>
  );
};

export default SprintAddTaskForm;

// Человека перебрасывает на текущею дату. Если он возращается назад, эту дату надо изменить на -1, можно использовать
// moment().subtract(1, 'days').calendar(); --- привязать к индексу массива?? add--- moment().add(1, 'days').calendar()
