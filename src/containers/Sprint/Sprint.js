import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SprintSidebar from '../../components/SprintSidebar/SprintSidebar';
import css from './Sprint.module.css';
import SprintHeader from '../../components/SprintHeader/SprintHeader';
import {
  filterTasksAction,
  toggleFilterAction,
} from '../../redux/actions/sprintTasksActions';
import { getTasksOperation } from '../../redux/operations/TasksOperatins';
import { getSprintByProjectId } from '../../redux/operations/SprintOperation';
import SprintTableTitle from '../../components/SprintTableTitle/SprintTableTitle';
import SprintTasksList from '../../components/SprintTasksList/SprintTasksList';
import Loader from '../../components/Loader/Loader';
const Sprint = ({
  match,
  toggleFilterAction,
  location,
  history,
  loader,
  error,
  filterAction,
  getTasks,
  getSprintByProjectId,
  sprints,
}) => {
  const params = match.params;
  const handleCloseFilter = e => {
    if (!e.target.dataset.filter) {
      toggleFilterAction(false);
      return;
    }
  };

  useEffect(async () => {
    const { sprintId } = params;
    const { projectId } = params;
    console.log(sprintId);
    console.log(projectId);

    if (!sprintId && !projectId) {
      return;
    }
    if (sprints.length === 0) {
      await getSprintByProjectId(projectId);
    }
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

  return (
    <section className={css.container} onClick={handleCloseFilter}>
      <SprintSidebar />
      <div className={css['sprint__main-wrapper']}>
        {loader && (
          <div className={css['sprint__loader-wrapper']}>
            <Loader />
          </div>
        )}

        <SprintHeader params={params} />
        <SprintTableTitle />
        <SprintTasksList match={match} location={location} history={history} />
      </div>
    </section>
  );
};
const mapDispatchToProps = {
  getTasks: getTasksOperation,
  filterAction: filterTasksAction,
  toggleFilterAction,
  getSprintByProjectId,
};
const mapStateToProps = state => ({
  loader: state.loader,
  error: state.error,
  sprints: state.sprints.items,
});
export default connect(mapStateToProps, mapDispatchToProps)(Sprint);

// <Route path={`${match.path}/:sprintId`} component={SprintTasksList} />;
