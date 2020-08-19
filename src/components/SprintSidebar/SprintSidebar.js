import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreatingSprint from '../CreatingSprint/CreatingSprint';
import css from './SprintSidebar.module.css';
import SprintsSidebarList from '../SprintsSidebarList/SprintsSidebarList';
const SprintSidebar = ({ match = 'test' }) => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(state => !state);
  };
  return (
    <>
      <div className={css['sprint-sidebar__wrapper']}>
        <div className={css['sprint-sidebar__wrapper-link']}>
          <NavLink to="/projects" className={css['sprint-sidebar__link']}>
            Показати проекти
          </NavLink>
        </div>
        <SprintsSidebarList match={match} />
        <div className={css['sprint-sidebar__add-wrapper']}>
          <button
            className={css['sprint-sidebar__add-btn']}
            onClick={handleClick}
          ></button>
          <p className={css['sprint-sidebar__add-description']}>
            Створити спринт
          </p>
        </div>
      </div>
      <CreatingSprint status={toggle} onClose={handleClick} />
    </>
  );
};

export default SprintSidebar;
