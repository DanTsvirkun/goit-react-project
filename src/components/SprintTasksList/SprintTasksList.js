import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SprintTask from '../SprintTask/SprintTask';
import css from './SprintTasksList.module.css';
import BurndownChartBtn from '../BurndownChartBtn/BurndownChartBtn';
import BurndownChartModalWindow from '../BurndownChartModalWindow/BurndownChartModalWindow';
import { getTasksOperation } from '../../redux/operations/TasksOperatins';
import {
  filterTasksAction,
  toggleFilterAction,
} from '../../redux/actions/sprintTasksActions';
import {
  itemsSelector,
  filteredTasksSelector,
} from '../../redux/selectors/TasksSelectors';
import Loader from '../Loader/Loader';
import animation from './animationSprintZoom.module.css';
const SprintTasksList = ({
  tasks,
  getTasks,
  loader,
  error,
  match,
  location,
  filterAction,
  history,
  toggleFilterAction,
  items,
}) => {
  const [toggleAnalytic, setToggleAnalytic] = useState(false);

  useEffect(() => {
    const { sprintId } = match.params;
    getTasks(sprintId);
  }, [match.params.sprintId]);

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const { task } = parsed;
    if (task) {
      filterAction(task);
      toggleFilterAction(true);
    }
    if (!task) {
      toggleFilterAction(false);
      filterAction('');
    }
  }, [match.params.sprintId]);

  const handleToggleAnalytic = () => {
    setToggleAnalytic(state => !state);
    document.querySelector('body').style.overflow = 'hidden';
  };

  return (
    <div className={css.wrapper}>
      <TransitionGroup component="ul" className={css['sprint__tasks-list']}>
        {tasks.map((task, idx) => (
          <CSSTransition key={task.id} classNames={animation} timeout={300}>
            <SprintTask {...task} index={idx} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {!toggleAnalytic && items.length > 1 && (
        <BurndownChartBtn openModal={handleToggleAnalytic} />
      )}
      {toggleAnalytic && (
        <BurndownChartModalWindow onClose={handleToggleAnalytic} />
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  loader: state.loader,
  error: state.error,
  items: itemsSelector(state),
  tasks: filteredTasksSelector(state),
});
const mapDispatchToProps = {
  getTasks: getTasksOperation,
  filterAction: filterTasksAction,
  toggleFilterAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(SprintTasksList);

// [{
//     title: 'KN-1 Configure project',
//   },
//   {
//     title: 'KN-3 Create Button Component',
//   },
//   {
//     title: 'KN-4 Create Button Component',
//   },
//   {
//     title: 'KN-5 Create Button Component',
//   },
