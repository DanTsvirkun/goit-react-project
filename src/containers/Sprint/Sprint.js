import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SprintSidebar from '../../components/SprintSidebar/SprintSidebar';
import SprintHeader from '../../components/SprintHeader/SprintHeader';
import {
  filterTasksAction,
  toggleFilterAction,
  indexDayAction,
} from '../../redux/actions/sprintTasksActions';
import { getTasksOperation } from '../../redux/operations/TasksOperatins';
import { getSprintByProjectId } from '../../redux/operations/SprintOperation';
import SprintTableTitle from '../../components/SprintTableTitle/SprintTableTitle';
import SprintTasksList from '../../components/SprintTasksList/SprintTasksList';
import Loader from '../../components/Loader/Loader';
import getProjectsbyEMAIL from '../../redux/operations/projectsOperations';
import { itemsSelector } from '../../redux/selectors/TasksSelectors';
import { findCurrentDay } from '../../helpers/newArrayTasks';
import css from './Sprint.module.css';
const Sprint = ({
  match,
  toggleFilterAction,
  location,
  history,
  loader,
  error,
  getByEmails,
  email,
  projectId,
  filterAction,
  getTasks,
  getSprintByProjectId,
  sprints,
  tasks,
  projects,
  indexDayAction,
}) => {
  const params = match.params;

  const handleCloseFilter = e => {
    if (!e.target.dataset.filter) {
      toggleFilterAction(false);
      return;
    }
  };

  useEffect(() => {
    let currentProjects;
    async function fetchData() {
      currentProjects = await getByEmails(email);
      let currentProject = currentProjects.find(
        project => project.id === projectId,
      );
      if (currentProject === undefined) {
        currentProject = {
          members: [],
        };
      }
      if (!currentProject.members.includes(email)) {
        history.replace('/projects');
        alert('Ви не є участником цього проекту.');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const { sprintId } = params;
    const { projectId } = params;

    if (!sprintId && !projectId) {
      return;
    }

    const getRequst = async () => {
      if (sprints.length < 1) {
        const answer = await getSprintByProjectId(projectId);

        const hasSprint = answer.find(el => el.id === sprintId);

        if (!hasSprint) {
          alert('Шкода, але такого спринту немає');
          history.replace('/projects');
          return;
        }
      }

      const answerTasks = await getTasks(sprintId);
      // indexDayAction(findCurrentDay(answerTasks));
    };
    getRequst();
    return () => {};
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
        {loader && tasks.length < 1 && (
          <div className={css['sprint__loader-wrapper']}>
            <Loader />
          </div>
        )}
        <SprintHeader params={params} /> <SprintTableTitle />
        <SprintTasksList match={match} location={location} history={history} />
        {!tasks.length && !loader && (
          <h2 className={css.emptyList}>
            Ваш спринт не має задач.Скористайтеся кнопкою "Створити задачу". Для
            появи аналітики вам треба додати мінімум 3 завдання
          </h2>
        )}
      </div>
    </section>
  );
};
const mapDispatchToProps = {
  getTasks: getTasksOperation,
  filterAction: filterTasksAction,
  toggleFilterAction,
  getByEmails: getProjectsbyEMAIL.getProjectsByEmailOperation,
  getSprintByProjectId,
  indexDayAction,
};
const mapStateToProps = (state, ownProps) => ({
  loader: state.loader,
  error: state.error,
  email: state.auth.email,
  projectId: ownProps.location.pathname.split('/')[2],
  sprints: state.sprints.items,
  tasks: state.tasks.items,
  projects: state.projects,
});
export default connect(mapStateToProps, mapDispatchToProps)(Sprint);

// <Route path={`${match.path}/:sprintId`} component={SprintTasksList} />;
