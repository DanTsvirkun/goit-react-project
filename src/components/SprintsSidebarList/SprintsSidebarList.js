import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './SprintsSidebarList.module.css';
const SprintsSidebarList = () => {
  return (
    <ul className={css['sprint__sidebar-list']}>
      {[
        { title: 'Sprint Burndown Chart 1' },
        { title: 'Sprint Burndown Chart 2' },
        { title: 'Sprint Burndown Chart 3' },
        { title: 'Sprint Burndown Chart 4' },
      ].map(item => (
        <li className={css['sprint__sidebar-item']}>
          <NavLink
            to="/"
            activeClassName={css['sprint__sidebar-link--active']}
            className={css['sprint__sidebar-link']}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SprintsSidebarList;
