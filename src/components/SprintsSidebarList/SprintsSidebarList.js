import React from "react";
import { connect } from "react-redux";
import {
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import css from "./SprintsSidebarList.module.css";
const SprintsSidebarList = ({ sprints }) => {
  const params = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <ul className={css["sprint__sidebar-list"]}>
      {sprints.map((sprint) => (
        <li key={sprint.id} className={css["sprint__sidebar-item"]}>
          <NavLink
            to={`/projects/${params.projectId}/sprints/${sprint.id}`}
            activeClassName={css["sprint__sidebar-link--active"]}
            className={css["sprint__sidebar-link"]}
          >
            <span className={css.span}>{sprint.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  sprints: state.sprints.items,
});

export default connect(mapStateToProps)(SprintsSidebarList);
