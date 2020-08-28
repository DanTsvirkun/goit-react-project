import React, { useEffect } from "react";
import Loader from "../../components/Loader/Loader.js";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import projectsOperations from "../../redux/operations/projectsOperations";
import projectsSelectors from "../../redux/selectors/projectsSelectors";
import ProjectsPageItem from "../ProjectsPageItem/ProjectsPageItem";

import listStyle from "./ProjectsPageList.module.css";
import projectsListTransition from "./transitionProjectStyles.module.css";

const ProjectsPageList = ({ projects = [], email, getProjects, loader }) => {

  useEffect(() => {    
    getProjects(email);
  }, []);

  const projectsBool = !!projects;

  return (
    <>
      {loader ? (
        <div className={listStyle.loader}>
          <Loader />
        </div>
      ) : (
        projects.length === 0 && (
          <h2 className={listStyle.emptyList}>
            Ваша колекція проектів порожня, скористайтесь кнопкою "Створити
            проект"
          </h2>
        )
      )}

      <TransitionGroup component="ul" className={listStyle.list}>
        {projects.map((project) => (
          <CSSTransition
            in={projectsBool}
            key={project.id}
            timeout={250}
            classNames={projectsListTransition}
          >
            <ProjectsPageItem id={project.id} project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: projectsSelectors.projectsSelector(state),
    email: projectsSelectors.authEmailSelector(state),
    loader: projectsSelectors.newLoaderSelector(state),
  };
};

const mapDispatchToProps = {
  getProjects: projectsOperations.getProjectsByEmailOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageList);
