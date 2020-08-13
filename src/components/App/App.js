import React from 'react';
import styles from './App.module.css';
import SprintPage from '../../containers/Sprint/Sprint';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SprintPage />
      </div>
    </div>
  );
};

export default App;

// http://localhost:3000/projects/project/sprints?sprint=1
