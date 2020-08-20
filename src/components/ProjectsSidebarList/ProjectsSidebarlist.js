import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import getProjectsbyEMAIL from "../../redux/operations/projectsOperations";
import projectSelectors from "../../redux/selectors/projectsSelectors";
import css from "./ProjectsSidebarlist.module.css";

const projectsSidebarList = ({ match = "test" }) => {
  // useEffect(() => {

  //   //чистить массив или лоадер
  // }, []);

  return (
    <ul className={css["project__sidebar-list"]}>
      {[
        {
          title: "Project 1",
          id: 1,
        },
        {
          title: "Дуже довга назва проекту",
          id: 2,
        },
        {
          title: "Project 3",
          id: 3,
        },
        {
          title: "Project 1",
          id: 4,
        },
        {
          title: "Дуже довга назва проекту",
          id: 5,
        },
        {
          title: "Project 3",
          id: 6,
        },
      ].map((item) => (
        <li key={item.id} className={css["project__sidebar-item"]}>
          <NavLink
            to={{
              pathname: match.url,
              search: `?project=${item.id}`,
            }}
            activeClassName={css["project__sidebar-link--active"]}
            className={css["project__sidebar-link"]}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = () => {
  return {
    email: projectSelectors.authEmailSelector,
  };
};

const mapDispatchToProps = {
  getByEmails: getProjectsbyEMAIL.getProjectsByEmailOperation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectsSidebarList);
