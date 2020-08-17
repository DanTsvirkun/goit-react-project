import React from "react";
import { connect } from "react-redux";
import projectsOperations from "../../redux/operations/projectsOperations.js";

import itemStyle from "./ProjectsPageItem.module.css";

import imgDel from "./projectImg/delete.svg";

const ProjectsPageItem = ({project: { title, description, id}, deleteProject }) => {
  return (
    <>
      <li className={itemStyle.item}>
        <h2 className={itemStyle.itemTitle}>{title}</h2>
        <p className={itemStyle.itemDescription}>{description}</p>
        <button
          type="button"
          onClick={deleteProject}
          className={itemStyle.itemTrashBtn}
          id={id}
        ></button>
      </li>
    </>
  );
};

const mapStateToProps = (state, {id}) => {
  const project = state.projects.find((item) => item.id === id)  
  return project ;
  
};

const mapDispatchToProps = (dispatch) => ({
  deleteProject: (e) => dispatch(projectsOperations.deleteProjectOperation(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageItem);
