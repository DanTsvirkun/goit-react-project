import React from 'react';
import SprintSidebar from '../../components/SprintSidebar/SprintSidebar';
import css from './Sprint.module.css';
import SprintHeader from '../../components/SprintHeader/SprintHeader';

const Sprint = () => {
  return (
    <section className={css.sprint}>
      <div className={css.container}>
        <SprintSidebar />
        <SprintHeader />
      </div>
    </section>
  );
};

export default Sprint;
