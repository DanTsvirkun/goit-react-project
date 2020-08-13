import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './SprintSidebar.module.css';
import SprintsSidebarList from '../SprintsSidebarList/SprintsSidebarList';
const SprintSidebar = () => {
  return (
    <div className={css['sprint-sidebar__wrapper']}>
      <div className={css['sprint-sidebar__wrapper-link']}>
        <NavLink to="/" className={css['sprint-sidebar__link']}>
          Показати проекти
        </NavLink>
      </div>
      <SprintsSidebarList />
      <div className={css['sprint-sidebar__add-wrapper']}>
        <button className={css['sprint-sidebar__add-btn']}></button>
        <p className={css['sprint-sidebar__add-description']}>
          Створити спринт
        </p>
      </div>
    </div>
  );
};

export default SprintSidebar;
