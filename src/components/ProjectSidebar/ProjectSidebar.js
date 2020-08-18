import React, { useState } from "react";
import ProjectsSidebarList from "../ProjectsSidebarList/ProjectsSidebarlist";
import css from "./ProjectSidebar.module.css";
import ProjectCreationModal from "../../components/ProjectCreationModal/ProjectCreationModal";

const ProjectSidebar = ({ match = "test" }) => {
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  return (
    <>
      <div className={css["project-sidebar__wrapper"]}>
        <div className={css["project-sidebar__wrapper-link"]}></div>
        <ProjectsSidebarList match={match} />
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

export default ProjectSidebar;
