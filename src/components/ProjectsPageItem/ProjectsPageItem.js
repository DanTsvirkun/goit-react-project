import React from "react";

import itemStyle from "./ProjectsPageItem.module.css";

import imgDel from "./projectImg/delete.svg";

const ProjectsPageItem = ({ title, description }) => {
  return (
    <>
      <li className={itemStyle.item}>
        <h2 className={itemStyle.itemTitle}>{title}</h2>
        <p className={itemStyle.itemDescription}>
         {description}
        </p>
        <button type="button" className={itemStyle.itemTrashBtn}></button>
      </li>
    </>
  );
};

export default ProjectsPageItem;
