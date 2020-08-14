import React from "react";
import ProjectsSidebarList from "../ProjectsSidebarList/ProjectsSidebarlist";
import css from "./ProjectSidebar.module.css";

const ProjectSidebar = ({ match = "test" }) => {
  return (
    <div className={css["project-sidebar__wrapper"]}>
      <div className={css["project-sidebar__wrapper-link"]}></div>
      <ProjectsSidebarList match={match} />
      <div className={css["project-sidebar__add-wrapper"]}>
        <button className={css["project-sidebar__add-btn"]}> </button>
        <p className={css["project-sidebar__add-description"]}>
          Створити проект
        </p>
      </div>
    </div>
  );
};

export default ProjectSidebar;
