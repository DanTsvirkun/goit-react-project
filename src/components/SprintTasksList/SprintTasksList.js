import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SprintTask from '../SprintTask/SprintTask';
import css from './SprintTasksList.module.css';
import BurndownChartBtn from '../BurndownChartBtn/BurndownChartBtn';
import BurndownChartModalWindow from '../BurndownChartModalWindow/BurndownChartModalWindow';
import { getTasksOperation } from '../../redux/operations/TasksOperatins';
import { itemsSelector } from '../../redux/selectors/TasksSelectors';
const SprintTasksList = ({ tasks, getTasks, loader, error }) => {
  const [toggleAnalytic, setToggleAnalytic] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const handleToggleAnalytic = () => {
    setToggleAnalytic(state => !state);
  };

  return (
    <>
      {!loader && !error && (
        <div className={css.wrapper}>
          <ul className={css['sprint__tasks-list']}>
            {tasks.map((task, idx) => (
              <SprintTask key={task.id} {...task} index={idx} />
            ))}
          </ul>
          {!toggleAnalytic && (
            <BurndownChartBtn openModal={handleToggleAnalytic} />
          )}
          {toggleAnalytic && (
            <BurndownChartModalWindow onClose={handleToggleAnalytic} />
          )}
        </div>
      )}
    </>
  );
};
const mapStateToProps = state => ({
  loader: state.loader,
  error: state.error,
  tasks: itemsSelector(state),
});
const mapDispatchToProps = {
  getTasks: getTasksOperation,
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
