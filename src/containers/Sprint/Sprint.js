import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import SprintSidebar from "../../components/SprintSidebar/SprintSidebar";
import css from "./Sprint.module.css";
import SprintHeader from "../../components/SprintHeader/SprintHeader";
import { toggleFilterAction } from "../../redux/actions/sprintTasksActions";
import SprintTableTitle from "../../components/SprintTableTitle/SprintTableTitle";
import SprintTasksList from "../../components/SprintTasksList/SprintTasksList";
import Loader from "../../components/Loader/Loader";
import getProjectsbyEMAIL from "../../redux/operations/projectsOperations";
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
}) => {
  const handleCloseFilter = (e) => {
    // console.log(e);

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
        currentProject = { members: [] };
      }
      if (!currentProject.members.includes(email)) {
        history.replace("/projects");
        alert("Ви не є участником цього проекту.");
      }
    }
    fetchData();
  }, []);

  return (
    <section className={css.container} onClick={handleCloseFilter}>
      <SprintSidebar />
      <div className={css["sprint__main-wrapper"]}>
        {loader && (
          <div className={css["sprint__loader-wrapper"]}>
            <Loader />
          </div>
        )}
        <SprintHeader />
        <SprintTableTitle />

        <SprintTasksList match={match} location={location} history={history} />
      </div>
    </section>
  );
};
const mapDispatchToProps = {
  toggleFilterAction,
  getByEmails: getProjectsbyEMAIL.getProjectsByEmailOperation,
};
const mapStateToProps = (state, ownProps) => ({
  loader: state.loader,
  error: state.error,
  email: state.auth.email,
  projectId: ownProps.location.pathname.split("/")[2],
});
export default connect(mapStateToProps, mapDispatchToProps)(Sprint);

// <Route path={`${match.path}/:sprintId`} component={SprintTasksList} />;
