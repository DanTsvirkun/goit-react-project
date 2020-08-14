import React, { Component } from "react";
import ProjectsPageList from "../../components/ProjectsPageList/ProjectsPageList";
import ProjectCreationForm from "../../components/ProjectCreationForm/ProjectCreationForm"

import projectStyles from "./Projects.module.css";

class Projects extends Component {
  render() {
    return (
      <>
        <div className={projectStyles.headBar}>
          <h1 className={projectStyles.headBarTitle}>Проекти</h1>

          <label className={projectStyles.headBarLabel}>
            <button
              name="createProject"
              className={projectStyles.headBarBtn}
            ></button>
            Створити проект
          </label>
        </div>
        {/* <ProjectsPageList /> */}
        <ProjectCreationForm/>
      </>
    );
  }
}

export default Projects;
