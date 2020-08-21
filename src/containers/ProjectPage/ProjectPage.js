import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { connect, useSelector } from "react-redux";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar";
import SingleSprint from "../../components/SingleSprint/SingleSprint";
import CreatingSprint from "../../components/CreatingSprint/CreatingSprint";
import SprintCreationModal from "../../components/SprintCreationModal/SprintCreationModal";
import { getSprints } from "../../redux/actions/sprintActions";
import {
  itemsSelector,
  itemIdSelector,
} from "../../redux/selectors/SprintsSelector";
import {
  getSprintsOperation,
  changeProjectTitle,
  getSprintByProjectId,
} from "../../redux/operations/SprintOperation";
import MembersCreationModal from "../../components/MembersModal/MembersModal";
import Loader from "../../components/Loader/Loader";
import getProjectsbyEMAIL from "../../redux/operations/projectsOperations";
import projectSelectors from "../../redux/selectors/projectsSelectors";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./ProjectPage.module.css";
import transitionAnimation from "../../components/ProjectsPageList/transitionProjectStyles.module.css";
import animation from "../../components/SprintHeader/animationExit.module.css";

const ProjectPage = ({
  history,
  match,
  sprints = [],
  project = {},
  projectId,
  location,
  loader,
  error,
  getSprintByProjectId,
  getByEmails,
  email,
  projects,
  getByEmailCustom,
  changeProjectTitle,
}) => {
  const [modal, setModal] = useState(false);
  const [membersModal, setMembersModal] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [isUpdate, setUpdate] = useState(true);
  const [active, setActive] = useState(false);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  const membersModalToggle = () => {
    setMembersModal((state) => !state);
  };

  useEffect(() => {
    let currentProjects;
    async function fetchData() {
      currentProjects = await getByEmails(email);
      await getSprintByProjectId(projectId);
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
  }, [match.params.projectId]);

  const sprintsBool = !!sprints;

  // http://localhost:3000/projects/L7iOeUSqnngFrL1VRlbv/sprints

  return (
    <>
      <div className={styles.page_wrapper}>
        {loader && (
          <div className={styles.loader__tuning}>
            <Loader />
          </div>
        )}
        {!loader && !error && (
          <>
            <ProjectSidebar />
            <CreatingSprint location={location} />
            <div className={styles.projectWrapper}>
              <div className={styles.project__header__wrapper}>
                <div
                  className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
                >
                  <CSSTransition
                    classNames={animation}
                    in={active}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div className={styles.input_change_block}>
                      <input
                        type="text"
                        className={styles.input_change}
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          await changeProjectTitle(projectId, title);
                          await getByEmailCustom(email);
                          setUpdate(!isUpdate);
                        }}
                        className={styles["edit__button--active"]}
                      ></button>
                    </div>
                  </CSSTransition>

                  <CSSTransition
                    classNames={animation}
                    in={isUpdate}
                    timeout={300}
                    unmountOnExit
                    mountOnEnter
                    onExited={() => setActive(true)}
                    onEnter={() => setActive(false)}
                  >
                    <>
                      <h2 className={styles.project__header}>
                        {project.title}
                      </h2>
                      <button
                        onClick={() => setUpdate(!isUpdate)}
                        className={styles.edit__button}
                      ></button>
                    </>
                  </CSSTransition>
                </div>
                <div className={styles.plusBtnWrapper}>
                  <div
                    className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
                  >
                    <button
                      className={`${styles.button} ${styles.button__plus}`}
                      onClick={modalToggle}
                    ></button>
                    <p className={styles.sprint_text}>Створити спринт</p>
                  </div>
                  <div
                    className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
                  >
                    <button
                      className={`${styles.button} ${styles.button__plus}`}
                      onClick={membersModalToggle}
                    ></button>
                    <p className={styles.sprint_text}>Додати людей</p>
                  </div>
                </div>
              </div>
              <div className={styles.project__info}></div>
              {!sprints.length && (
                <h2 className={styles.emptyList}>
                  Ваш проект не має спринтів, скористайтесь кнопкою "Створити
                  спринт"
                </h2>
              )}
              <TransitionGroup
                component="ul"
                className={styles.sprints_container}
              >
                {sprints.map((sprint) => (
                  <CSSTransition
                    key={sprint.id}
                    in={sprintsBool}
                    timeout={250}
                    classNames={transitionAnimation}
                  >
                    <SingleSprint
                      id={sprint.id}
                      sprint={sprint}
                      history={history}
                      match={match}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
              <SprintCreationModal status={modal} onClose={modalToggle} />
              <MembersCreationModal
                status={membersModal}
                onClose={membersModalToggle}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    sprints: itemsSelector(state),
    project: itemIdSelector(state, ownProps.location.pathname.split("/")[2]),
    location: ownProps.location,
    projectId: ownProps.location.pathname.split("/")[2],
    loader: state.loader,
    error: state.error,
    projectsLength: state.projects.length,
    projects: state.projects,
    email: projectSelectors.authEmailSelector(state),
  };
};

const mapDispatchToProps = {
  getSprintByProjectId,
  getByEmails: getProjectsbyEMAIL.getProjectsByEmailOperation,
  changeProjectTitle,
  getByEmailCustom: getProjectsbyEMAIL.getProjectsByEmailOperationCustom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
