import React, { useState } from "react";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar";
import SingleSprint from "../../components/SingleSprint/SingleSprint";
import styles from "./ProjectPage.module.css";
import CreatingSprint from "../../components/CreatingSprint/CreatingSprint";
import SprintCreationModal from "../../components/SprintCreationModal/SprintCreationModal";

const ProjectPage = () => {
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  return (
    <>
      <div className={styles.page_wrapper}>
        <ProjectSidebar />
        <CreatingSprint />
        <div className={styles.projectWrapper}>
          <div className={styles.project__header__wrapper}>
            <div
              className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
            >
              <h1 className={styles.project__header}>Project 1</h1>
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
            <SingleSprint />
            <SprintCreationModal status={modal} onClose={modalToggle} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
