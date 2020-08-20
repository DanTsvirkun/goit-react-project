import React, { useState } from "react";
import { connect } from "react-redux";
import ProjectsPageList from "../../components/ProjectsPageList/ProjectsPageList";
import ProjectCreationModal from "../../components/ProjectCreationModal/ProjectCreationModal";
import projectsSelectors from "../../redux/selectors/projectsSelectors";

import projectStyles from "./Projects.module.css";

const Projects = ({projects}) => {
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
      {projects.length === 0 && <h2 className={projectStyles.emptyList}>Ваша колекція проектів порожня, скористайтесь кнопкою "Створити проект"</h2>} 
      <ProjectCreationModal status={modal} onClose={modalToggle} />       
      <ProjectsPageList />    
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: projectsSelectors.projectsSelector(state),   
  };
};

export default connect(mapStateToProps)(Projects);
