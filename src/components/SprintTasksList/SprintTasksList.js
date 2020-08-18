import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
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
}) => {
  const [toggleAnalytic, setToggleAnalytic] = useState(false);

  useEffect(() => {
    const { sprintId } = match.params;
    getTasks(sprintId);
    console.log(match.params);
  }, [match.params.sprintId]);

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const { task } = parsed;
    console.log(location.search);

    if (task) {
      filterAction(task);
    }
    if (!task) {
      toggleFilterAction(false);
      filterAction('');
    }
  }, [match.params.sprintId]);

  const handleToggleAnalytic = () => {
    setToggleAnalytic(state => !state);
  };

  return (
    <>
      {' '}
      {!loader && !error && (
        <div className={css.wrapper}>
          <ul className={css['sprint__tasks-list']}>
            {' '}
            {tasks.map((task, idx) => (
              <SprintTask key={task.id} {...task} index={idx} />
            ))}{' '}
          </ul>{' '}
          {!toggleAnalytic && (
            <BurndownChartBtn openModal={handleToggleAnalytic} />
          )}{' '}
          {toggleAnalytic && (
            <BurndownChartModalWindow onClose={handleToggleAnalytic} />
          )}{' '}
        </div>
      )}{' '}
    </>
  );
};
const mapStateToProps = state => ({
  loader: state.loader,
  error: state.error,
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
