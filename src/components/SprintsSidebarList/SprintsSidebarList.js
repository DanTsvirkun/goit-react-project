import React from 'react';
import { connect } from 'react-redux';
import {
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import css from './SprintsSidebarList.module.css';
const SprintsSidebarList = ({ sprints }) => {
  const params = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const handleClickOnLi = ({ target }) => {
    console.log(target.dataset.id);
    const id = target.dataset.id;
    history.push(`/projects/${params.projectId}/sprints/${id}`);
  };

  return (
    <ul className={css['sprint__sidebar-list']}>
      {sprints.map(sprint => (
        <li
          onClick={handleClickOnLi}
          key={sprint.id}
          className={css['sprint__sidebar-item']}
          data-id={sprint.id}
        >
          <NavLink
            to={`/projects/${params.projectId}/sprints/${sprint.id}`}
            activeClassName={css['sprint__sidebar-link--active']}
            className={css['sprint__sidebar-link']}
            data-id={sprint.id}
          >
            {sprint.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  sprints: state.sprints.items,
});

export default connect(mapStateToProps)(SprintsSidebarList);
