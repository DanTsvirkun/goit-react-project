import React from "react";
import { NavLink } from "react-router-dom";
import css from "./SprintsSidebarList.module.css";
const SprintsSidebarList = ({ match = "test" }) => {
  return (
    <ul className={css["sprint__sidebar-list"]}>
      {[
        {
          title: "Sprint Burndown Chart 1",
          id: 1,
        },
        {
          title: "Sprint Burndown Chart 2",
          id: 2,
        },
        {
          title: "Sprint Burndown Chart 3",
          id: 3,
        },
        {
          title: "Sprint Burndown Chart 4",
          id: 4,
        },
        {
          title: "Sprint Burndown Chart 1",
          id: 5,
        },
      ].map((item) => (
        <li key={item.id} className={css["sprint__sidebar-item"]}>
          <NavLink
            to={`/projects/fgqef/sprints/${item.id}`}
            activeClassName={css["sprint__sidebar-link--active"]}
            className={css["sprint__sidebar-link"]}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SprintsSidebarList;
