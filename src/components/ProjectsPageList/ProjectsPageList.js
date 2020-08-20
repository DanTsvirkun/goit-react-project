import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import projectsOperations from "../../redux/operations/projectsOperations";
import projectsSelectors from "../../redux/selectors/projectsSelectors";
import ProjectsPageItem from "../ProjectsPageItem/ProjectsPageItem";

import listStyle from "./ProjectsPageList.module.css";

const ProjectsPageList = ({ projects = [], email, getProjects }) => {
  useEffect(() => {
    getProjects(email);
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
    projects: projectsSelectors.projectsSelector(state),
    email: projectsSelectors.authEmailSelector(state),
  };
};

const mapDispatchToProps = {
  getProjects: projectsOperations.getProjectsByEmailOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageList);
