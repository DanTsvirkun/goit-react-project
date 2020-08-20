import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProjectsSidebarList from "../ProjectsSidebarList/ProjectsSidebarlist";
import ProjectCreationModal from "../../components/ProjectCreationModal/ProjectCreationModal";
import css from "./ProjectSidebar.module.css";
import projectsOperations from "../../redux/operations/projectsOperations";

const ProjectSidebar = ({ getProjects }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  return (
    <>
      <div className={css["project-sidebar__wrapper"]}>
        <ProjectsSidebarList />
        <div className={css["project-sidebar__add-wrapper"]}>
          <button
            className={css["project-sidebar__add-btn"]}
            onClick={modalToggle}
          ></button>
          <p className={css["project-sidebar__add-description"]}>
            Створити проект
          </p>
        </div>
      </div>
      <ProjectCreationModal status={modal} onClose={modalToggle} />
    </>
  );
};

const mapDispatchToProps = {
  getProjects: projectsOperations.getProjectsOperation,
};

export default connect(null, mapDispatchToProps)(ProjectSidebar);
