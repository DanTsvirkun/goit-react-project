import React, { useState } from "react";
import ProjectsPageList from "../../components/ProjectsPageList/ProjectsPageList";
import ProjectCreationModal from "../../components/ProjectCreationModal/ProjectCreationModal";

import projectStyles from "./Projects.module.css";

const Projects = () => {
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  return (
    <>
      <div className={projectStyles.headBar}>
        <h1 className={projectStyles.headBarTitle}>Проекти</h1>
        <label className={projectStyles.headBarLabel}>
          <button
            name="createProject"
            className={projectStyles.headBarBtn}
            onClick={modalToggle}
          ></button>
          Створити проект
        </label>
      </div>
      <ProjectCreationModal status={modal} onClose={modalToggle} />
      <ProjectsPageList />
    </>
  );
};

export default Projects;
