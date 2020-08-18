import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './SprintSidebar.module.css';
import SprintsSidebarList from '../SprintsSidebarList/SprintsSidebarList';
const SprintSidebar = ({ match = 'test' }) => {
  return (
    <div className={css['sprint-sidebar__wrapper']}>
      <div className={css['sprint-sidebar__wrapper-link']}>
        <NavLink to="/projects" className={css['sprint-sidebar__link']}>
          Показати проекти
        </NavLink>
      </div>
      <SprintsSidebarList match={match} />
      <div className={css['sprint-sidebar__add-wrapper']}>
        <button className={css['sprint-sidebar__add-btn']}> </button>
        <p className={css['sprint-sidebar__add-description']}>
          Створити спринт
        </p>
      </div>
    </div>
  );
};

export default SprintSidebar;
