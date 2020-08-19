import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import weekDays from 'moment-business-days';
import moment from 'moment';
import { connect } from 'react-redux';
import { addTaskOperation } from '../../redux/operations/TasksOperatins';
import css from './SprintAddTaskForm.module.css';
// import ModalTest from '../ModalTest/ModalTest';
import ModalSidebar from '../ModalSidebar/ModalSidebar';
const initialState = {
  title: '',
  hoursPlanned: '',
};

const oneDay = 86400000;
const SprintAddTaskForm = ({
  startDate = '12.08.2020',
  duration = 8,
  endDate = 1598002200000,
  addTask,
  status,
  onClose,
}) => {
  const params = useParams();
  const [taskItem, setTaskItem] = useState(initialState);
  const [noValid, setNoValid] = useState('');
  const [noValidTitle, setNoValidTitle] = useState('');
  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    setNoValid('');
    setNoValidTitle('');
    setTaskItem(state => ({
      ...state,
      [name]: value,
    }));
  };

  const durationSprint = () => {
    let sprintDay = [];
    for (let i = 0; i < duration; i++) {
      const day = weekDays(startDate, 'DD.MM.YYYY').businessAdd(i)._d;
      sprintDay.push({
        currentDay: moment(day).format('DD.MM.YYYY'),
        singleHoursWasted: 0,
      });
    }
    return sprintDay;
  };

  const validation = (value, title) => {
    const num = Number(value);

    if (title.trim().length < 5) {
      setNoValidTitle(
        'Будь ласка, введіть більше 6 символів для корректной назви задачі.',
      );
      return false;
    }

    if (!num) {
      setNoValid(
        'Будь ласка, оберіть скільки годин вам потрібно для цієї задачі.',
      );
      return false;
    }

    if (num.toString().length > 6) {
      setNoValid('Занадто велика цифра. Будь ласка, введіть менше 6 символів');
      return false;
    }

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { title, hoursPlanned } = taskItem;
    const { sprintId } = params;
    if (!sprintId) {
      return;
    }
    if (validation(hoursPlanned, title)) {
      const task = {
        sprintId,
        title,
        hoursPlanned,
        hoursWasted: 0,
        hoursWastedPerDay: durationSprint(),
      };
      console.log(task);
      addTask(task);
      setTaskItem(initialState);
    }
  };
  return (
    <ModalSidebar status={status} onSubmit={handleSubmit} onClose={onClose}>
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
                minLength="1"
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
                minLength="1"
              />
            </label>
          </li>
          {noValidTitle && (
            <li className={css['sprint__form-field--validation-title']}>
              {noValidTitle}
            </li>
          )}
          {noValid && (
            <li className={css['sprint__form-field--validation-plan']}>
              {noValid}
            </li>
          )}
        </ul>
      </form>
    </ModalSidebar>
  );
};

// <button className={css['sprint__form-add-btn']}> Готово </button>
//           <button className={css['sprint__form-cancel-btn']}> Відміна </button>

const mapDispatchToProps = {
  addTask: addTaskOperation,
};

export default connect(null, mapDispatchToProps)(SprintAddTaskForm);
