import React from 'react';
import { Route } from 'react-router-dom';
import SprintSidebar from '../../components/SprintSidebar/SprintSidebar';
import css from './Sprint.module.css';
import SprintHeader from '../../components/SprintHeader/SprintHeader';
import SprintTableTitle from '../../components/SprintTableTitle/SprintTableTitle';
import SprintTasksList from '../../components/SprintTasksList/SprintTasksList';
const Sprint = () => {
  return (
    <section className={css.sprint}>
      <div className={css.container}>
        <SprintSidebar />
        <div className={css['sprint__main-wrapper']}>
          <SprintHeader />
          <SprintTableTitle />
          <Route
            path="/projects/:projectName/sprints/:sprintId"
            component={SprintTasksList}
          />
        </div>
      </div>
    </section>
  );
};

export default Sprint;
