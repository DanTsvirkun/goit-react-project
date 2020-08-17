import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import projectsOperations from "../../redux/operations/projectsOperations";
import projectsSelectors from "../../redux/selectors/projectsSelectors";
import ProjectsPageItem from "../ProjectsPageItem/ProjectsPageItem";

import listStyle from "./ProjectsPageList.module.css";

const ProjectsPageList = ({ projects = [], getProjects }) => { 

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ul className={listStyle.list}>
      {projects.map((project) => (
        <ProjectsPageItem key={project.id} id={project.id} project={project} />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    error: state.error,
    projects: projectsSelectors.projectsSelector(state),
  }
};

const mapDispatchToProps = {
  getProjects: projectsOperations.getProjectsOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageList);
