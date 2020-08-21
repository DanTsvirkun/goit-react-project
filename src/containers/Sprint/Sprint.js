import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import SprintSidebar from "../../components/SprintSidebar/SprintSidebar";
import css from "./Sprint.module.css";
import SprintHeader from "../../components/SprintHeader/SprintHeader";
import {
  filterTasksAction,
  toggleFilterAction,
} from "../../redux/actions/sprintTasksActions";
import { getTasksOperation } from "../../redux/operations/TasksOperatins";
import { getSprintByProjectId } from "../../redux/operations/SprintOperation";
import SprintTableTitle from "../../components/SprintTableTitle/SprintTableTitle";
import SprintTasksList from "../../components/SprintTasksList/SprintTasksList";
import Loader from "../../components/Loader/Loader";
import getProjectsbyEMAIL from "../../redux/operations/projectsOperations";
import { getTasks } from "../../redux/actions/sprintTasksActions";

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
  clearTasks,
}) => {
  const params = match.params;

  const handleCloseFilter = (e) => {
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
        (project) => project.id === projectId
      );
      if (currentProject === undefined) {
        currentProject = {
          members: [],
        };
      }
      if (!currentProject.members.includes(email)) {
        history.replace("/projects");
        alert("Ви не є участником цього проекту.");
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
        // const hasProject = projects.find(el => el.id === projectId);
        // console.log(hasProject);

        // if (!hasProject) {
        //   alert('шкода, але такого проекту немає');
        //   history.replace('/projects');
        //   return;
        // }
        console.log(answer);
        const hasSprint = answer.find((el) => el.id === sprintId);
        console.log(hasSprint);
        if (!hasSprint) {
          alert("Шкода, але такого спринту немає");
          history.replace("/projects");
          return;
        }
      }
      await getTasks(sprintId);
    };
    getRequst();
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
      filterAction("");
    }
  }, [match.params.sprintId]);

  // useEffect(() => {
  //   return function clearTasks() {
  //     clearTasks([]);
  //   };
  // });

  return (
    <section className={css.container} onClick={handleCloseFilter}>
      <SprintSidebar />
      <div className={css["sprint__main-wrapper"]}>
        {loader && (
          <div className={css["sprint__loader-wrapper"]}>
            <Loader />
          </div>
        )}
        <SprintHeader params={params} /> <SprintTableTitle />
        <SprintTasksList match={match} location={location} history={history} />
        {!tasks.length && !loader && (
          <h2 className={css.emptyList}>
            Ваш спринт не має задач.Скористайтеся кнопкою "Створити задачу"
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
  clearTasks: getTasks,
};
const mapStateToProps = (state, ownProps) => ({
  loader: state.loader,
  error: state.error,
  email: state.auth.email,
  projectId: ownProps.location.pathname.split("/")[2],
  sprints: state.sprints.items,
  tasks: state.tasks.items,
  projects: state.projects,
});
export default connect(mapStateToProps, mapDispatchToProps)(Sprint);

// <Route path={`${match.path}/:sprintId`} component={SprintTasksList} />;
