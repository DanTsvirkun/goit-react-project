import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { filterSelector } from '../../redux/selectors/TasksSelectors';
import { filterTasksAction } from '../../redux/actions/sprintTasksActions';
import css from './SprintTableTitle.module.css';
import animation from './animation.module.css';

const SprintTableTitle = ({ filter, filterTasksAction }) => {
  const [toggleInput, setToggleInput] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const handleTaskFilter = ({ target }) => {
    console.log(history);
    console.log(location);
    history.push({
      ...location,
      search: `task=${target.value}`,
    });

    filterTasksAction(target.value);
  };

  const handleToggle = () => {
    setToggleInput(state => !state);
  };
  return (
    <div className={css.container}>
      <ul className={css['sprint__table-list']}>
        <li className={css['sprint__table-item']}>
          <p className={css['sprint__table-title']}>Задача</p>
        </li>
        <li className={css['sprint__table-item']}>
          <p className={css['sprint__table-title']}>Заплановано годин</p>
        </li>
        <li className={css['sprint__table-item']}>
          <p className={css['sprint__table-title']}>Витрачено год / день</p>
        </li>
        <li className={css['sprint__table-item']}>
          <p className={css['sprint__table-title']}>Витрачено годин</p>
        </li>
        <li
          className={`${css['sprint__table-item--relative']} ${css['sprint__table-item']}`}
        >
          <button
            onClick={handleToggle}
            className={`${css['sprint__filter-task-btn']}`}
          ></button>

          <CSSTransition
            classNames={animation}
            in={toggleInput}
            timeout={200}
            unmountOnExit
            mountOnEnter
          >
            <input
              className={css['sprint__filter-task']}
              type="text"
              value={filter}
              name="taskFilter"
              onChange={handleTaskFilter}
            />
          </CSSTransition>
        </li>
      </ul>
    </div>
  );
};
const mapStateToProps = state => ({
  filter: filterSelector(state),
});
const mapDispatchToProps = {
  filterTasksAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(SprintTableTitle);
