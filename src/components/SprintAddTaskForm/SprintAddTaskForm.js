import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { addTaskOperation } from '../../redux/operations/TasksOperatins';
import css from './SprintAddTaskForm.module.css';
import ModalTest from '../ModalTest/ModalTest';
const initialState = {
  title: '',
  hoursPlanned: '',
};
const SprintAddTaskForm = ({ duration = 12, addTask }) => {
  const [taskItem, setTaskItem] = useState(initialState);
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
    // fnTest(sprintDay);
    return sprintDay;
  };
  // const fnTest = sprintDay => {
  //   const res = sprintDay.findIndex(item => {
  //     console.log(item.currentDay);
  //     return item.currentDay === 'Aug 18, 2020';
  //   });
  //   console.log(res);
  // };
  const handleSubmit = e => {
    e.preventDefault();
    const { title, hoursPlanned } = taskItem;
    const correctValue = isNaN(hoursPlanned);
    if (correctValue || hoursPlanned <= 0) {
      alert('невірне число');
      console.log('NaN');
      return;
    }
    const task = {
      sprintId: Date.now(),
      title,
      hoursPlanned,
      hoursWasted: 0,
      hoursWastedPerDay: durationSprint(),
    };

    console.log(task);
    addTask(task);
    setTaskItem(initialState);
  };
  return (
    <ModalTest>
      <div className={css['sprint__form-wrapper']}>
        <form className={css['sprint__form']} onSubmit={handleSubmit}>
          <h3 className={css['sprint__form-title']}> Створення задачі </h3>
          <ul className={css['sprint__form-list']}>
            <li className={css['sprint__form-item']}>
              <label>
                <input
                  className={css['sprint__form-field']}
                  type="text"
                  value={taskItem.title}
                  name="title"
                  onChange={handleChangeInput}
                  required
                  placeholder="Назва задачі"
                />
              </label>
            </li>
            <li className={css['sprint__form-item']}>
              <label>
                <input
                  className={css['sprint__form-field']}
                  type="text"
                  value={taskItem.hoursPlanned}
                  name="hoursPlanned"
                  onChange={handleChangeInput}
                  required
                  placeholder="Заплановано годин"
                />
              </label>
            </li>
          </ul>
          <button className={css['sprint__form-add-btn']}> Готово </button>
          <button className={css['sprint__form-cancel-btn']}> Відміна </button>
        </form>
      </div>
    </ModalTest>
  );
};

// {
//       sprintId,
//       title,
//       hoursPlanned,
//       hoursWasted,
//       hoursWastedPerDay: [
//         {
//           currentDay,
//           singleHoursWasted,
//         },
//       ],
//     },

const mapDispatchToProps = {
  addTask: addTaskOperation,
};

export default connect(null, mapDispatchToProps)(SprintAddTaskForm);

// Человека перебрасывает на текущею дату. Если он возращается назад, эту дату надо изменить на -1, можно использовать
// moment().subtract(1, 'days').calendar(); --- привязать к индексу массива?? add--- moment().add(1, 'days').calendar()
