import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import projectsOperations from "../../redux/operations/projectsOperations";
import projectsSelectors from "../../redux/selectors/projectsSelectors";
import ProjectsPageItem from "../ProjectsPageItem/ProjectsPageItem";

import listStyle from "./ProjectsPageList.module.css";

const ProjectsPageList = ({ projects = [], getProjects }) => {
  console.log("projects", projects);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ul className={listStyle.list}>
      {projects.map((project) => (
        <ProjectsPageItem key={project.id} {...project} />
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
  getProjects: projectsOperations.getPRojectsOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageList);
