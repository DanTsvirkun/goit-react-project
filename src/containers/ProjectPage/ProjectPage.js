import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
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
  getSprintByProjectId,
} from "../../redux/operations/SprintOperation";
import { useLocation } from "react-router-dom";

import styles from "./ProjectPage.module.css";

const ProjectPage = ({
  sprints = [],
  getSprints,
  project = {},
  location,
  getSprintByProjectId,
}) => {
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  let newLocation = useLocation();

  useEffect(() => {
    getSprints();
    // getSprintByProjectId(id);
  }, [getSprints]);

  return (
    <>
      <div className={styles.page_wrapper}>
        <ProjectSidebar />
        <CreatingSprint location={location} />
        <div className={styles.projectWrapper}>
          <div className={styles.project__header__wrapper}>
            <div
              className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
            >
              <h1 className={styles.project__header}>{project.title}</h1>
              <button
                className={`${styles.button} ${styles.button__pencil}`}
              ></button>
            </div>
            <div
              className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
            >
              <button
                className={`${styles.button} ${styles.button__plus}`}
                onClick={modalToggle}
              ></button>
              <p className={styles.sprint_text}>Створити спринт</p>
            </div>
          </div>
          <div className={styles.project__info}></div>
          <ul className={styles.sprints_container}>
            {sprints.map((sprint) => (
              <SingleSprint key={sprint.id} id={sprint.id} sprint={sprint} />
            ))}
          </ul>
          <SprintCreationModal status={modal} onClose={modalToggle} />
        </div>
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
  };
};

const mapDispatchToProps = {
  getSprints: getSprintsOperation,
  // getSprintByProjectId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
