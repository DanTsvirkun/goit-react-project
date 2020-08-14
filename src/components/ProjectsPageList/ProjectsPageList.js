import React from 'react';
import ProjectsPageItem from "../ProjectsPageItem/ProjectsPageItem"

import listStyle from "./ProjectsPageList.module.css"

const ProjectsPageList = () => {
  return (
    <ul className={listStyle.list}>
      <ProjectsPageItem/>
    </ul>
  );
};

export default ProjectsPageList;