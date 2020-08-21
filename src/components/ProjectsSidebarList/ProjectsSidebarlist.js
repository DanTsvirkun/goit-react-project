import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { connect } from "react-redux";
import getProjectsbyEMAIL from "../../redux/operations/projectsOperations";
import projectsSelectors from "../../redux/selectors/projectsSelectors";
import css from "./ProjectsSidebarlist.module.css";

const ProjectsSidebarList = ({ projects }) => {
  return (
    <ul className={css["project__sidebar-list"]}>
      {projects.map((item) => (
        <li key={item.id} className={css["project__sidebar-item"]}>
          <NavLink
            to={{
              pathname: `/projects/${item.id}/sprints`,
            }}
            activeClassName={css["project__sidebar-link--active"]}
            className={css["project__sidebar-link"]}
          >
            <span className={css.test}>
              {item.title
                ? item.title.length > 7
                  ? item.title.slice(0, 7).trim() + "..."
                  : item.title
                : ""}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    email: projectsSelectors.authEmailSelector(state),
    projects: projectsSelectors.projectsSelector(state),
  };
};

const mapDispatchToProps = {
  getByEmails: getProjectsbyEMAIL.getProjectsByEmailOperation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSidebarList);
